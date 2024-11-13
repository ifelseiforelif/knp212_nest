import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@UsePipes(new ValidationPipe())
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post() //POST http://localhost:3000/car
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carService.create(createCarDto);
  }

  @Get()
  async findAll() {
    return await this.carService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return await this.carService.update(+id, updateCarDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.carService.remove(+id);
  }
}
