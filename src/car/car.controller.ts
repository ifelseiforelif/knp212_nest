import { Controller, Get } from '@nestjs/common';

@Controller()
export class CarController {
  @Get('colors')
  getColors() {
    return [
      {
        id: '1',
        title: 'blue',
      },
    ];
  }

  @Get('types')
  getTypes() {
    return [
      {
        id: '1',
        title: 'hatchback',
      },
      {
        id: '2',
        title: 'sedan',
      },
      {
        id: '3',
        title: 'cabriolet',
      },
    ];
  }
}
