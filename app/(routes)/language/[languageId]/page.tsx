import Billboard from '@/components/ui/billboard';
import BookCard from '@/components/ui/book-card';
import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-result';
import getBooks from '@/actions/get-books';
import getLanguages from '@/actions/get-languages';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import getCategories from '@/actions/get-categories';

export const revalidate = 0;

type LanguagePageProps = {
  params: {
    languageId: string;
  };
  searchParams: {
    categoryId: string;
  };
};

const LanguagePage: React.FC<LanguagePageProps> = async ({
  params,
  searchParams,
}) => {
  const books = await getBooks(params.languageId, searchParams.categoryId);
  const languages = await getLanguages();
  const categories = await getCategories();

  return (
    <div className="bg-white">
      <Container>
        <Billboard />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters languages={languages} />
            <div className="hidden lg:block">
              <Filter
                valueKey="categoryId"
                name="Categories"
                data={categories}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {books.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {books.map((item) => (
                  <BookCard key={item._id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LanguagePage;
