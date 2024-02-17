import axios from 'axios';
import {NextResponse} from 'next/server';

export type SendResponse = {
  code: string;
  sid: string;
  response: string;
};

export async function POST(req: Request) {
  const body = await req.json();
  const {amount, gateway, account} = body;
  try {
    const response = await axios<SendResponse>({
      method: 'POST',
      url: 'https://api.sifalopay.com/gateway/',
      data: {
        amount: '0.1',
        gateway,
        currency: 'USD',
        account,
      },
      auth: {
        username: 'tor9BS',
        password: '7ab89562ac248754cf4d5b6e58b81b03ebe8cbe7',
      },
    });
    return NextResponse.json<SendResponse>(response.data);
  } catch (e) {
    console.log('[CHEKOUT_ERROR]', e);
    return new NextResponse('ERROR', {status: 500});
  }
}
