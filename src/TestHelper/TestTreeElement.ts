import { ImmutableAddress, ReadonlyAddress } from '@jamashita/publikum-collection';
import { ValueObject } from '@jamashita/publikum-object';
import { TreeElement } from '../General/Tree/Interface/TreeElement';
import { TreeID } from '../General/Tree/Interface/TreeID';
import { TestTreeObject } from './TestTreeObject';

export class TestTreeElement extends ValueObject<'TestTreeElement'> implements TreeElement<TestTreeObject, 'TestTreeElement'> {
  public readonly noun: 'TestTreeElement' = 'TestTreeElement';
  private readonly value: TestTreeObject;
  private readonly children: ReadonlyAddress<TreeElement<TestTreeObject>>;

  public constructor(value: TestTreeObject, children: ReadonlyAddress<TreeElement<TestTreeObject>> = ImmutableAddress.empty<TreeElement<TestTreeObject>>()) {
    super();
    this.value = value;
    this.children = children;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TestTreeElement)) {
      return false;
    }
    if (!this.value.equals(other.value)) {
      return false;
    }
    if (!this.children.equals(other.children)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.value.toString());
    properties.push(this.children.toString());

    return properties.join(', ');
  }

  public getTreeID(): TreeID<string> {
    return this.value.getTreeID();
  }

  public getValue(): TestTreeObject {
    return this.value;
  }

  public getChildren(): ReadonlyAddress<TreeElement<TestTreeObject>> {
    return this.children;
  }

  public isLeaf(): boolean {
    return this.children.isEmpty();
  }
}
