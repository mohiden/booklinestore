import getCategories from '@/actions/get-categories';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(_: NextRequest, res: NextResponse) {
  const books = await getCategories();
  return NextResponse.json(books);
}
