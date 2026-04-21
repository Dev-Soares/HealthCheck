import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdatePlanDto {
  @ApiPropertyOptional({ example: 2200 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  calories?: number;

  @ApiPropertyOptional({ example: 160 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  protein?: number;

  @ApiPropertyOptional({ example: 270 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  carbs?: number;

  @ApiPropertyOptional({ example: 75 })
  @IsNumber()
  @IsOptional()
  @Min(0)
  fat?: number;
}
