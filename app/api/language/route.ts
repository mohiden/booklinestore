import getLanguages from '@/actions/get-languages';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(_: NextRequest, res: NextResponse) {
  const books = await getLanguages();
  return NextResponse.json(books);
}
