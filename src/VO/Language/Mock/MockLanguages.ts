import { ImmutableProject, MutableProject } from '@jamashita/publikum-collection';
import { Language } from '../Language';
import { LanguageID } from '../LanguageID';
import { Languages } from '../Languages';

export class MockLanguages extends Languages {
  private static toProject(languages: ReadonlyArray<Language>): ImmutableProject<LanguageID, Language> {
    const project: MutableProject<LanguageID, Language> = MutableProject.empty<LanguageID, Language>();

    languages.forEach((l: Language) => {
      project.set(l.getID(), l);
    });

    return ImmutableProject.of<LanguageID, Language>(project);
  }

  public constructor(...languages: ReadonlyArray<Language>) {
    super(MockLanguages.toProject(languages));
  }
}
