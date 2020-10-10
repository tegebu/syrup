import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';

export class ClosureTableHierarchy<V extends Nominative, W extends Nominative = V> extends ValueObject<'ClosureTableHierarchy'> {
  public readonly noun: 'ClosureTableHierarchy' = 'ClosureTableHierarchy';
  private readonly ancestor: V;
  private readonly offspring: W;

  public static of<VT extends Nominative, WT extends Nominative = VT>(ancestor: VT, offspring: WT): ClosureTableHierarchy<VT, WT> {
    return new ClosureTableHierarchy<VT, WT>(ancestor, offspring);
  }

  protected constructor(ancestor: V, offspring: W) {
    super();
    this.ancestor = ancestor;
    this.offspring = offspring;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof ClosureTableHierarchy)) {
      return false;
    }
    if (!this.ancestor.equals(other.ancestor)) {
      return false;
    }
    if (!this.offspring.equals(other.offspring)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.ancestor.toString());
    properties.push(this.offspring.toString());

    return properties.join(', ');
  }

  public getAncestor(): V {
    return this.ancestor;
  }

  public getOffspring(): W {
    return this.offspring;
  }
}
