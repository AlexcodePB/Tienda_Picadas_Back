import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly config: ConfigService) {}

  private async getAccessToken(): Promise<string> {
    const authUrl = this.config.get<string>('UALA_AUTH_URL');
    if (!authUrl) throw new Error('UALA_AUTH_URL no definido');

    const response = await axios.post(
      authUrl,
      {
        username: this.config.get<string>('USERNAME_UALA'),
        client_id: this.config.get<string>('CLIENT_ID_UALA'),
        client_secret: this.config.get<string>('CLIENT_SECRET_UALA'),
        grant_type: 'client_credentials',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return response.data.access_token;
  }

  async createPayment(
    dto: CreatePaymentDto,
  ): Promise<{ checkout_url: string }> {
    try {
      const token = await this.getAccessToken();

      const createOrderUrl = this.config.get<string>('UALA_ORDER_URL');
      if (!createOrderUrl) throw new Error('UALA_ORDER_URL no definido');

      const response = await axios.post(
        createOrderUrl,
        {
          amount: dto.amount,
          currency: 'ARS',
          order_id: dto.id,
          description: dto.description || `Pago orden ${dto.id}`,
          email: dto.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return { checkout_url: response.data.checkout_url };
    } catch (error) {
      const err = error as AxiosError;
      throw new HttpException(
        err.response?.data || 'Error al crear la orden de pago',
        err.response?.status || 500,
      );
    }
  }
}
