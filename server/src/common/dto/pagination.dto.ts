import { IsString, IsOptional } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsString()
    cursor?: string;

    @IsOptional()
    @IsString()
    limit?: string;
}
