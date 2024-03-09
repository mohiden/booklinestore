'use client';

import Image from 'next/image';
import {MouseEventHandler} from 'react';
import {Expand, ShoppingCart} from 'lucide-react';
import {useRouter} from 'next/navigation';

import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
import {IBook} from '@/types';

interface BookCardProps {
  data: IBook;
}

const BookCard: React.FC<BookCardProps> = ({data}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/book/${data?._id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-4 space-y-4 shadow-md hover:shadow-lg transition"
    >
      {/* Image & actions */}
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative hover:bg-gray-200 transition">
        <Image
          src={data.images[0].url}
          alt="image"
          fill
          objectFit="cover"
          className="rounded-md hover:opacity-90 transition-opacity"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-4 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="">
        <p className="font-semibold text-lg">{data.title}</p>

        <div>
          {data.language && (
            <span className="inline-block px-3 py-1 text-xs font-semibold leading-none bg-blue-500 text-white rounded-full mt-2">
              {data.language.name}
            </span>
          )}
          {data.quantity === 0 && (
            <span className="inline-block ml-2 px-3 py-1 text-xs font-semibold leading-none bg-red-500 text-white rounded-full mt-2">
              out of stock
            </span>
          )}
        </div>

        {/* <p className="text-sm text-gray-600 mt-1">{data.category?.name}</p> */}
      </div>

      {/* Price & Review */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
        <div className="flex items-center gap-x-2">
          {/* <span className="text-yellow-400">★</span>{' '} */}
          {/* Rating star, you can replace this with a dynamic rating component */}
          {/* <span className="text-sm text-gray-500">(45 Reviews)</span>{' '} */}
          {/* Replace with dynamic review count */}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
