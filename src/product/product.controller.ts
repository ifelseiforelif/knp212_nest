import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductService } from './product.service';
import { ProductPipe } from './product.pipe';

class ProductDto {
  readonly id: number;
  readonly title: string;
  readonly price: number;
}

//http://localhost:3000/api/product/12

@Controller('api')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Header('X-Powered-By', 'Secret')
  @Get() //GET http://localhost:3000/api
  getInfo(): string {
    return this.productService.getData();
  }

  @Get('product/:id') //GET http://localhost:3000/api/product/41
  getProductById(@Param('id') id: string): { id: number } {
    const my_id = Number(id);
    if (isNaN(my_id)) {
      throw new BadRequestException('Твій ID неможливо перетворити до Number');
    }
    return {
      id: my_id,
    };
  }
  // GET http://localhost:3000/api/product?title=tv&price=5400

  @HttpCode(HttpStatus.ACCEPTED)
  //@Redirect('https://google.com')
  @Get('product')
  getInfoAboutProduct(
    @Query('title') title: string,
    @Query('price') price: string,
  ): { title: string; price: string } {
    return {
      title,
      price,
    };
  }

  //POST http://localhost:3000/api/product
  @Post('product')
  createProduct(@Body() productDto: ProductDto): ProductDto {
    return productDto;
  }

  @Get('test/:id') //GET http://localhost:3000/api/test/45
  test(@Req() req: Request, @Res() res: Response) {
    console.log(req.params);
    res.send('Hello from old Expres');
  }

  @Get('user/:id') //GET http://localhost:3000/api/user/id?name=Alex
  getInfoAboutUser(
    @Param('id', ParseIntPipe) id: number,
    @Query('name', ProductPipe) name: string,
  ): string {
    return `Your ID: ${id}. Your name: ${name}`;
  }
}
