'use client';

import {ShoppingCart} from 'lucide-react';

import Currency from '@/components/ui/currency';
import Button from '@/components/ui/button';
import {IBook} from '@/types';
import useCart from '@/hooks/use-cart';

interface InfoProps {
  data: IBook;
}

const Info: React.FC<InfoProps> = ({data}) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data.price} />
        </p>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900 ml-auto">{data?.language.name}</p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-start gap-x-4">
          <h3 className="font-semibold text-black">Description:</h3>
          <div>{data?.description}</div>
        </div>
        <div className="flex items-start gap-x-4">
          <h3 className="font-semibold text-black">Author</h3>
          <div>{data?.author}</div>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
