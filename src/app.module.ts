import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
console.log(__dirname + '/entities/*.entity{.ts,.js}')
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'todolist',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ArticleModule,
    CategoryModule,
    TagModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
