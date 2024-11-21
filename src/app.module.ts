import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './car/entities/car.entity';
import { ConsoleMiddleware } from './middlewares/console.middleware';
import { MainService } from './services/main.service';
import { TestController } from './test/test.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { CarController } from './car/car.controller';
import { CarService } from './car/car.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

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
    CarModule,
  ],
  providers: [
    MainService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ConsoleMiddleware).forRoutes('*');
    // consumer
    //   .apply(ConsoleMiddleware)
    //   .forRoutes({ path: 'car/(.*)', method: RequestMethod.GET });
  }
}
