import { Button } from '@/components/ui/button';
import banner from '@/assets/images/book-banner (1).jpg';
import hero from '@/assets/images/hero.png';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { useEffect, useState } from 'react';
import { IProduct } from '@/types/globalTypes';
import { useToast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const [data, setData] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const { toast } = useToast();



  //! **

  const handleSlider = (value: number[]) => {
    console.log(value);
  };

  return (
    <>
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative  ">
        <div className="col-span-12 grid grid-cols-3 gap-10 pb-20">
          {data.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
