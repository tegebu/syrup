import { Nominative } from '@jamashita/publikum-interface';
import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from './TreeID';

export interface TreeObject<P extends Primitive, N extends string = string> extends Nominative<N> {
  getTreeID(): TreeID<P>;
}
