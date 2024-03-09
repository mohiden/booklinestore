import {create} from 'zustand';
import {toast} from 'react-hot-toast';
import {persist, createJSONStorage} from 'zustand/middleware';

import {IBook, IOrderItem} from '@/types';

export type CartItem = Omit<IOrderItem, '_id'>;

interface CartStore {
  items: CartItem[];
  addItem: (data: IBook) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: IBook) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.book._id === data._id,
        );

        if (existingItem) {
          return toast('Item already in cart.');
        }

        set({items: [...get().items, {book: data, quantity: 1}]});
        toast.success('Item added to cart.');
      },
      increaseQty: (id: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.book._id === id);

        if (
          existingItem &&
          existingItem.quantity < existingItem.book.quantity
        ) {
          existingItem.quantity += 1;
          set({items: [...currentItems]});
          return;
        }
      },
      decreaseQty(id: string) {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.book._id === id);
        if (existingItem && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          set({items: [...currentItems]});
        }
      },
      removeItem: (id: string) => {
        set({items: [...get().items.filter((item) => item.book._id !== id)]});
        toast.success('Item removed from cart.');
      },
      removeAll: () => set({items: []}),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

// write me merge sort function here

export default useCart;
