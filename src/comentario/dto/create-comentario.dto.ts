import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class CreateComentarioDto {
    @IsInt()
    @IsNotEmpty()
    usuario_id!: number;
    
    @IsNotEmpty()
    @IsString()
    comentario!: string;    
    
    @IsNotEmpty()
    @IsInt()
    avaliacao_id!: number;
}
