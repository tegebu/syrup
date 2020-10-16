import { MutableAddress, MutableProject, ReadonlyProject } from '@jamashita/publikum-collection';
import { Kind, Nullable } from '@jamashita/publikum-type';
import { ClosureTable } from '../ClosureTable/ClosureTable';
import { ClosureTableOffsprings } from '../ClosureTable/ClosureTableOffsprings';
import { TreeError } from './Error/TreeError';
import { TreeFactory } from './Interface/TreeFactory';
import { TreeID } from './Interface/TreeID';
import { TreeObject } from './Interface/TreeObject';
import { Tree } from './Tree';
import { TreeNode } from './TreeNode';

export class ClosureTableTreeFactory<K extends TreeID, V extends TreeObject> implements TreeFactory<K, V> {
  private readonly table: ClosureTable<K>;

  public constructor(table: ClosureTable<K>) {
    this.table = table;
  }

  public forge(values: ReadonlyProject<K, V>): Tree<V> {
    if (this.table.isEmpty()) {
      throw new TreeError('THIS CLOSURE TABLE IS EMPTY');
    }

    const pool: MutableProject<K, TreeNode<V>> = MutableProject.empty<K, TreeNode<V>>();
    const used: MutableAddress<K> = MutableAddress.empty<K>();
    // TODO should implement sort in table
    const array: ReadonlyArray<Nullable<TreeNode<V>>> = this.table.sort().toArray().map<Nullable<TreeNode<V>>>((key: K) => {
      return this.forgeInternal(key, values, pool, used);
    });

    return Tree.of<V>(array[array.length - 1] as unknown as TreeNode<V>);
  }

  private forgeInternal(key: K, values: ReadonlyProject<K, V>, pool: MutableProject<K, TreeNode<V>>, used: MutableAddress<K>): Nullable<TreeNode<V>> {
    const already: Nullable<TreeNode<V>> = pool.get(key);

    if (!Kind.isNull(already)) {
      pool.remove(key);

      return already;
    }
    if (used.contains(key)) {
      return null;
    }


    const value: Nullable<V> = values.get(key);

    if (Kind.isNull(value)) {
      throw new TreeError(`THIS KEY DOES NOT HAVE VALUE. GIVEN: ${key.toString()}`);
    }

    const offsprings: ClosureTableOffsprings<K> = this.table.get(key) as ClosureTableOffsprings<K>;

    const address: MutableAddress<TreeNode<V>> = MutableAddress.empty<TreeNode<V>>();

    offsprings.forEach((child: K) => {
      if (key.equals(child)) {
        return;
      }

      const node: Nullable<TreeNode<V>> = this.forgeInternal(child, values, pool, used);

      if (Kind.isNull(node)) {
        return;
      }

      address.add(node);
    });

    const newNode: TreeNode<V> = TreeNode.of<V>(value, address);

    pool.set(key, newNode);
    used.add(key);

    return newNode;
  }
}
