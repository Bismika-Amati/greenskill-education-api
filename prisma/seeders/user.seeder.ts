import { PrismaClient } from '@prisma/client';
import { info } from 'console';
import { Seeder } from './interfaces/seeder.interface';
import { RoleType } from '../../src/lib/enums';
import { hashPassword } from '../../src/lib/helper';

export class UserSeeder implements Seeder {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async main(): Promise<void> {
    // seed roles
    const roles = await Promise.all([
      ...Object.values(RoleType).map((role) => {
        return this.prisma.role.upsert({
          where: { name: role },
          update: {},
          create: {
            name: role,
          },
        });
      }),
    ]);
    roles.forEach((role) => {
      info(`# inserting role -- id: ${role.id}, name ${role.name}`);
    });

    // seed users
    const passwordAdmin = await hashPassword('rahasia123');
    const adminRole = await this.prisma.role.findUnique({
      where: { name: RoleType.ADMIN },
    });

    const admin = await this.prisma.user.upsert({
      where: {
        email: 'admin@amati.com',
      },
      update: {},
      create: {
        email: 'admin@amati.com',
        fullname: 'Admin',
        password: passwordAdmin,
        roleId: adminRole.id,
      },
    });
    info(`# inserting user -- id: ${admin.id}, name ${admin.fullname}`);

    const studentRole = await this.prisma.role.findUnique({
      where: { name: RoleType.STUDENT },
    });
    const student = await this.prisma.user.upsert({
      where: {
        email: 'student@amati.com',
      },
      update: {},
      create: {
        email: 'student@amati.com',
        fullname: 'Student',
        password: passwordAdmin,
        roleId: studentRole.id,
      },
    });
    info(`# inserting user -- id: ${student.id}, name ${student.fullname}`);

    const picVillageRole = await this.prisma.role.findUnique({
      where: { name: RoleType.PIC_VILLAGE },
    });
    const picVillage = await this.prisma.user.upsert({
      where: {
        email: 'picvillage@amati.com',
      },
      update: {},
      create: {
        email: 'picvillage@amati.com',
        fullname: 'PIC Village',
        password: passwordAdmin,
        roleId: picVillageRole.id,
      },
    });
    info(
      `# inserting user -- id: ${picVillage.id}, name ${picVillage.fullname}`,
    );
  }
}
