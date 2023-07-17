import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { IProduct } from '@/types/globalTypes';
import { useEffect, useState } from 'react';

export default function Products() {
  const [data, setData] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const { toast } = useToast();

  //! Dummy Data



  //! **

  const handleSlider = (value: number[]) => {
    console.log(value);
  };



  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative  ">
      
      <div className="col-span-12 grid grid-cols-3 gap-10 pb-20">
        {data.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
