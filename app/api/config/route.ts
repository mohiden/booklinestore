import getConfig from '@/actions/get-config';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(_: NextRequest, res: NextResponse) {
  const config = await getConfig();
  return NextResponse.json(config);
}
