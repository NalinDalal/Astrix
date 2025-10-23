// packages/prisma/seed.ts
import "./index";
import prisma from "./index";
import "dotenv/config";
async function main() {
  console.log("🌱 Seeding database...");

  // --- 1) Create test users ---
  const users = await Promise.all(
    ["alice@example.com", "bob@example.com", "carol@example.com"].map(
      (email, i) =>
        prisma.user.create({
          data: {
            email,
            username: `user${i + 1}`,
            passwordHash: "hashedpassword123",
            balance: 1000 + i * 500, // initial balance
          },
        }),
    ),
  );

  console.log(`Created ${users.length} users`);

  // --- 2) Create game sessions for users ---
  const gameTypes = [
    "DICE",
    "TILES",
    "MINESWEEPER",
    "TILES2",
    "SEQUENCE",
  ] as const;
  const sessions: any[] = [];

  for (const user of users) {
    for (let i = 0; i < 3; i++) {
      const type = gameTypes[Math.floor(Math.random() * gameTypes.length)];
      const betAmount = 50 + Math.floor(Math.random() * 200);

      const session = await prisma.gameSession.create({
        data: {
          userId: user.id,
          gameType: type,
          status: "playing",
          betAmount,
          multiplier: 1.0,
          metadata: { note: "Initial test session" },
          clientSeed: `clientSeed-${i}`,
          serverSeedHash: `hash-${i}`,
          nonce: 0,
        },
      });

      sessions.push(session);
    }
  }

  console.log(`Created ${sessions.length} game sessions`);

  // --- 3) Create transactions for each session ---
  for (const session of sessions) {
    await prisma.transaction.create({
      data: {
        userId: session.userId,
        gameSessionId: session.id,
        type: "BET",
        amount: session.betAmount,
        status: "confirmed",
        metadata: { info: "Initial bet" },
      },
    });
  }

  console.log("✅ Transactions seeded");

  // --- 4) Create some events for sessions ---
  for (const session of sessions) {
    await prisma.gameEvent.create({
      data: {
        gameSessionId: session.id,
        eventType: "START",
        payload: { message: "Game started" },
      },
    });
  }

  console.log("✅ Game events seeded");
  console.log("🎉 Database seeding complete!");
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
