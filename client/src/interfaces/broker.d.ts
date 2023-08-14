import { BaseKey } from '@pankod/refine-core';
import { ReactNode } from 'react';

//BrokerCardProp definiše restorane koji su dostupni u komponenti BrokerCard. 
//Ova komponenta se koristi za prikaz informacija o jednom brokeru za restorane.
export interface BrokerCardProp {
    id?: BaseKey | undefined,
    name: string,
    email: string,
    avatar: string,
    noOfRestaurants: number
}

//InfoBarProps definiše restorane za komponentu InfoBar. 
//Ova komponenta se koristi za prikazivanje informacija o restoranu
export interface InfoBarProps {
    icon: ReactNode,
    name: string
}
