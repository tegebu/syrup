import { ValueObject } from '@jamashita/publikum-object';
import { Primitive } from '@jamashita/publikum-type';
import { TreeID } from '../General/Tree/Interface/TreeID';
import { TreeObject } from '../General/Tree/Interface/TreeObject';

type TestTreeObjectJSON = Readonly<{
  id: Primitive;
}>;

export class TestTreeObject extends ValueObject<'TestTreeObject'> implements TreeObject<'TestTreeObject'> {
  public readonly noun: 'TestTreeObject' = 'TestTreeObject';
  private readonly id: TreeID;

  public constructor(id: TreeID) {
    super();
    this.id = id;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TestTreeObject)) {
      return false;
    }

    return this.id.equals(other.id);
  }

  public getTreeID(): TreeID {
    return this.id;
  }

  public serialize(): string {
    return this.id.toString();
  }

  public toJSON(): TestTreeObjectJSON {
    return {
      id: this.id.get()
    };
  }
}
