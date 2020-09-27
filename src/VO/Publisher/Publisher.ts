import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { PublisherID } from './PublisherID';
import { PublisherName } from './PublisherName';

export type PublisherJSON = Readonly<{
  id: string;
  name: string;
}>;

export class Publisher extends ValueObject<'Publisher'> implements JSONable<PublisherJSON> {
  public readonly noun: 'Publisher' = 'Publisher';
  private readonly id: PublisherID;
  private readonly name: PublisherName;

  public static of(id: PublisherID, name: PublisherName): Publisher {
    return new Publisher(id, name);
  }

  public static ofJSON(json: PublisherJSON): Publisher {
    return Publisher.of(
      PublisherID.ofString(json.id),
      PublisherName.of(json.name)
    );
  }

  public static validate(n: unknown): n is PublisherJSON {
    if (!Kind.isObject<PublisherJSON>(n)) {
      return false;
    }
    if (!PublisherID.validate(n.id)) {
      return false;
    }
    if (!PublisherName.validate(n.name)) {
      return false;
    }

    return true;
  }

  protected constructor(id: PublisherID, name: PublisherName) {
    super();
    this.id = id;
    this.name = name;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Publisher)) {
      return false;
    }
    if (!this.id.equals(other.id)) {
      return false;
    }
    if (!this.name.equals(other.name)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.id.toString());
    properties.push(this.name.toString());

    return properties.join(', ');
  }

  public toJSON(): PublisherJSON {
    return {
      id: this.id.get().get(),
      name: this.name.get()
    };
  }

  public getPublisherID(): PublisherID {
    return this.id;
  }

  public getPublisherName(): PublisherName {
    return this.name;
  }
}
