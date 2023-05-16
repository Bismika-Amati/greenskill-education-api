import { City, District, Province, PrismaClient } from '@prisma/client';
import { info, log } from 'console';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import * as path from 'path';
import { Seeder } from './interfaces/seeder.interface';

const prisma = new PrismaClient();

type Region = {
  id: number;
  name: string;
  parent_id: string;
  updated_at: string;
  deleted_at: string;
};

type ReadCsvOption = {
  content: string;
  headers: string[];
};

export class RegionSeeder implements Seeder {
  async main(): Promise<void> {
    const parentHeaders = [
      'id',
      'name',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const childHeaders = [
      'id',
      'name',
      'parent_id',
      'created_at',
      'updated_at',
      'deleted_at',
    ];

    const provinceCsvFilePath = path.resolve(
      __dirname,
      '../files/provinces.csv',
    );
    const provinceContent = fs.readFileSync(provinceCsvFilePath, {
      encoding: 'utf-8',
    });

    await this.readCsv<Region>(
      {
        content: provinceContent,
        headers: parentHeaders,
      },
      async (province, error) => {
        if (isNaN(+province.id)) {
          console.log(`NaN id: ${province.id}`);
          return;
        }

        try {
          info(
            `# inserting province -- id: ${province.id}, name ${province.name}`,
          );

          await this.upsertProvince({
            id: Number(province.id),
            name: province.name,
          });
        } catch (error) {
          console.error(error);
        }
      },
    );

    const cityCsvFilePath = path.resolve(__dirname, '../files/cities.csv');
    const cityContent = fs.readFileSync(cityCsvFilePath, {
      encoding: 'utf-8',
    });

    await this.readCsv<Region>(
      {
        content: cityContent,
        headers: childHeaders,
      },
      async (city, error) => {
        if (isNaN(+city.id)) {
          console.log(`NaN id: ${city.id}`);
          return;
        }

        try {
          info(`# inserting city -- id: ${city.id}, name ${city.name}`);

          await this.upsertCity({
            id: Number(city.id),
            name: city.name,
            parentId: Number(city.parent_id),
          });
        } catch (error) {
          console.error(error);
        }
      },
    );

    const districtCsvFilePath = path.resolve(
      __dirname,
      '../files/districts.csv',
    );
    const districtContent = fs.readFileSync(districtCsvFilePath, {
      encoding: 'utf-8',
    });

    await this.readCsv<Region>(
      {
        content: districtContent,
        headers: childHeaders,
      },
      async (district, error) => {
        if (isNaN(+district.id)) {
          console.log(`NaN id: ${district.id}`);
          return;
        }

        try {
          info(
            `# inserting district -- id: ${district.id}, name ${district.name}`,
          );

          await this.upsertDistrict({
            id: Number(district.id),
            name: district.name,
            parentId: Number(district.parent_id),
          });
        } catch (error) {
          console.error(error);
        }
      },
    );
  }

  async upsertProvince(params: {
    id: number;
    name: string;
  }): Promise<Province> {
    return await prisma.province.upsert({
      where: { id: params.id },
      update: {
        name: params.name,
      },
      create: {
        name: params.name,
      },
    });
  }

  async upsertCity(params: {
    id: number;
    name: string;
    parentId: number;
  }): Promise<City> {
    return await prisma.city.upsert({
      where: { id: params.id },
      update: {
        id: params.id,
        name: params.name,
        provinceId: params.parentId,
      },
      create: {
        id: params.id,
        name: params.name,
        provinceId: params.parentId,
      },
    });
  }

  async upsertDistrict(params: {
    id: number;
    name: string;
    parentId: number;
  }): Promise<District> {
    return await prisma.district.upsert({
      where: { id: params.id },
      update: {
        id: params.id,
        name: params.name,
        cityId: params.parentId,
      },
      create: {
        id: params.id,
        name: params.name,
        cityId: params.parentId,
      },
    });
  }

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
}
