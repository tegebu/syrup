import { ReadonlyProject } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { Tree } from '../Tree';

export interface TreeFactory<K extends Nominative, V extends Nominative> {

  forge(values: ReadonlyProject<K, V>): Tree<V>;
}
