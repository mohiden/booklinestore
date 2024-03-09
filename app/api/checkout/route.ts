import postOrder from '@/actions/post-order';
import {IOrder} from '@/types';
import {NextRequest} from 'next/server';

export type CheckoutResponse = {
  status: 'SUCCESS' | 'ERROR';
};

export async function POST(req: NextRequest) {
  const body: {order: IOrder} = await req.json();
  const {order} = body;
  try {
    const res = await postOrder(order);
    return new Response('SUCCESS', {status: 200});
  } catch (e) {
    console.log('[CHEKOUT_ERROR]', e);
    return new Response('ERROR', {status: 500});
  }
}
