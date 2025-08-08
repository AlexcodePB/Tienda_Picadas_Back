import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductosService } from '../products/products.service';
import { UpdateProductDto } from './DTOs/update-product.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  getAll() {
    return this.productosService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }

  @Post()
  create(@Body() data: any) {
    return this.productosService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productosService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productosService.delete(id);
  }
}
