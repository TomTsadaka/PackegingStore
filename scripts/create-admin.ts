import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@typackaging.com';
  const password = 'admin123';
  const name = 'Admin User';

  console.log('Creating admin user...');

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log('User already exists. Updating password...');
    const hashedPassword = await hash(password, 10);
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        role: 'OWNER',
      },
    });
    console.log('✅ Admin user password updated!');
  } else {
    // Check if company exists
    let company = await prisma.company.findFirst({
      where: { name: { contains: 'Sample' } },
    });

    if (!company) {
      console.log('Creating company...');
      company = await prisma.company.create({
        data: {
          name: 'Sample Company Ltd.',
          nameEn: 'Sample Company Ltd.',
          businessId: '123456789',
          vatNumber: 'IL123456789',
          tier: 'wholesale_a',
        },
      });
    }

    const hashedPassword = await hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'OWNER',
        companyId: company.id,
        language: 'he',
      },
    });
    console.log('✅ Admin user created!');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
  }
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

