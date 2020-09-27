import { CancellableEnumerator, MutableProject, Pair, Quantity, ReadonlyProject } from '@jamashita/publikum-collection';
import { JSONable } from '@jamashita/publikum-interface';
import { BinaryPredicate, Nullable } from '@jamashita/publikum-type';
import { Language, LanguageJSON } from './Language';
import { LanguageID } from './LanguageID';

export class Languages extends Quantity<LanguageID, Language, 'Languages'> implements JSONable<ReadonlyArray<LanguageJSON>> {
  public readonly noun: 'Languages' = 'Languages';
  private readonly languages: ReadonlyProject<LanguageID, Language>;

  public static of(languages: ReadonlyProject<LanguageID, Language>): Languages {
    return new Languages(languages);
  }

  public static ofArray(languages: ReadonlyArray<Language>): Languages {
    const project: MutableProject<LanguageID, Language> = MutableProject.empty<LanguageID, Language>();

    languages.forEach((l: Language) => {
      project.set(l.getLanguageID(), l);
    });

    return Languages.of(project);
  }

  protected constructor(languages: ReadonlyProject<LanguageID, Language>) {
    super();
    this.languages = languages;
  }

  public [Symbol.iterator](): Iterator<Pair<LanguageID, Language>> {
    return this.languages[Symbol.iterator]();
  }

  public contains(value: Language): boolean {
    return this.languages.contains(value);
  }

  public equals(other: unknown): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Languages)) {
      return false;
    }

    return this.languages.equals(other.languages);
  }

  public every(predicate: BinaryPredicate<Language, LanguageID>): boolean {
    return this.languages.every(predicate);
  }

  public forEach(iteration: CancellableEnumerator<LanguageID, Language>): void {
    this.languages.forEach(iteration);
  }

  public get(key: LanguageID): Nullable<Language> {
    return this.languages.get(key);
  }

  public isEmpty(): boolean {
    return this.languages.isEmpty();
  }

  public serialize(): string {
    return this.languages.toString();
  }

  public size(): number {
    return this.languages.size();
  }

  public some(predicate: BinaryPredicate<Language, LanguageID>): boolean {
    return this.languages.some(predicate);
  }

  public values(): Iterable<Language> {
    return this.languages.values();
  }

  public toJSON(): ReadonlyArray<LanguageJSON> {
    const languages: Array<LanguageJSON> = [];

    this.forEach((l: Language) => {
      languages.push(l.toJSON());
    });

    return languages;
  }
}
