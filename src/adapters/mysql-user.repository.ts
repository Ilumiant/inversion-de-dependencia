import { connect } from "../db/mysql/config";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "../ports/user.repository";

// adaptador
// Es la implementación de la interfaz del puerto
export class MySQLUserRepository implements UserRepository {

  async findAll() {
    try {
      const connection = await connect();
      if (!connection) {
        throw new Error('Error to connect to database');
      }
      const [rows] = await connection.query('SELECT * FROM users');
      return rows as UserEntity[];
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
      await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
      const users = await this.findAll();
      return users[users.length - 1];
    } catch (error) {
      console.error('Error creating user: ', error);
      throw new Error('Error creating user');
    }
  }
}