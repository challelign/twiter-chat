import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/db/dbConnection";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const { id } = evt.data;
  const eventType = evt.type;
  console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
  console.log("Webhook payload:", body);

  if (eventType === "user.created") {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(5, 19)
      .replace(/[-T:.]/g, "");
    console.log(formattedDate);
    try {
      const parsedBody = JSON.parse(body);
      const username = parsedBody.data.username || `${formattedDate}coderookie`;
      const email =
        formattedDate + parsedBody.data.email_addresses[0]?.email_address; // Fix here

      console.log("Webhook Sample data=>:", username, email);
      await prisma.user.create({
        data: {
          id: evt.data.id,
          username: username,
          email: email,
        },
      });
    } catch (error) {
      console.log(error);
      return new Response("Error: Failed to create a user", {
        status: 500,
      });
    }
  }
  if (eventType === "user.deleted") {
    try {
      await prisma.user.delete({ where: { id: evt.data.id } });
      return new Response("User deleted", { status: 200 });
    } catch (err) {
      console.log(err);
      return new Response("Error: Failed to delete a user!", {
        status: 500,
      });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
