import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existing = await prisma.user.findUnique({
    where: { email: "admin@zaheerx.com" },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        email: "admin@zaheerx.com",
        password: hashedPassword,
        name: "Admin",
      },
    });
    console.log("✓ Default admin user created: admin@zaheerx.com / admin123");
  } else {
    console.log("ℹ Admin user already exists.");
  }

  // Seed sample blog post
  const postExists = await prisma.post.findUnique({
    where: { slug: "welcome-to-zaheerx" },
  });

  if (!postExists) {
    await prisma.post.create({
      data: {
        title: "Welcome to the New Zaheerx.com",
        slug: "welcome-to-zaheerx",
        content: `<p>We are pleased to launch the new, upgraded version of zaheerx.com — a comprehensive digital home for Mohammed Zaheeruddin's educational institutions, real estate projects, and community activities.</p>
        <h2>What's New</h2>
        <ul>
          <li>Full institutional showcase with details on all colleges and trusts</li>
          <li>Real estate listings for premium plots in Gulbarga region</li>
          <li>News and blog section for updates</li>
          <li>Social media integration</li>
          <li>Multi-language support (English and Urdu)</li>
        </ul>
        <p>Stay tuned for more updates and announcements from our institutions.</p>`,
        published: true,
      },
    });
    console.log("✓ Sample blog post created.");
  }

  // Seed Real Estate Projects
  const projects = [
    {
      name: "Malgatti Road Layout",
      location: "Malgatti Road, Gulbarga",
      description: "Premium NA GDA open plots surrounded by nature and future developments. Ideal for investors looking for high growth in a peaceful environment.",
      highlight: "Booking Open",
      status: "Available",
      features: "NA Approved, GDA Layout, Gated Community, Road Access, Electricity, Water Connection",
      order: 1,
    },
    {
      name: "Ring Road Properties",
      location: "Beside Asian Hospital, Ring Road, Gulbarga",
      description: "Prime commercial and residential spaces with highest visibility and access. Perfect for business hubs or premium residential apartments.",
      highlight: "High ROI",
      status: "Available",
      features: "Main Road Visibility, Commercial Potential, GDA Approved, Modern Infrastructure, Prime Connectivity",
      order: 2,
    },
    {
      name: "Chincholi Heights",
      location: "Chincholi area, Gulbarga District",
      description: "Accessible, high-value open plots for long-term secure investment in the rapidly developing Chincholi region.",
      highlight: "Newly Launched",
      status: "Available",
      features: "Strategic Location, Clear Legal Title, Rapid Appreciation, Flexible Plot Sizes, Investment Friendly",
      order: 3,
    },
    {
      name: "Humnabad Ring Road",
      location: "Near Uploan, Humnabad Ring Road, Gulbarga",
      description: "Strategic investments catering to the upcoming urban expansion. Great connectivity to major highways and city center.",
      highlight: "Fast Filling",
      status: "Available",
      features: "Highway Connectivity, Near Urban Center, Future Expansion Zone, All Legal Clearances, Immediate Possession",
      order: 4,
    },
  ];

  for (const project of projects) {
    const exists = await prisma.project.findFirst({
      where: { name: project.name },
    });
    if (!exists) {
      await prisma.project.create({ data: project });
      console.log(`✓ Real estate project created: ${project.name}`);
    }
  }

  console.log("✓ Database seeding complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
