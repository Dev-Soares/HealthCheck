import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ example: 2000 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  calories: number;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  protein: number;

  @ApiProperty({ example: 250 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  carbs: number;

  @ApiProperty({ example: 70 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  fat: number;
}
