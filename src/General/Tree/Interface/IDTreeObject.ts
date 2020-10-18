import { Nominative } from '@jamashita/publikum-interface';
import { TreeID } from './TreeID';

export interface IDTreeObject<N extends string = string> extends Nominative<N> {
  getTreeID(): TreeID;
}
