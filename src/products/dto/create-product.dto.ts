import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsInt()
  @IsOptional()
  loja_id?: number;

  @IsInt()
  @IsOptional()
  categoria_id?: number;

  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsNumber()
  preco!: number;

  @IsInt()
  estoque!: number;
}