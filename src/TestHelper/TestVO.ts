import { ValueObject } from '@jamashita/publikum-object';
import { TreeID } from '../General/Tree/Interface/TreeID';

export class TestVO extends ValueObject<'TestVO'> implements TreeID {
  public readonly noun: 'TestVO' = 'TestVO';
  private readonly str: string;

  public constructor(str: string) {
    super();
    this.str = str;
  }

  public get(): string {
    return this.str;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TestVO)) {
      return false;
    }

    return this.str === other.str;
  }

  public serialize(): string {
    return this.str;
  }
}
