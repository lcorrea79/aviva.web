import { MenuItem } from '../../core/models/menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true,
  },
  {
    id: 2,
    label: 'Products',
    icon: 'ri-gift-line',
    link: '/products',
  },
  {
    id: 3,
    label: 'Orders',
    icon: 'ri-shopping-cart-2-line',
    link: '/orders',
  }
];
