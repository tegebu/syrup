import { Nominative } from '@jamashita/publikum-interface';
import { Primitive } from '@jamashita/publikum-type';

export interface TreeID<P extends Primitive, N extends string = string> extends Nominative<N> {
  get(): P;
}
