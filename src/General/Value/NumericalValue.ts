import { Nominative } from '@jamashita/publikum-interface';

export interface NumericalValue<N extends string = string> extends Nominative<N> {
  readonly noun: N;

  get(): number;
}
