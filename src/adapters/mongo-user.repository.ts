import { connect } from "../db/mongo/config";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../ports/user.repository";

// adaptador
// Es la implementación de la interfaz del puerto
export class MongoUserRepository implements UserRepository {

  async findAll() {
    try {
      const connection = await connect();
      if (!connection) {
        throw new Error('Error to connect to database');
      }
      const users = await connection.collection<UserEntity>('users').find().toArray();
      return users;
    } catch (error) {
      console.error('Error getting users: ', error);
      throw new Error('Error getting users');
    }
  }

  async createUser({ name, email }: { name: string; email: string }) {
    try {
      const connection = await connect();
      if (!connection) {
        throw new Error('Error to connect to database');
      }
      await connection.collection<UserEntity>('users').insertOne({ name, email });
      const users = await this.findAll();
      return users[users.length - 1];
    } catch (error) {
      console.error('Error creating user: ', error);
      throw new Error('Error creating user');
    }
  }
}