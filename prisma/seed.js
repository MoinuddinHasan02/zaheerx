const Database = require("better-sqlite3");
const { PrismaBetterSQLite } = require("@prisma/adapter-better-sqlite3");
const path = require("path");
const bcrypt = require("bcryptjs");

// Dynamically import PrismaClient from generated dir
async function main() {
  const { PrismaClient } = require("../src/generated/prisma");

  const dbPath = path.resolve(__dirname, "..", "prisma", "dev.db");
  const db = new Database(dbPath);
  const adapter = new PrismaBetterSQLite(db);
  const prisma = new PrismaClient({ adapter });

  try {
    const hash = await bcrypt.hash("admin123", 10);

    await prisma.user.upsert({
      where: { email: "admin@zaheerx.com" },
      update: {},
      create: { email: "admin@zaheerx.com", password: hash, name: "Admin" },
    });
    console.log("✓ Admin user ready: admin@zaheerx.com / admin123");

    await prisma.post.upsert({
      where: { slug: "welcome-to-zaheerx" },
      update: {},
      create: {
        title: "Welcome to the New Zaheerx.com",
        slug: "welcome-to-zaheerx",
        content:
          "<h2>Welcome!</h2><p>The upgraded zaheerx.com features full institution details, a blog, social media sections, real estate showcase and a built-in admin panel.</p><p>Use the Admin Panel at <strong>/admin</strong> to manage posts and institutions.</p>",
        published: true,
      },
    });
    console.log("✓ Sample post ready.");

    console.log("\n✅ Seeding complete!");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
