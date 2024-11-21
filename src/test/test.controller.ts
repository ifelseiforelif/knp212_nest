import { Controller, Get, Param } from '@nestjs/common';
import { MainService } from 'src/services/main.service';

@Controller('test')
export class TestController {
  constructor(private readonly mainService: MainService) {}

  @Get(':id')
  setUserId(@Param('id') id: string) {
    return `User Id: ` + this.mainService.getUserId();
  }
}
