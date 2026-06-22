import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateLojaDto {
  @IsInt()
  @IsNotEmpty()
  usuario_id!: number;  

  @IsInt()
  @IsOptional()
  categoria_id?: number;

  @IsString()
  @IsNotEmpty()
  nome!: string;        

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  logo_url?: string;

  @IsString()
  @IsOptional()
  banner_url?: string;

  @IsString()
  @IsOptional()
  sticker_url?: string;
}
