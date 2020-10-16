import { ReadonlyProject } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { Tree } from '../Tree';
import { TreeObject } from './TreeObject';

export interface TreeFactory<K extends Nominative, V extends TreeObject> {

  forge(values: ReadonlyProject<K, V>): Tree<V>;
}
