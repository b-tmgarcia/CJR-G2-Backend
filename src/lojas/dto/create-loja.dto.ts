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

  @IsUrl()
  @IsOptional()
  logo_url?: string;

  @IsUrl()
  @IsOptional()
  banner_url?: string;

  @IsUrl()
  @IsOptional()
  sticker_url?: string;
}
