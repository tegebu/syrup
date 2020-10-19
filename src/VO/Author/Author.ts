import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { Displayable } from '../../General/ValueRange/Displayable';
import { AuthorID } from './AuthorID';
import { AuthorName } from './AuthorName';

export type AuthorJSON = Readonly<{
  id: string;
  name: string;
}>;

export class Author extends ValueObject<'Author'> implements Displayable, JSONable<AuthorJSON> {
  public readonly noun: 'Author' = 'Author';
  private readonly id: AuthorID;
  private readonly name: AuthorName;

  public static of(id: AuthorID, name: AuthorName): Author {
    return new Author(id, name);
  }

  public static ofJSON(json: AuthorJSON): Author {
    return Author.of(
      AuthorID.ofString(json.id),
      AuthorName.of(json.name)
    );
  }

  public static generate(name: string): Author {
    return Author.of(
      AuthorID.generate(),
      AuthorName.of(name)
    );
  }

  public static validate(n: unknown): n is AuthorJSON {
    if (!Kind.isObject<AuthorJSON>(n)) {
      return false;
    }
    if (!AuthorID.validate(n.id)) {
      return false;
    }
    if (!AuthorName.validate(n.name)) {
      return false;
    }

    return true;
  }

  protected constructor(id: AuthorID, name: AuthorName) {
    super();
    this.id = id;
    this.name = name;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Author)) {
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

  public display(): string {
    return this.name.display();
  }

  public serialize(): string {
    const properties: Array<string> = [];

    properties.push(this.id.toString());
    properties.push(this.name.toString());

    return properties.join(', ');
  }

  public toJSON(): AuthorJSON {
    return {
      id: this.id.get().get(),
      name: this.name.get()
    };
  }

  public getID(): AuthorID {
    return this.id;
  }

  public getName(): AuthorName {
    return this.name;
  }
}
