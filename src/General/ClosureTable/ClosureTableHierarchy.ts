import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';

export class ClosureTableHierarchy<V extends Nominative> extends ValueObject<'ClosureTableHierarchy'> {
  public readonly noun: 'ClosureTableHierarchy' = 'ClosureTableHierarchy';
  private readonly ancestor: V;
  private readonly offspring: V;

  public static of<VT extends Nominative>(ancestor: VT, offspring: VT): ClosureTableHierarchy<VT> {
    return new ClosureTableHierarchy<VT>(ancestor, offspring);
  }

  protected constructor(ancestor: V, offspring: V) {
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

  public getOffspring(): V {
    return this.offspring;
  }
}
