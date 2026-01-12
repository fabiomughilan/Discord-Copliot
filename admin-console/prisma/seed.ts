import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });

  console.log('Created admin user:', admin.username);

  // Create default bot config
  const config = await prisma.botConfig.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      systemInstructions: 'You are a helpful AI assistant for our Discord community. Be friendly, professional, and concise in your responses.',
      allowedChannels: [],
      isActive: true,
    },
  });

  console.log('Created default bot config');
  console.log('\n✅ Database seeded successfully!');
  console.log('\nDefault credentials:');
  console.log('Username: admin');
  console.log('Password: admin123');
  console.log('\n⚠️  Please change the password after first login!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
