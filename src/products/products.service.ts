import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './DTOs/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  update(id: string, data: Partial<CreateProductDto>) {
    return this.prisma.product.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
