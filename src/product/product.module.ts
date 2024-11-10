import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductPipe } from './product.pipe';
@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductPipe],
})
export class ProductModule {}
