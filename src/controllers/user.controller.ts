import { Request, Response } from "express";
import { UserRepository } from "../ports/user.repository";
import { TokenService } from "../ports/token.service";

export class UserController {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService
  ) {}

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userRepository.findAll();
      return res.json({ users });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  createUser = async (req: Request, res: Response) => {
    // validaciones
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    // Crear usuario
    try {
      await this.userRepository.createUser({ name, email });
      return res.json({ message: 'User created' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  loginUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const users = await this.userRepository.findAll();
      if (!users) {
        return res.status(400).json({ message: 'User not found' });
      }
      const user = users.find((user) => user.email === email);
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      const token = await this.tokenService.generate({ email });

      return res.json({ message: 'Login success', token });

    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

}