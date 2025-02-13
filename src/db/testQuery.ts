import { prisma } from "./dbConnection";

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log("AllUsers", allUsers);
}

main();
