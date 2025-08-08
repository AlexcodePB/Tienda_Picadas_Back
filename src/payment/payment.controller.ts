import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  generatePayment(@Body() dto: CreatePaymentDto) {
    return this.paymentService.createPayment(dto);
  }
  @Post('webhook')
  handleWebhook(@Body() data: any) {
    console.log('Pago recibido:', data);
    return { received: true };
  }
}
