import { ValueObject } from '@jamashita/publikum-object';
import { TegeID } from './TegeID';

export class TegeHierarchy extends ValueObject<'TegeHierarchy'> {
  public readonly noun: 'TegeHierarchy' = 'TegeHierarchy';
  private readonly ancestorID: TegeID;
  private readonly offspringID: TegeID;

  public static of(ancestorID: TegeID, offspringID: TegeID): TegeHierarchy {
    return new TegeHierarchy(ancestorID, offspringID);
  }

  protected constructor(ancestorID: TegeID, offspringID: TegeID) {
    super();
    this.ancestorID = ancestorID;
    this.offspringID = offspringID;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof TegeHierarchy)) {
      return false;
    }
    if (!this.ancestorID.equals(other.ancestorID)) {
      return false;
    }
    if (!this.offspringID.equals(other.offspringID)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.ancestorID.toString());
    properties.push(this.offspringID.toString());

    return properties.join(', ');
  }

  public getAncestorID(): TegeID {
    return this.ancestorID;
  }

  public getOffspringID(): TegeID {
    return this.offspringID;
  }
}
