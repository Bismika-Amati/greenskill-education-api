import { PrismaClient } from '@prisma/client';
import { Seeder } from './interfaces/seeder.interface';
import * as bcrypt from 'bcrypt';
import { RoleType } from '../../src/lib/enums';
import { info } from 'console';

const roundsOfHashing = 10;

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
      info(`# inserting sub district -- id: ${role.id}, name ${role.name}`);
    });

    // seed users
    const passwordAdmin = await bcrypt.hash('rahasia123', roundsOfHashing);
    const adminRole = await this.prisma.role.findUnique({
      where: { name: RoleType.ADMIN },
    });

    const admin = await this.prisma.user.upsert({
      where: {
        email: 'admin@admin.com',
      },
      update: {},
      create: {
        email: 'admin@admin.com',
        fullname: 'Admin',
        password: passwordAdmin,
        roleId: adminRole.id,
      },
    });
    info(`# inserting sub district -- id: ${admin.id}, name ${admin.fullname}`);
  }
}
