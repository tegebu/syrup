import { Nominative } from '@jamashita/publikum-interface';
import { Displayable } from './Displayable';

export interface DisplayValue<N extends string = string> extends Displayable, Nominative<N> {
  readonly noun: N;
}
