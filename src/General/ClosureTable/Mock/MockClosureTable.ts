import { ImmutableProject, MutableAddress, MutableProject } from '@jamashita/publikum-collection';
import { Kind, Nullable } from '@jamashita/publikum-type';
import { TreeID } from '../../Tree/Interface/TreeID';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';
import { ClosureTableOffsprings } from '../ClosureTableOffsprings';

export class MockClosureTable<K extends TreeID> extends ClosureTable<K> {
  private static toProject<KT extends TreeID>(hierarchies: ReadonlyArray<ClosureTableHierarchy<KT>>): ImmutableProject<KT, ClosureTableOffsprings<KT>> {
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

    return ImmutableProject.of<KT, ClosureTableOffsprings<KT>>(project.map<ClosureTableOffsprings<KT>>((offsprings: MutableAddress<KT>) => {
      return ClosureTableOffsprings.of<KT>(offsprings);
    }));
  }

  public constructor(...hierarchies: ReadonlyArray<ClosureTableHierarchy<K>>) {
    super(MockClosureTable.toProject(hierarchies));
  }
}
