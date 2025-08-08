import { Module } from '@nestjs/common';
import { ProductosController } from './products.controller';
import { ProductosService } from './products.service';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductsModule {}
