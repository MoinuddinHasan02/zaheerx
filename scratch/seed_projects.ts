import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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
    } else {
      await prisma.project.update({
        where: { id: exists.id },
        data: project
      });
      console.log(`✓ Real estate project updated: ${project.name}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
