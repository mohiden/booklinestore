import {client} from '@/lib/sanity';
import {IOrder, IOrderItem} from '@/types';

const postOrder = async (order: IOrder) => {
  const response = await Promise.all(
    order.orderItems.map(async (item: IOrderItem) => {
      return await client.create({
        _type: 'orderItem',
        book: {
          _type: 'reference',
          _ref: item.book._id,
        },
        quantity: item.quantity,
      });
    }),
  );
  await Promise.all(
    order.orderItems.map(
      async (item) =>
        await client
          .patch(item.book._id)
          .set({quantity: item.book.quantity - item.quantity})
          .commit(),
    ),
  );

  return await client.create({
    _type: 'order',
    ...order,
    orderItems: response.map((item) => ({
      _type: 'reference',
      _ref: item._id,
    })),
  });
};

export default postOrder;
