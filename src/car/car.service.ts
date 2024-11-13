import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CarService {
  constructor(@InjectModel(Car) private readonly carModel: typeof Car) {}
  async create(createCarDto: any) {
    //TODO: повернути CreateCarDto
    const car = await this.carModel.create(createCarDto);
    return car;
  }

  async findAll() {
    const cars = await this.carModel.findAll();
    return cars;
  }

  async findOne(id: number) {
    const car = await this.carModel.findByPk(id);
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const car = await this.carModel.update(updateCarDto, {
      where: {
        id,
      },
    });
    return { ...updateCarDto, id };
  }

  async remove(id: number) {
    await this.carModel.destroy({ where: { id } });
    return `This action removes a #${id} car`;
  }
}
