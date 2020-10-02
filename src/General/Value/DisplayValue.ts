import { Nominative } from '@jamashita/publikum-interface';
import { Displayable } from './Displayable';

export type ValueType = 'unique' | 'range';

export interface DisplayValue<V extends ValueType = ValueType, N extends string = string> extends Displayable, Nominative<N> {
  readonly noun: N;
  readonly type: V;
}
