import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<PrismaUser[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(dto: CreateUserDto): Promise<PrismaUser> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim(),
        password: hashedPassword,
      },
    });
  }
}
