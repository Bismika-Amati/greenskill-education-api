import { PrismaClient } from '@prisma/client';
import { Seeder } from './interfaces/seeder.interface';
import { RoleType } from '../../src/lib/enums/index';

export class RoleSeeder implements Seeder {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async main(): Promise<void> {
    const role = await this.createRole();
    console.log(role);
  }

  async createRole() {
    const roles = Object.values(RoleType);

    roles.forEach(async (role) => {
      if (role)
        return await this.prisma.role.upsert({
          where: {
            name: role,
          },
          update: {},
          create: {
            name: role,
          },
        });
    });
  }
}
