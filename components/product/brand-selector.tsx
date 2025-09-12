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
import { useEffect, useState } from 'react';
import { Brand } from '../interfaces/interface';
import { getBrands } from '@/actions';

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
    <div className="grid gap-1.5">
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
          <SelectValue placeholder="Marcas">
            {
              brands.find((b) => b.id === selected)?.name ?? 'Marcas'
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
