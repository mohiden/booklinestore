import getConfig from '@/actions/get-config';
import {SendResponse} from '@/app/api/send/route';
import Button from '@/components/ui/button';
import useCart from '@/hooks/use-cart';
import {sleep} from '@/lib/utils';
import {IConfig, IOrder, IOrderItem} from '@/types';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
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
  const router = useRouter();
  const {items} = useCart();
  const [config, setConfig] = useState<IConfig | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [slshTotal, setSlshTotal] = useState<number>(0);
  const [usdTotal, setUsdTotal] = useState<number>(() => totalAmount);
  const [formData, setFormData] = useState<IFormData>({
    fullName: '',
    phoneNumber: '',
    address: '',
    paymentMethod: 'Zaad',
    deliveryOption: 'pickup',
    currencyType: 'USD',
  });

  const [total, setTotal] = useState<number>(() => {
    return formData.currencyType === 'USD'
      ? totalAmount
      : totalAmount * parseInt(config?.exchangeRate);
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;
    if (name === 'deliveryOption' && value === 'pickup') {
      setUsdTotal((prev) => prev - 1);
      setSlshTotal((prev) => prev - config?.exchangeRate * 1);
    } else if (name === 'deliveryOption' && value === 'delivery') {
      setUsdTotal((prev) => prev + 1);
      setSlshTotal((prev) => prev + config?.exchangeRate * 1);
    }

    setFormData((prevData) => ({...prevData, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let orderItems: IOrderItem[] = items.map((item) => {
      return {
        book: item.book,
        quantity: item.quantity,
      };
    });
    let order: IOrder = {
      orderItems,
      fullName: formData.fullName,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      deliveryOption: formData.deliveryOption,
      currencyType: formData.currencyType,
      totalPrice: formData.currencyType === 'USD' ? usdTotal : slshTotal,
      orderDate: new Date().toISOString(),
    };
    e.preventDefault();

    const toastId = toast.loading('processing payment...');
    try {
      setLoading(true);
      const res = await axios.post<SendResponse>('/api/send', {
        amount: order.totalPrice,
        gateway: order.paymentMethod,
        account: order.phoneNumber,
        currency: order.currencyType,
      });
      switch (res.data.code) {
        case '601':
          toast.loading('paid successfully...', {id: toastId});
          try {
            await sleep(3000);
            toast.loading('placing order...', {id: toastId});
            await axios.post('/api/checkout', {order});
            toast.success('order placed successfully...', {id: toastId});
            await sleep(3000);
            setLoading(false);
            toast.dismiss(toastId);
            router.push('/checkout?success=true');
          } catch {
            router.push('/checkout?failed=true');
          }
          break;
        case '602':
          toast.error('failed payment! 602', {id: toastId});
          return;
        case '603':
          toast.error('failed payment! 603', {id: toastId});
          return;
        default:
          toast.error('failed payment! 604', {id: toastId});
          return;
      }
    } catch {
      toast.error('failed payment!', {id: toastId});
      router.push('/checkout?failed=true');
    } finally {
      await sleep(3000);
      toast.dismiss(toastId);
      setLoading(false);
    }

    return;
  };

  useEffect(() => {
    const conf = async () => {
      const res = await getConfig();
      setConfig(res);
      setSlshTotal(totalAmount * parseInt(res.exchangeRate));
    };
    conf();
  }, [totalAmount]);
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Total Amount:</span>
          <span className="font-semibold">
            {formData.currencyType === 'USD' ? '$' : ''}
            {formData.currencyType === 'USD' ? usdTotal : slshTotal}
          </span>
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
            <option selected value="SLSH">
              SLSH morning
            </option>
            <option value="USD">USD</option>
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
