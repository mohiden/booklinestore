import getBooks from '@/actions/get-books';
import {NextRequest, NextResponse} from 'next/server';

export async function GET(_: NextRequest, res: NextResponse) {
  const books = await getBooks();
  return NextResponse.json(books);
}
