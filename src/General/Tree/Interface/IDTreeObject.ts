import { Nominative } from '@jamashita/publikum-interface';
import { TreeID } from './TreeID';

export interface IDTreeObject<K extends TreeID, N extends string = string> extends Nominative<N> {
  getTreeID(): K;
}
