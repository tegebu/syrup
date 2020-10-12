import { Nominative } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';

export class ClosureTableHierarchy<K extends Nominative> extends ValueObject<'ClosureTableHierarchy'> {
  public readonly noun: 'ClosureTableHierarchy' = 'ClosureTableHierarchy';
  private readonly ancestor: K;
  private readonly offspring: K;

  public static of<KT extends Nominative>(ancestor: KT, offspring: KT): ClosureTableHierarchy<KT> {
    return new ClosureTableHierarchy<KT>(ancestor, offspring);
  }

  protected constructor(ancestor: K, offspring: K) {
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

  public getAncestor(): K {
    return this.ancestor;
  }

  public getOffspring(): K {
    return this.offspring;
  }
}
