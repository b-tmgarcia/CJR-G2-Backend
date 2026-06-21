import {IsInt, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateComentarioDto {
    @IsInt()
    @IsNotEmpty()
    usuario_id!: number;
    
    @IsNotEmpty()
    @IsString()
    conteudo!: string;    
    
    @IsOptional()
    @IsInt()
    avaliacao_loja_id?: number;

    @IsOptional()
    @IsInt()
    avaliacao_produto_id?: number;
}
