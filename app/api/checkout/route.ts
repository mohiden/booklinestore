export type CheckoutResponse = {
  code: string;
  sid: string;
  response: string;
  name: string;
};

type Payload = {
  products: null;
  totalAmount: 'Hello';
  phoneNumber: string;
  address: string;
  deliveryOption: string;
};

export async function POST(req: Request) {
  const body = await req.json();
  const {products, totalAmount, phoneNumber, address, deliveryOption} = body;
  try {
  } catch (e) {
    console.log('[CHEKOUT_ERROR]', e);
    return new Response('ERROR', {status: 500});
  }
}
