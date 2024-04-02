import { MongoUserRepository } from '../adapters/mongo-user.repository';
import { MySQLUserRepository } from '../adapters/mysql-user.repository';
import { UserRepository } from '../ports/user.repository';
import { users } from './users.fake';

class UserSeeder {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async seed() {
    for (const user of users) {
      await this.userRepository.createUser(user);        
    }
  }
}

const mysqlUserRepository = new MySQLUserRepository();
const mongoUserRepository = new MongoUserRepository();
const seeder = new UserSeeder(mongoUserRepository);

seeder.seed()
.then(() => {
  console.log('Seeding finished');
  process.exit(0);
})
.catch((error) => {
  console.error('Error seeding: ', error);
  process.exit(1);
});