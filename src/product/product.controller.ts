import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

class ProductDto {
  readonly id: number;
  readonly title: string;
  readonly price: number;
}

//http://localhost:3000/api/product/12

@Controller('api')
export class ProductController {
  @Get() //GET http://localhost:3000/api
  getInfo(): string {
    return 'Hello from Nest';
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

  //@HttpCode(202)
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
}
