import {SendResponse} from '@/app/api/send/route';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import axios from 'axios';
import React, {useState} from 'react';
import toast from 'react-hot-toast';

interface CheckoutFormProps {
  onSubmit: (data: IFormData) => void;
  totalAmount: number;
}

export interface IFormData {
  fullName: string;
  phoneNumber: string;
  address: string;
  paymentMethod: 'Zaad' | 'Edahab';
  deliveryOption: 'delivery' | 'pickup';
  currencyType: 'USD' | 'SLSH';
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({onSubmit, totalAmount}) => {
  const {items} = useCart();
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(totalAmount);
  const [formData, setFormData] = useState<IFormData>({
    fullName: '',
    phoneNumber: '',
    address: '',
    paymentMethod: 'Zaad',
    deliveryOption: 'pickup',
    currencyType: 'SLSH',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    if (name === 'deliveryOption' && value === 'pickup') {
      setTotal(totalAmount);
    } else if (name === 'deliveryOption' && value === 'delivery') {
      setTotal((prev) => prev + 1);
    }
    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(items);
    return;
    try {
      setLoading(true);
      // onSubmit(formData);
      const response = await axios<SendResponse>({
        method: 'POST',
        url: '/api/send',
        data: {
          amount: totalAmount,
          account: formData.phoneNumber,
          gateway: formData.paymentMethod,
        },
      });
      switch (response.data.code) {
        case '601':
          //send data to db/sanity

          // const res = await axios<CheckoutResponse>({
          //   method: 'POST',
          //   url: '/api/checkout',
          //   data: {
          //     fullName: formData.fullName,
          //     phoneNumber: formData.phoneNumber,
          //     address: formData.address,
          //     paymentMethod: formData.paymentMethod,
          //     deliveryOption: formData.deliveryOption,
          //     sid: response.data.sid,
          //   },
          // });
          break;
        case '600':
          toast.error('An error occurred');
          break;
        case '604':
          toast.error('An error occurred');
          break;
        default:
          toast.error('An error occurred');
          break;
      }
      if (response.data.code !== '600') {
        toast.error(response.data.response);
      } else {
      }
    } catch (e) {
      toast.error('An error occurred');
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
        <hr className="my-10" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-600"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-600"
          >
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="063xx / 065xx"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-600"
          >
            Address
          </label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="currencyType"
            className="block text-sm font-medium text-gray-600"
          >
            Currency Type
          </label>
          <select
            id="currencyType"
            name="currencyType"
            value={formData.currencyType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>
              Select Currency Type
            </option>
            <option selected value="slsh">
              SLSH
            </option>
            <option value="usd">USD</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="paymentMethod"
            className="block text-sm font-medium text-gray-600"
          >
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option value="" disabled>
              Select Payment Method
            </option>
            <option value="zaad">Zaad</option>
            <option value="edahab">Edahab</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="deliveryOption"
            className="block text-sm font-medium text-gray-600"
          >
            Delivery Option
          </label>
          <select
            id="deliveryOption"
            name="deliveryOption"
            value={formData.deliveryOption}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          >
            <option selected value="" disabled>
              Select Delivery Option
            </option>
            <option value="pickup">Pickup - free</option>
            <option value="delivery">Delivery + $1</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input type="checkbox" name="terms" className="mr-2" required />
            <span className="text-sm text-gray-600">
              I agree to the terms and conditions
            </span>
          </label>
        </div>
        <Button disabled={loading} type="submit">
          {loading ? 'Loading...' : 'Place Order'}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;
