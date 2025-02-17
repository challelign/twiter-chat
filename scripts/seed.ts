import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("[Checking if data exist and Cleaning up old data...]");

  await prisma.$transaction([
    prisma.like.deleteMany(),
    prisma.savedPosts.deleteMany(),
    prisma.follow.deleteMany(),
    prisma.post.deleteMany(),
    prisma.user.deleteMany(),
  ]);
  console.log("[Cleaning up completed...]");

  console.log("[Seeding Fake data to the database...]");

  // Create 10 Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          id: faker.string.uuid(),
          email: faker.internet.email(),
          username: faker.internet.username(),
          displayName: faker.person.fullName(),
          bio: faker.lorem.sentence(),
          location: faker.location.city(),
          job: faker.person.jobTitle(),
          website: faker.internet.url(),
          img: faker.image.avatar(),
          cover: faker.image.url(),
        },
      })
    )
  );

  // Create 50 Posts (5 per user)
  const posts = await Promise.all(
    users.flatMap((user) =>
      Array.from({ length: 20 }).map(() =>
        prisma.post.create({
          data: {
            id: faker.string.uuid(),
            desc: faker.lorem.paragraph(),
            img: faker.image.url(),
            userId: user.id,
          },
        })
      )
    )
  );

  // Create Comments on Posts
  const comments = await Promise.all(
    Array.from({ length: 50 }).map(() => {
      const post = faker.helpers.arrayElement(posts);
      return prisma.post.create({
        data: {
          id: faker.string.uuid(),
          desc: faker.lorem.sentence(),
          userId: faker.helpers.arrayElement(users).id,
          parentPostId: post.id, // Set this as a reply to the post
        },
      });
    })
  );

  // Create Likes
  await Promise.all(
    Array.from({ length: 100 }).map(() =>
      prisma.like.create({
        data: {
          id: faker.string.uuid(),
          userId: faker.helpers.arrayElement(users).id,
          postId: faker.helpers.arrayElement(posts).id,
        },
      })
    )
  );

  // Create Saved Posts
  await Promise.all(
    Array.from({ length: 50 }).map(() =>
      prisma.savedPosts.create({
        data: {
          id: faker.string.uuid(),
          userId: faker.helpers.arrayElement(users).id,
          postId: faker.helpers.arrayElement(posts).id,
        },
      })
    )
  );

  // Create Follows
  await Promise.all(
    Array.from({ length: 30 }).map(async () => {
      let follower, following;
      do {
        follower = faker.helpers.arrayElement(users);
        following = faker.helpers.arrayElement(users);
      } while (follower.id === following.id);

      return prisma.follow.create({
        data: {
          id: faker.string.uuid(),
          followerId: follower.id,
          followingId: following.id,
        },
      });
    })
  );

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
