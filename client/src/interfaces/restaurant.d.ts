import { BaseKey } from '@pankod/refine-core';

export interface FormFieldProp {
  title: string,
  labelName: string
}

export interface FormValues {
    title: string,
    description: string,
    restaurantType: string,
    location: string,
    price: string | undefined ,
}

export interface RestaurantCardProps {
  id?: BaseKey | undefined,
  title: string,
  location: string,
  price: string,
  photo: string,
}
