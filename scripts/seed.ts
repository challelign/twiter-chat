import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("[Checking if data exist and Cleaning up old data...]");

  // Delete all data in a safe order (to maintain foreign key constraints)
  await prisma.$transaction([
    prisma.like.deleteMany(),
    prisma.savedPosts.deleteMany(),
    prisma.follow.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  console.log("[Cleaning up completed...]");

  console.log("[Seeding Fake data to the database...]");

  // Create Users
  const users = await prisma.user.createMany({
    data: Array.from({ length: 10 }).map(() => ({
      id: faker.string.uuid(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      displayName: faker.person.fullName(),
      bio: faker.lorem.sentence(),
      location: faker.location.city(),
      job: faker.person.jobTitle(),
      website: faker.internet.url(),
      img: faker.image.avatar(),
      cover: faker.image.url(),
    })),
  });

  // Fetch all users
  const allUsers = await prisma.user.findMany();

  // Create Posts
  const posts = await prisma.post.createMany({
    data: allUsers.map((user) => ({
      id: faker.string.uuid(),
      desc: faker.lorem.paragraph(),
      img: faker.image.url(),
      userId: user.id,
    })),
  });

  // Fetch all posts
  const allPosts = await prisma.post.findMany();

  // Create Comments on Posts (Nested Comments)
  for (let i = 0; i < 15; i++) {
    const parentPost = faker.helpers.arrayElement(allPosts); // Pick a random post
    await prisma.post.create({
      data: {
        id: faker.string.uuid(),
        desc: faker.lorem.sentence(),
        userId: faker.helpers.arrayElement(allUsers).id,
        parentPostId: parentPost.id, // Set this as a reply to the parent post
      },
    });
  }

  // Fetch all comments
  const allComments = await prisma.post.findMany({
    where: { parentPostId: { not: null } },
  });

  // Create Likes
  for (let i = 0; i < 10; i++) {
    await prisma.like.create({
      data: {
        id: faker.string.uuid(),
        userId: faker.helpers.arrayElement(allUsers).id,
        postId: faker.helpers.arrayElement(allPosts).id,
      },
    });
  }

  // Create Saved Posts
  for (let i = 0; i < 10; i++) {
    await prisma.savedPosts.create({
      data: {
        id: faker.string.uuid(),
        userId: faker.helpers.arrayElement(allUsers).id,
        postId: faker.helpers.arrayElement(allPosts).id,
      },
    });
  }

  // Create Follows
  for (let i = 0; i < 10; i++) {
    const follower = faker.helpers.arrayElement(allUsers);
    let following;
    do {
      following = faker.helpers.arrayElement(allUsers);
    } while (following.id === follower.id); // Ensure they don't follow themselves

    await prisma.follow.create({
      data: {
        id: faker.string.uuid(),
        followerId: follower.id,
        followingId: following.id,
      },
    });
  }

  console.log("[Seeding finished!]");
}

main()
  .catch((e) => {
    console.error("[Error while seeding:]", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
