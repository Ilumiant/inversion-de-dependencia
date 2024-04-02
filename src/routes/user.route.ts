import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { MySQLUserRepository } from '../adapters/mysql-user.repository';
import { MongoUserRepository } from '../adapters/mongo-user.repository';
import { checkAuthentication } from '../middlewares/check-authentication';
import { JwtTokenService } from '../adapters/jwt-token.service';
import { JoseTokenService } from '../adapters/jose-token.service';

const router = Router();

const mysqlUserRepository = new MySQLUserRepository();
const mongoUserRepository = new MongoUserRepository();

// const tokenService = new JwtTokenService();
const tokenService = new JoseTokenService();

const userController = new UserController(mongoUserRepository, tokenService);


router.get('/',
  checkAuthentication(tokenService),
  userController.getUsers
);

router.post('/',
  checkAuthentication(tokenService),
  userController.createUser
);

router.post('/login', userController.loginUser);

export default router;