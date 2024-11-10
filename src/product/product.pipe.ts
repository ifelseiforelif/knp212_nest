import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ProductPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    return value.toUpperCase();
  }
}
