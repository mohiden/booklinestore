'use client';

import React, {useEffect, useState} from 'react';
import CheckoutForm, {IFormData} from './components/checkout-form';
import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import {IConfig} from '@/types';
import getConfig from '@/actions/get-config';

const CheckoutPage: React.FC = () => {
  const {items} = useCart();
  const [config, setConfig] = useState<IConfig | undefined>(undefined);
  const handleFormSubmit = (data: IFormData) => {
    // Implement your logic to handle the form data (e.g., send to server)
    console.log(data);
  };

  const totalAmount = items.reduce((total, item) => {
    return total + item.book.price * item.quantity;
  }, 0);

  const conf = async () => {
    const res = await getConfig();
    console.log(res);
    setConfig(res);
  };

  useEffect(() => {
    conf();
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-20">
      <Container>
        <CheckoutForm onSubmit={handleFormSubmit} totalAmount={totalAmount} />
      </Container>
    </div>
  );
};

export default CheckoutPage;
