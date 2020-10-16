import { JSONable, Nominative } from '@jamashita/publikum-interface';
import { TreeID } from './TreeID';

export interface TreeObject<N extends string = string> extends Nominative<N>, JSONable {
  getTreeID(): TreeID;
}
