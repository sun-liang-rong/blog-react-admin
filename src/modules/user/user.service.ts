import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  create(createUserDto: any) {
    return this.userRepository.save(createUserDto);
  }

  findAll(page: number = 1, limit: number = 10) {
    return this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: any) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { username: loginDto.username }
    });
    console.log(user, loginDto);
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    // const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    const isPasswordValid = loginDto.password === user.password;
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('用户名或密码错误');
    }

    const payload = { username: user.username, sub: user.id };
    delete user.password;
    return {
      userInfo: user,
      token: await this.jwtService.signAsync(payload),
    };
  }
}