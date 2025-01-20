//----------------------------------------------------------------
// Imports Section
//----------------------------------------------------------------
import { ProductEffects } from './product.effects';
import { OrderEffects } from './order.effects';

//----------------------------------------------------------------
// Effects Array Section
//----------------------------------------------------------------
export const effects: any[] = [
  ProductEffects,
  OrderEffects
];
//----------------------------------------------------------------
// Exports Section
//----------------------------------------------------------------
export * from './product.effects';
export * from './order.effects';
