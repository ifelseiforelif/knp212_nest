import { IsString, IsInt } from 'class-validator';
export class CreateCarDto {
  @IsString()
  model: string;
  @IsInt()
  year: number;
}

//Data Transfer Object
