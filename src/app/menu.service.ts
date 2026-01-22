import { Injectable } from '@angular/core';

export interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menuItems: MenuItem[] = [
        {
            id: 1,
            name: 'Masala Dosa',
            description: 'Food is any substance consumed by an organism for nutritional support.',
            price: 12,
            image: 'assets/images/dosa.png'
        },
        {
            id: 2,
            name: 'Idli Sambar',
            description: 'Food is any substance consumed by an organism for nutritional support.',
            price: 12,
            image: 'assets/images/idli.png'
        },
        {
            id: 3,
            name: 'Medu Vada',
            description: 'Food is any substance consumed by an organism for nutritional support.',
            price: 12,
            image: 'assets/images/vada.png'
        },
        {
            id: 4,
            name: 'Veg Biryani',
            description: 'Food is any substance consumed by an organism for nutritional support.',
            price: 12,
            image: 'assets/images/biryani.png'
        },
        {
            id: 5,
            name: 'Ven Pongal',
            description: 'Classic comfort food made with rice and lentils, seasoned with black pepper, cashews, and ghee.',
            price: 10,
            image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Ven_Pongal.jpg'
        },
        {
            id: 6,
            name: 'Rava Dosa',
            description: 'Crispy semolina crêpe with onions and green chilies, served with chutney and sambar.',
            price: 11,
            image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Rava_Dosa_1.jpg'
        },
        {
            id: 7,
            name: 'Curd Rice',
            description: 'Cool and creamy yogurt rice tempered with mustard seeds and curry leaves.',
            price: 8,
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Curd_Rice.jpg'
        },
        {
            id: 8,
            name: 'Filter Coffee',
            description: 'Authentic South Indian brew served frothy and hot in a traditional brass tumbler.',
            price: 4,
            image: 'https://upload.wikimedia.org/wikipedia/commons/2/26/South_Indian_filter_coffee.JPG'
        }
    ];

    getMenuItems() {
        return this.menuItems;
    }
}
