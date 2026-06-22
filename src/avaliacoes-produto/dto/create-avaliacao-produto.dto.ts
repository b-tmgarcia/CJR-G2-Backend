import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAvaliacaoProdutoDto {
  @IsInt()
  @IsNotEmpty()
  usuario_id!: number;

  @IsInt()
  @IsNotEmpty()
  produto_id!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  nota!: number;

  @IsString()
  @IsOptional()
  comentario?: string;
}