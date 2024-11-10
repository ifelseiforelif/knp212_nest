import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getData(): string {
    return `Hello From Nest service!`;
  }
}
