export interface UalaAuthResponse {
  access_token: string;
  token_type?: string;
  expires_in?: number;
}

export interface UalaOrderResponse {
  checkout_url: string;
  order_id?: string;
  status?: string;
}
