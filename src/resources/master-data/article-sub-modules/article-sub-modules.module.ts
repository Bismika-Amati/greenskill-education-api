import { Module } from '@nestjs/common';
import { ArticleSubModulesService } from './article-sub-modules.service';
import { ArticleSubModulesController } from './article-sub-modules.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ArticleSubModulesController],
  providers: [ArticleSubModulesService],
  imports: [PrismaModule],
})
export class ArticleSubModulesModule {}
