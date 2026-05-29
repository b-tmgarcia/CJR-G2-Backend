import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAvaliacaoLojaDto {
  @IsInt()
  @IsNotEmpty()
  usuario_id!: number;

  @IsInt()
  @IsNotEmpty()
  loja_id!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  nota!: number;

  @IsString()
  @IsOptional()
  comentario?: string;
}