import { JSONable } from '@jamashita/publikum-interface';
import { ValueObject } from '@jamashita/publikum-object';
import { Kind } from '@jamashita/publikum-type';
import { Displayable } from '../../General/ValueRange/Displayable';
import { LanguageID } from './LanguageID';
import { LanguageName } from './LanguageName';

// TODO iso639
export type LanguageJSON = Readonly<{
  id: string;
  name: string;
}>;

export class Language extends ValueObject<'Language'> implements Displayable, JSONable<LanguageJSON> {
  public readonly noun: 'Language' = 'Language';
  private readonly id: LanguageID;
  private readonly name: LanguageName;

  public static of(id: LanguageID, name: LanguageName): Language {
    return new Language(id, name);
  }

  public static ofJSON(json: LanguageJSON): Language {
    return Language.of(
      LanguageID.ofString(json.id),
      LanguageName.of(json.name)
    );
  }

  public static validate(n: unknown): n is LanguageJSON {
    if (!Kind.isObject<LanguageJSON>(n)) {
      return false;
    }
    if (!LanguageID.validate(n.id)) {
      return false;
    }
    if (!LanguageName.validate(n.name)) {
      return false;
    }

    return true;
  }

  protected constructor(id: LanguageID, name: LanguageName) {
    super();
    this.id = id;
    this.name = name;
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Language)) {
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

  public toJSON(): LanguageJSON {
    return {
      id: this.id.get().get(),
      name: this.name.get()
    };
  }

  public getID(): LanguageID {
    return this.id;
  }

  public getName(): LanguageName {
    return this.name;
  }
}
