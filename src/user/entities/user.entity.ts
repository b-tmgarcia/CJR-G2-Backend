export class UserEntity {
  id: number;
  username: string;
  email: string;
  senha_hash: string;
  nome: string;
  foto_perfil_url?: string | null;
  createdAt: Date;
  updatedAt: Date;
}