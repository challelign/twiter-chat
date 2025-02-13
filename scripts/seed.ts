import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

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
      desc: faker.lorem.sentence(),
      img: faker.image.url(),
      userId: user.id,
    })),
  });

  // Fetch all posts
  const allPosts = await prisma.post.findMany();

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

  console.log("Seeding finished!");
}

main()
  .catch((e) => {
    console.error("Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
