import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsInt()
  @IsOptional()
  categoria_pai_id?: number;
}