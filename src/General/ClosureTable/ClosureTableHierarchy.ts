import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from '../Tree/Interface/TreeID';

type ClosureTableJSON<P extends Primitive> = Readonly<{
  ancestor: P;
  offspring: P;
}>;

export class ClosureTableHierarchy<P extends Primitive> extends ValueObject<'ClosureTableHierarchy'> implements JSONable<ClosureTableJSON<P>> {
  public readonly noun: 'ClosureTableHierarchy' = 'ClosureTableHierarchy';
  private readonly ancestor: TreeID<P>;
  private readonly offspring: TreeID<P>;

  public static of<PT extends Primitive>(ancestor: TreeID<PT>, offspring: TreeID<PT>): ClosureTableHierarchy<PT> {
    return new ClosureTableHierarchy<PT>(ancestor, offspring);
  }

  protected constructor(ancestor: TreeID<P>, offspring: TreeID<P>) {
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

  public toJSON(): ClosureTableJSON<P> {
    return {
      ancestor: this.ancestor.get(),
      offspring: this.offspring.get()
    };
  }

  public getAncestor(): TreeID<P> {
    return this.ancestor;
  }

  public getOffspring(): TreeID<P> {
    return this.offspring;
  }
}
