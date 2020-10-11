import { MutableAddress, MutableProject, ReadonlyAddress, ReadonlyProject } from '@jamashita/publikum-collection';
import { Nominative } from '@jamashita/publikum-interface';
import { Kind, Nullable } from '@jamashita/publikum-type';
import { ClosureTable } from '../ClosureTable';
import { ClosureTableHierarchy } from '../ClosureTableHierarchy';

export class MockClosureTable<V extends Nominative, W extends Nominative = V> extends ClosureTable<V, W> {
  private static toProject<VT extends Nominative, WT extends Nominative = VT>(hierarchies: ReadonlyArray<ClosureTableHierarchy<VT, WT>>): ReadonlyProject<VT, ReadonlyAddress<WT>> {
    const project: MutableProject<VT, MutableAddress<WT>> = MutableProject.empty<VT, MutableAddress<WT>>();

    hierarchies.forEach((hierarchy: ClosureTableHierarchy<VT, WT>) => {
      const offsprings: Nullable<MutableAddress<WT>> = project.get(hierarchy.getAncestor());

      if (Kind.isNull(offsprings)) {
        const address: MutableAddress<WT> = MutableAddress.empty<WT>();

        address.add(hierarchy.getOffspring());
        project.set(hierarchy.getAncestor(), address);

        return;
      }

      offsprings.add(hierarchy.getOffspring());
    });

    return project;
  }

  public constructor(...hierarchies: ReadonlyArray<ClosureTableHierarchy<V, W>>) {
    super(MockClosureTable.toProject(hierarchies));
  }
}
