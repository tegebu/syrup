import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Kind, Nullable } from '@jamashita/publikum-type';
import { PublisherID } from './PublisherID';
import { PublisherName } from './PublisherName';
import { PublisherURL } from './PublisherURL';

export type PublisherJSON = Readonly<{
  id: string;
  name: string;
  url: Nullable<string>;
}>;

export class Publisher extends ValueObject<'Publisher'> implements JSONable<PublisherJSON> {
  public readonly noun: 'Publisher' = 'Publisher';
  private readonly id: PublisherID;
  private readonly name: PublisherName;
  private readonly url: PublisherURL;

  public static of(id: PublisherID, name: PublisherName, url: PublisherURL): Publisher {
    return new Publisher(id, name, url);
  }

  public static ofJSON(json: PublisherJSON): Publisher {
    return Publisher.of(
      PublisherID.ofString(json.id),
      PublisherName.of(json.name),
      PublisherURL.of(json.url)
    );
  }

  public static generate(name: string, url: string): Publisher {
    return Publisher.of(
      PublisherID.generate(),
      PublisherName.of(name),
      PublisherURL.of(url)
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
    if (!PublisherURL.validate(n.url)) {
      return false;
    }

    return true;
  }

  protected constructor(id: PublisherID, name: PublisherName, url: PublisherURL) {
    super();
    this.id = id;
    this.name = name;
    this.url = url;
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
    if (!this.url.equals(other.url)) {
      return false;
    }

    return true;
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.id.toString());
    properties.push(this.name.toString());
    properties.push(this.url.toString());

    return properties.join(', ');
  }

  public toJSON(): PublisherJSON {
    return {
      id: this.id.get().get(),
      name: this.name.get(),
      url: this.url.get()
    };
  }

  public getID(): PublisherID {
    return this.id;
  }

  public getName(): PublisherName {
    return this.name;
  }

  public getURL(): PublisherURL {
    return this.url;
  }
}
