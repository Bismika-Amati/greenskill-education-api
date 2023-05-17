import { PrismaClient } from '@prisma/client';
import { info } from 'console';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import { Seeder } from './interfaces/seeder.interface';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

type Region = {
  id: string;
  name: string;
  parentId: string;
};

type ReadCsvOption = {
  content: string;
  headers: string[];
};

export class RegionSeeder implements Seeder {
  async readCsv<T>(
    options: ReadCsvOption,
    callback: (item?: T, error?: any) => void,
  ): Promise<void> {
    parse(
      options.content,
      {
        delimiter: ',',
        columns: options.headers,
      },
      (error, result: T[]) => {
        if (result)
          result.forEach(async (item: T) => {
            callback(item, error);
          });
      },
    );
  }

  async main(): Promise<void> {
    const provinceIds: { id: string; uuid: string }[] = [];
    const cityIds: { id: string; uuid: string; provinceId: string }[] = [];
    const districtIds: { id: string; uuid: string; cityId: string }[] = [];

    // seed provinces
    await this.readCsv<Region>(
      {
        content: fs.readFileSync(
          path.resolve(__dirname, '../files/provinces.csv'),
          {
            encoding: 'utf-8',
          },
        ),
        headers: ['id', 'name'],
      },
      async (province) => {
        try {
          const myUuid = randomUUID();
          provinceIds.push({
            id: province.id,
            uuid: myUuid,
          });

          await prisma.province.upsert({
            where: { id: province.id },
            update: {
              id: myUuid,
              name: province.name,
            },
            create: {
              id: myUuid,
              name: province.name,
            },
          });

          info(
            `# inserting province -- id: ${province.id}, name ${province.name}`,
          );
        } catch (error) {
          console.error(error);
        }
      },
    );

    // seed city
    await this.readCsv<Region>(
      {
        content: fs.readFileSync(
          path.resolve(__dirname, '../files/cities.csv'),
          {
            encoding: 'utf-8',
          },
        ),
        headers: ['id', 'parentId', 'name'],
      },
      async (city) => {
        try {
          const found = provinceIds.find((item) => item.id === city.parentId);
          if (!found) return;

          const myUuid = randomUUID();
          cityIds.push({
            id: city.id,
            uuid: myUuid,
            provinceId: found.uuid,
          });

          await prisma.city.upsert({
            where: { id: city.id },
            update: {
              id: myUuid,
              name: city.name,
              provinceId: found.uuid,
            },
            create: {
              id: myUuid,
              name: city.name,
              provinceId: found.uuid,
            },
          });

          info(`# inserting city -- id: ${city.id}, name ${city.name}`);
        } catch (error) {
          console.error(error);
        }
      },
    );

    // seed district
    await this.readCsv<Region>(
      {
        content: fs.readFileSync(
          path.resolve(__dirname, '../files/districts.csv'),
          {
            encoding: 'utf-8',
          },
        ),
        headers: ['id', 'parentId', 'name'],
      },
      async (district) => {
        try {
          const found = cityIds.find((item) => item.id === district.parentId);
          if (!found) return;

          const myUuid = randomUUID();
          districtIds.push({
            id: district.id,
            uuid: myUuid,
            cityId: found.uuid,
          });

          await prisma.district.upsert({
            where: { id: district.id },
            update: {
              id: myUuid,
              name: district.name,
              cityId: found.uuid,
            },
            create: {
              id: myUuid,
              name: district.name,
              cityId: found.uuid,
            },
          });
          info(
            `# inserting district -- id: ${district.id}, name ${district.name}`,
          );
        } catch (error) {
          console.error(error);
        }
      },
    );

    // seed sub district
    await this.readCsv<Region>(
      {
        content: fs.readFileSync(
          path.resolve(__dirname, '../files/subDistricts.csv'),
          {
            encoding: 'utf-8',
          },
        ),
        headers: ['id', 'parentId', 'name'],
      },
      async (subDistrict) => {
        try {
          const found = districtIds.find(
            (item) => item.id === subDistrict.parentId,
          );
          if (!found) return;

          const myUuid = randomUUID();

          await prisma.subDistrict.upsert({
            where: { id: subDistrict.id },
            update: {
              id: myUuid,
              name: subDistrict.name,
              districtId: found.uuid,
            },
            create: {
              id: myUuid,
              name: subDistrict.name,
              districtId: found.uuid,
            },
          });

          info(
            `# inserting sub district -- id: ${subDistrict.id}, name ${subDistrict.name}`,
          );
        } catch (error) {
          console.error(error);
        }
      },
    );
  }
}
