import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    CarModule,
  ],
})
export class AppModule {}
