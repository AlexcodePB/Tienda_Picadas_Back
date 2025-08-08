export class CreatePaymentDto {
  id: string; // ID de la orden
  email: string;
  amount: number;
  description?: string;
}
