import { MutableAddress, MutableProject, ReadonlyProject } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { Kind, Nullable } from '@jamashita/publikum-type';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';
import { ClosureTableOffsprings } from '../ClosureTableOffsprings';

export class MockClosureTable<K extends Nominative> extends ClosureTable<K> {
  private static toProject<KT extends Nominative>(hierarchies: ReadonlyArray<ClosureTableHierarchy<KT>>): ReadonlyProject<KT, ClosureTableOffsprings<KT>> {
    const project: MutableProject<KT, MutableAddress<KT>> = MutableProject.empty<KT, MutableAddress<KT>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<KT>) => {
      const offsprings: Nullable<MutableAddress<KT>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<KT> = MutableAddress.empty<KT>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return project.map((offsprings: MutableAddress<KT>) => {
      return ClosureTableOffsprings.of<KT>(offsprings);
    });
  }

  public constructor(...hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>) {
    super(MockClosureTable.toProject(hierarchies));
  }
}
