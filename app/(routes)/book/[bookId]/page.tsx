// import BookList from '@/components/product-list'
// import getBooks from '@/actions/get-products';
import Container from '@/components/ui/container';
import getBook from '@/actions/get-book';
import Info from '@/components/info';
import Gallery from '@/components/gallery';

export const revalidate = 0;

interface BookPageProps {
  params: {
    bookId: string;
  };
}

const BookPage: React.FC<BookPageProps> = async ({params}) => {
  const book = await getBook(params.bookId);
  // const suggestedProducts = await getBooks({
  //     categoryId: book?.category?.id
  // });

  if (!book) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={book.images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={book} />
            </div>
          </div>
          <hr className="my-10" />
          {/* <BookList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default BookPage;
