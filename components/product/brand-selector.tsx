'use client';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import clsx from 'clsx';
import { Brand } from './brand';
import { useEffect, useState } from 'react';
import { getBrands } from '@/actions/products/get-brands';

type BrandSelectorProps = {
  value?: string; // brand.id
  defaultValue?: string; // brand.id
  onChange: (brand: Brand) => void;
  disabled?: boolean;
  className?: string;
};

export const BrandSelector: React.FC<BrandSelectorProps> = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  className = '',
}) => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const selected = value ?? defaultValue ?? '';

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getBrands();
        if (res.statusCode === 200 && res.brands) {
          setBrands(res.brands);
        } else {
          console.error('Error fetching brands:', res.message);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="brand">Marca *</Label>
      <Select
        value={selected}
        onValueChange={(selectedId) => {
          const selectedBrand = brands.find((b) => b.id === selectedId);
          if (selectedBrand) onChange(selectedBrand);
        }}
        disabled={disabled}
      >
        <SelectTrigger id="brand" className={clsx('w-full', className)}>
          <SelectValue placeholder="Selecciona una marca">
            {
              brands.find((b) => b.id === selected)?.name ?? 'Selecciona una marca'
            }
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
