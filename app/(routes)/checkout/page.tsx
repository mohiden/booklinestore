'use client';

import CheckoutForm, {IFormData} from './components/checkout-form';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';

const CheckoutPage: React.FC = () => {
  const {items} = useCart();
  const handleFormSubmit = (data: IFormData) => {
    // Implement your logic to handle the form data (e.g., send to server)
    console.log(data);
  };

  const totalAmount = items.reduce((total, item) => {
    return total + item.book.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto mt-8 mb-20">
      <Container>
        <CheckoutForm onSubmit={handleFormSubmit} totalAmount={totalAmount} />
      </Container>
    </div>
  );
};

export default CheckoutPage;
