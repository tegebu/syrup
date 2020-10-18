import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Primitive } from '@jamashita/publikum-type';
import { IDTreeObject } from '../General/Tree/Interface/IDTreeObject';
import { TreeID } from '../General/Tree/Interface/TreeID';

type TestTreeObjectJSON = Readonly<{
  id: Primitive;
}>;

export class TestTreeObject<K extends TreeID> extends ValueObject<'TestTreeObject'> implements IDTreeObject<K, 'TestTreeObject'>, JSONable<TestTreeObjectJSON> {
  public readonly noun: 'TestTreeObject' = 'TestTreeObject';
  private readonly id: K;

  public constructor(id: K) {
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

  public getTreeID(): K {
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
