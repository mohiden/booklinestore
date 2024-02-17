import BookCard from '@/components/ui/book-card';
import {IBook} from '@/types';
import NoResults from '@/components/ui/no-result';

type BookListProps = {
  title: string;
  items: IBook[];
};

const BookList: React.FC<BookListProps> = ({title, items}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <BookCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
