import Image from 'next/image';
import {X, Plus, Minus} from 'lucide-react';

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';
import useCart, {CartItem} from '@/hooks/use-cart';

interface CartItemProps {
  data: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({data}) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.book._id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.book.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">
              {data.book.title}
            </p>
          </div>

          <div className="mt-1 flex text-sm">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <IconButton
                  onClick={() => cart.decreaseQty(data.book._id)}
                  icon={<Minus size={13} />}
                />
                <span className="font-bold">{data.quantity}</span>
                <IconButton
                  onClick={() => cart.increaseQty(data.book._id)}
                  icon={<Plus size={13} />}
                />
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-xl mr-2">x</span>
                <Currency value={data.book.price} />
              </div>
            </div>
          </div>
          <p className="text-gray-500">{data?.book.language.name}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
