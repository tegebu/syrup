import { Nominative } from '@jamashita/publikum-interface';

export type ValueType = 'unique' | 'range';

export interface DisplayValue<V extends ValueType = ValueType, N extends string = string> extends Nominative<N> {
  readonly noun: N;
  readonly type: V;

  display(): string;
}
