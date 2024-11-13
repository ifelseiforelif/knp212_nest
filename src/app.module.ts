import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './car/entities/car.entity';
import { ConsoleMiddleware } from './middlewares/console.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    CarModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(ConsoleMiddleware).forRoutes('*');
    consumer
      .apply(ConsoleMiddleware)
      .forRoutes({ path: 'car/(.*)', method: RequestMethod.GET });
  }
}
