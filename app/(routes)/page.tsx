import getBooks from '@/actions/get-books';
import Billboard from '@/components/billboard';
import BookList from '@/components/book-list';
import Container from '@/components/ui/container';

export const revalidate = 0;

const HomePage = async () => {
  const books = await getBooks();

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <BookList title="Featured Products" items={books} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
