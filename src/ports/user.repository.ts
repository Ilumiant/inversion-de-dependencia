import { UserEntity } from "../entities/user.entity";

// puerto
// Es la interfaz que define los métodos que debe implementar el adaptador
export interface UserRepository {
  findAll(): Promise<UserEntity[] | null>;
  createUser({ name, email }: { name: string, email: string}): Promise<UserEntity>;
}