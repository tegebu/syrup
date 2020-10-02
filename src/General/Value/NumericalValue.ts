import { Nominative } from '@jamashita/publikum-interface';

export interface NumericalValue<N extends string> extends Nominative<N> {
  readonly noun: N;

  get(): number;
}
