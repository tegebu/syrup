import { ImmutableAddress, ImmutableProject, ImmutableSequence } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import {
  ClosureTableHierarchies,
  ClosureTableHierarchy,
  MockClosureTable,
  MockClosureTableHierarchy,
  StructurableTree,
  StructurableTreeNode,
  StructurableTrees
} from '@jamashita/publikum-tree';
import { Nullable } from '@jamashita/publikum-type';
import sinon, { SinonSpy } from 'sinon';
import { MockTegeExpansion } from '../Mock/MockTegeExpansion';
import { MockTegeID } from '../Mock/MockTegeID';
import { MockTegeImagePath } from '../Mock/MockTegeImagePath';
import { MockTegeMinAge } from '../Mock/MockTegeMinAge';
import { MockTegeName } from '../Mock/MockTegeName';
import { MockTegePlayers } from '../Mock/MockTegePlayers';
import { MockTegePlayingTime } from '../Mock/MockTegePlayingTime';
import { Tege } from '../Tege';
import { TegeID } from '../TegeID';
import { Teges } from '../Teges';

describe('Teges', () => {
  describe('ofTable', () => {
    it('returns structured Teges', () => {
      expect.assertions(21);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();
      const id3: MockTegeID = new MockTegeID();
      const id4: MockTegeID = new MockTegeID();
      const id5: MockTegeID = new MockTegeID();
      const id6: MockTegeID = new MockTegeID();
      const id7: MockTegeID = new MockTegeID();
      const id8: MockTegeID = new MockTegeID();

      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );
      const tege2: Tege = Tege.of(
        id2,
        new MockTegeName('mock 2'),
        new MockTegePlayingTime(11),
        new MockTegePlayers(6),
        new MockTegeMinAge(21),
        new MockTegeImagePath('/2'),
        new MockTegeExpansion()
      );
      const tege3: Tege = Tege.of(
        id3,
        new MockTegeName('mock 3'),
        new MockTegePlayingTime(12),
        new MockTegePlayers(7),
        new MockTegeMinAge(22),
        new MockTegeImagePath('/3'),
        new MockTegeExpansion()
      );
      const tege4: Tege = Tege.of(
        id4,
        new MockTegeName('mock 4'),
        new MockTegePlayingTime(13),
        new MockTegePlayers(8),
        new MockTegeMinAge(23),
        new MockTegeImagePath('/4'),
        new MockTegeExpansion()
      );
      const tege5: Tege = Tege.of(
        id5,
        new MockTegeName('mock 5'),
        new MockTegePlayingTime(14),
        new MockTegePlayers(9),
        new MockTegeMinAge(24),
        new MockTegeImagePath('/5'),
        new MockTegeExpansion()
      );
      const tege6: Tege = Tege.of(
        id6,
        new MockTegeName('mock 6'),
        new MockTegePlayingTime(15),
        new MockTegePlayers(10),
        new MockTegeMinAge(25),
        new MockTegeImagePath('/6'),
        new MockTegeExpansion()
      );
      const tege7: Tege = Tege.of(
        id7,
        new MockTegeName('mock 7'),
        new MockTegePlayingTime(16),
        new MockTegePlayers(11),
        new MockTegeMinAge(26),
        new MockTegeImagePath('/7'),
        new MockTegeExpansion()
      );
      const tege8: Tege = Tege.of(
        id8,
        new MockTegeName('mock 8'),
        new MockTegePlayingTime(17),
        new MockTegePlayers(12),
        new MockTegeMinAge(27),
        new MockTegeImagePath('/8'),
        new MockTegeExpansion()
      );

      const sequence: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1,
        tege2,
        tege3,
        tege4,
        tege5,
        tege6,
        tege7,
        tege8
      ]);
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1),
        new MockClosureTableHierarchy<TegeID>(id1, id2),
        new MockClosureTableHierarchy<TegeID>(id1, id3),
        new MockClosureTableHierarchy<TegeID>(id1, id4),
        new MockClosureTableHierarchy<TegeID>(id1, id5),
        new MockClosureTableHierarchy<TegeID>(id1, id6),
        new MockClosureTableHierarchy<TegeID>(id1, id7),
        new MockClosureTableHierarchy<TegeID>(id2, id2),
        new MockClosureTableHierarchy<TegeID>(id2, id4),
        new MockClosureTableHierarchy<TegeID>(id2, id5),
        new MockClosureTableHierarchy<TegeID>(id4, id4),
        new MockClosureTableHierarchy<TegeID>(id4, id5),
        new MockClosureTableHierarchy<TegeID>(id5, id5),
        new MockClosureTableHierarchy<TegeID>(id3, id3),
        new MockClosureTableHierarchy<TegeID>(id3, id6),
        new MockClosureTableHierarchy<TegeID>(id3, id7),
        new MockClosureTableHierarchy<TegeID>(id6, id6),
        new MockClosureTableHierarchy<TegeID>(id7, id7),
        new MockClosureTableHierarchy<TegeID>(id8, id8)
      ];
      const trees: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies),
        sequence
      );

      const teges: Teges = Teges.of(trees);

      expect(teges.size()).toBe(2);

      const root1: Nullable<StructurableTree<TegeID, Tege>> = teges.get(id1);
      const root2: Nullable<StructurableTree<TegeID, Tege>> = teges.get(id8);

      if (root1 === null) {
        fail();
        return;
      }

      expect(root1.getRoot().getValue()).toBe(tege1);
      expect(root1.size()).toBe(7);

      const children1: Array<StructurableTreeNode<TegeID, Tege>> = [...root1.getRoot().getChildren().values()];

      expect(children1).toHaveLength(2);
      expect(children1[0].isLeaf()).toBe(false);
      expect(children1[0].getValue()).toBe(tege2);
      expect(children1[1].isLeaf()).toBe(false);
      expect(children1[1].getValue()).toBe(tege3);

      const children2: Array<StructurableTreeNode<TegeID, Tege>> = [...children1[0].getChildren().values()];

      expect(children2).toHaveLength(1);
      expect(children2[0].isLeaf()).toBe(false);
      expect(children2[0].getValue()).toBe(tege4);

      const children3: Array<StructurableTreeNode<TegeID, Tege>> = [...children2[0].getChildren().values()];

      expect(children3).toHaveLength(1);
      expect(children3[0].isLeaf()).toBe(true);
      expect(children3[0].getValue()).toBe(tege5);

      const children4: Array<StructurableTreeNode<TegeID, Tege>> = [...children1[1].getChildren().values()];

      expect(children4).toHaveLength(2);
      expect(children4[0].isLeaf()).toBe(true);
      expect(children4[0].getValue()).toBe(tege6);
      expect(children4[1].isLeaf()).toBe(true);
      expect(children4[1].getValue()).toBe(tege7);

      if (root2 === null) {
        fail();
        return;
      }

      expect(root2.getRoot().isLeaf()).toBe(true);
      expect(root2.getRoot().getValue()).toBe(tege8);
    });
  });

  describe('ofProject', () => {
    it('returns structured Teges', () => {
      expect.assertions(13);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();
      const id3: MockTegeID = new MockTegeID();
      const id4: MockTegeID = new MockTegeID();
      const id5: MockTegeID = new MockTegeID();

      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );
      const tege2: Tege = Tege.of(
        id2,
        new MockTegeName('mock 2'),
        new MockTegePlayingTime(11),
        new MockTegePlayers(6),
        new MockTegeMinAge(21),
        new MockTegeImagePath('/2'),
        new MockTegeExpansion()
      );
      const tege3: Tege = Tege.of(
        id3,
        new MockTegeName('mock 3'),
        new MockTegePlayingTime(12),
        new MockTegePlayers(7),
        new MockTegeMinAge(22),
        new MockTegeImagePath('/3'),
        new MockTegeExpansion()
      );
      const tege4: Tege = Tege.of(
        id4,
        new MockTegeName('mock 4'),
        new MockTegePlayingTime(13),
        new MockTegePlayers(8),
        new MockTegeMinAge(23),
        new MockTegeImagePath('/4'),
        new MockTegeExpansion()
      );
      const tege5: Tege = Tege.of(
        id5,
        new MockTegeName('mock 5'),
        new MockTegePlayingTime(14),
        new MockTegePlayers(9),
        new MockTegeMinAge(24),
        new MockTegeImagePath('/5'),
        new MockTegeExpansion()
      );

      const tree1: StructurableTree<TegeID, Tege> = StructurableTree.of<TegeID, Tege>(
        StructurableTreeNode.ofValue<TegeID, Tege>(
          tege1,
          ImmutableAddress.ofSet<StructurableTreeNode<TegeID, Tege>>(
            new Set<StructurableTreeNode<TegeID, Tege>>([
              StructurableTreeNode.ofValue<TegeID, Tege>(
                tege2,
                ImmutableAddress.ofSet<StructurableTreeNode<TegeID, Tege>>(
                  new Set<StructurableTreeNode<TegeID, Tege>>([
                    StructurableTreeNode.ofValue<TegeID, Tege>(
                      tege3
                    )
                  ])
                )
              )
            ])
          )
        )
      );
      const tree2: StructurableTree<TegeID, Tege> = StructurableTree.of<TegeID, Tege>(
        StructurableTreeNode.ofValue<TegeID, Tege>(tege4)
      );
      const tree3: StructurableTree<TegeID, Tege> = StructurableTree.of<TegeID, Tege>(
        StructurableTreeNode.ofValue<TegeID, Tege>(tege5)
      );
      const project: ImmutableProject<TegeID, StructurableTree<TegeID, Tege>> = ImmutableProject.ofMap<TegeID, StructurableTree<TegeID, Tege>>(
        new Map<TegeID, StructurableTree<TegeID, Tege>>([
          [tree1.getTreeID(), tree1],
          [tree2.getTreeID(), tree2],
          [tree3.getTreeID(), tree3]
        ])
      );

      const teges: Teges = Teges.ofProject(project);

      expect(teges.size()).toBe(3);

      const root1: Nullable<StructurableTree<TegeID, Tege>> = teges.get(id1);
      const root2: Nullable<StructurableTree<TegeID, Tege>> = teges.get(id4);
      const root3: Nullable<StructurableTree<TegeID, Tege>> = teges.get(id5);

      if (root1 === null) {
        fail();
        return;
      }

      expect(root1.getRoot().getValue()).toBe(tege1);
      expect(root1.size()).toBe(3);

      const children1: Array<StructurableTreeNode<TegeID, Tege>> = [...root1.getRoot().getChildren().values()];

      expect(children1).toHaveLength(1);
      expect(children1[0].isLeaf()).toBe(false);
      expect(children1[0].getValue()).toBe(tege2);

      const children2: Array<StructurableTreeNode<TegeID, Tege>> = [...children1[0].getChildren().values()];

      expect(children2).toHaveLength(1);
      expect(children2[0].isLeaf()).toBe(true);
      expect(children2[0].getValue()).toBe(tege3);

      if (root2 === null) {
        fail();
        return;
      }

      expect(root2.getRoot().isLeaf()).toBe(true);
      expect(root2.getRoot().getValue()).toBe(tege4);

      if (root3 === null) {
        fail();
        return;
      }

      expect(root3.getRoot().getValue()).toBe(tege5);
      expect(root3.getRoot().isLeaf()).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );

      const sequence: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1
      ]);
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ];
      const trees: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies),
        sequence
      );

      const teges: Teges = Teges.of(trees);

      expect(teges.equals(teges)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );

      const sequence: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1
      ]);
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ];
      const trees: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies),
        sequence
      );

      const teges: Teges = Teges.of(trees);

      expect(teges.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('delegates its inner tree object', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );

      const sequence1: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1
      ]);
      const hierarchies1: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ];
      const trees1: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies1),
        sequence1
      );

      const spy: SinonSpy = sinon.spy();
      trees1.equals = spy;

      const teges1: Teges = Teges.of(trees1);

      const id2: MockTegeID = new MockTegeID();
      const tege2: Tege = Tege.of(
        id2,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/2'),
        new MockTegeExpansion()
      );

      const sequence2: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege2
      ]);
      const hierarchies2: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id2, id2)
      ];
      const trees2: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies2),
        sequence2
      );

      const teges2: Teges = Teges.of(trees2);

      teges1.equals(teges2);

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner tree object', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );

      const sequence: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1
      ]);
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ];
      const trees: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies),
        sequence
      );

      const spy: SinonSpy = sinon.spy();
      trees.toString = spy;

      const teges: Teges = Teges.of(trees);

      teges.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('has', () => {
    it('delegates its inner tree object', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );

      const sequence: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1
      ]);
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ];
      const trees: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies),
        sequence
      );

      const spy: SinonSpy = sinon.spy();
      trees.has = spy;

      const teges: Teges = Teges.of(trees);

      teges.has(new MockTegeID());

      expect(spy.called).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns ReadonlyArray<TegeJSON>', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();
      const id3: MockTegeID = new MockTegeID();
      const id4: MockTegeID = new MockTegeID();
      const id5: MockTegeID = new MockTegeID();
      const id6: MockTegeID = new MockTegeID();
      const id7: MockTegeID = new MockTegeID();
      const id8: MockTegeID = new MockTegeID();

      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );
      const tege2: Tege = Tege.of(
        id2,
        new MockTegeName('mock 2'),
        new MockTegePlayingTime(11),
        new MockTegePlayers(6),
        new MockTegeMinAge(21),
        new MockTegeImagePath('/2'),
        new MockTegeExpansion()
      );
      const tege3: Tege = Tege.of(
        id3,
        new MockTegeName('mock 3'),
        new MockTegePlayingTime(12),
        new MockTegePlayers(7),
        new MockTegeMinAge(22),
        new MockTegeImagePath('/3'),
        new MockTegeExpansion()
      );
      const tege4: Tege = Tege.of(
        id4,
        new MockTegeName('mock 4'),
        new MockTegePlayingTime(13),
        new MockTegePlayers(8),
        new MockTegeMinAge(23),
        new MockTegeImagePath('/4'),
        new MockTegeExpansion()
      );
      const tege5: Tege = Tege.of(
        id5,
        new MockTegeName('mock 5'),
        new MockTegePlayingTime(14),
        new MockTegePlayers(9),
        new MockTegeMinAge(24),
        new MockTegeImagePath('/5'),
        new MockTegeExpansion()
      );
      const tege6: Tege = Tege.of(
        id6,
        new MockTegeName('mock 6'),
        new MockTegePlayingTime(15),
        new MockTegePlayers(10),
        new MockTegeMinAge(25),
        new MockTegeImagePath('/6'),
        new MockTegeExpansion()
      );
      const tege7: Tege = Tege.of(
        id7,
        new MockTegeName('mock 7'),
        new MockTegePlayingTime(16),
        new MockTegePlayers(11),
        new MockTegeMinAge(26),
        new MockTegeImagePath('/7'),
        new MockTegeExpansion()
      );
      const tege8: Tege = Tege.of(
        id8,
        new MockTegeName('mock 8'),
        new MockTegePlayingTime(17),
        new MockTegePlayers(12),
        new MockTegeMinAge(27),
        new MockTegeImagePath('/8'),
        new MockTegeExpansion()
      );

      const sequence: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1,
        tege2,
        tege3,
        tege4,
        tege5,
        tege6,
        tege7,
        tege8
      ]);
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1),
        new MockClosureTableHierarchy<TegeID>(id1, id2),
        new MockClosureTableHierarchy<TegeID>(id1, id3),
        new MockClosureTableHierarchy<TegeID>(id1, id4),
        new MockClosureTableHierarchy<TegeID>(id1, id5),
        new MockClosureTableHierarchy<TegeID>(id1, id6),
        new MockClosureTableHierarchy<TegeID>(id1, id7),
        new MockClosureTableHierarchy<TegeID>(id2, id2),
        new MockClosureTableHierarchy<TegeID>(id2, id4),
        new MockClosureTableHierarchy<TegeID>(id2, id5),
        new MockClosureTableHierarchy<TegeID>(id4, id4),
        new MockClosureTableHierarchy<TegeID>(id4, id5),
        new MockClosureTableHierarchy<TegeID>(id5, id5),
        new MockClosureTableHierarchy<TegeID>(id3, id3),
        new MockClosureTableHierarchy<TegeID>(id3, id6),
        new MockClosureTableHierarchy<TegeID>(id3, id7),
        new MockClosureTableHierarchy<TegeID>(id6, id6),
        new MockClosureTableHierarchy<TegeID>(id7, id7),
        new MockClosureTableHierarchy<TegeID>(id8, id8)
      ];
      const trees: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...hierarchies),
        sequence
      );

      const teges: Teges = Teges.of(trees);

      expect(teges.toJSON()).toStrictEqual([
        tege8.toJSON(),
        tege1.toJSON(),
        tege2.toJSON(),
        tege4.toJSON(),
        tege5.toJSON(),
        tege3.toJSON(),
        tege6.toJSON(),
        tege7.toJSON()
      ]);
    });
  });

  describe('toHierarchies', () => {
    it('returns all tree constructing nodes relations', () => {
      expect.assertions(39);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();
      const id3: MockTegeID = new MockTegeID();
      const id4: MockTegeID = new MockTegeID();
      const id5: MockTegeID = new MockTegeID();
      const id6: MockTegeID = new MockTegeID();
      const id7: MockTegeID = new MockTegeID();
      const id8: MockTegeID = new MockTegeID();

      const tege1: Tege = Tege.of(
        id1,
        new MockTegeName('mock 1'),
        new MockTegePlayingTime(10),
        new MockTegePlayers(5),
        new MockTegeMinAge(20),
        new MockTegeImagePath('/1'),
        new MockTegeExpansion()
      );
      const tege2: Tege = Tege.of(
        id2,
        new MockTegeName('mock 2'),
        new MockTegePlayingTime(11),
        new MockTegePlayers(6),
        new MockTegeMinAge(21),
        new MockTegeImagePath('/2'),
        new MockTegeExpansion()
      );
      const tege3: Tege = Tege.of(
        id3,
        new MockTegeName('mock 3'),
        new MockTegePlayingTime(12),
        new MockTegePlayers(7),
        new MockTegeMinAge(22),
        new MockTegeImagePath('/3'),
        new MockTegeExpansion()
      );
      const tege4: Tege = Tege.of(
        id4,
        new MockTegeName('mock 4'),
        new MockTegePlayingTime(13),
        new MockTegePlayers(8),
        new MockTegeMinAge(23),
        new MockTegeImagePath('/4'),
        new MockTegeExpansion()
      );
      const tege5: Tege = Tege.of(
        id5,
        new MockTegeName('mock 5'),
        new MockTegePlayingTime(14),
        new MockTegePlayers(9),
        new MockTegeMinAge(24),
        new MockTegeImagePath('/5'),
        new MockTegeExpansion()
      );
      const tege6: Tege = Tege.of(
        id6,
        new MockTegeName('mock 6'),
        new MockTegePlayingTime(15),
        new MockTegePlayers(10),
        new MockTegeMinAge(25),
        new MockTegeImagePath('/6'),
        new MockTegeExpansion()
      );
      const tege7: Tege = Tege.of(
        id7,
        new MockTegeName('mock 7'),
        new MockTegePlayingTime(16),
        new MockTegePlayers(11),
        new MockTegeMinAge(26),
        new MockTegeImagePath('/7'),
        new MockTegeExpansion()
      );
      const tege8: Tege = Tege.of(
        id8,
        new MockTegeName('mock 8'),
        new MockTegePlayingTime(17),
        new MockTegePlayers(12),
        new MockTegeMinAge(27),
        new MockTegeImagePath('/8'),
        new MockTegeExpansion()
      );

      const sequence: ImmutableSequence<Tege> = ImmutableSequence.ofArray<Tege>([
        tege1,
        tege2,
        tege3,
        tege4,
        tege5,
        tege6,
        tege7,
        tege8
      ]);
      const array: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1),
        new MockClosureTableHierarchy<TegeID>(id1, id2),
        new MockClosureTableHierarchy<TegeID>(id1, id3),
        new MockClosureTableHierarchy<TegeID>(id1, id4),
        new MockClosureTableHierarchy<TegeID>(id1, id5),
        new MockClosureTableHierarchy<TegeID>(id1, id6),
        new MockClosureTableHierarchy<TegeID>(id1, id7),
        new MockClosureTableHierarchy<TegeID>(id2, id2),
        new MockClosureTableHierarchy<TegeID>(id2, id4),
        new MockClosureTableHierarchy<TegeID>(id2, id5),
        new MockClosureTableHierarchy<TegeID>(id4, id4),
        new MockClosureTableHierarchy<TegeID>(id4, id5),
        new MockClosureTableHierarchy<TegeID>(id5, id5),
        new MockClosureTableHierarchy<TegeID>(id3, id3),
        new MockClosureTableHierarchy<TegeID>(id3, id6),
        new MockClosureTableHierarchy<TegeID>(id3, id7),
        new MockClosureTableHierarchy<TegeID>(id6, id6),
        new MockClosureTableHierarchy<TegeID>(id7, id7),
        new MockClosureTableHierarchy<TegeID>(id8, id8)
      ];
      const trees: StructurableTrees<TegeID, Tege> = StructurableTrees.ofTable<TegeID, Tege>(
        new MockClosureTable<TegeID>(...array),
        sequence
      );

      const teges: Teges = Teges.of(trees);

      const hierarchies: ClosureTableHierarchies<TegeID> = teges.toHierarchies();

      expect(hierarchies.size()).toBe(array.length);

      expect(hierarchies.get(0)?.getAncestor()).toBe(id8);
      expect(hierarchies.get(0)?.getOffspring()).toBe(id8);
      expect(hierarchies.get(1)?.getAncestor()).toBe(id1);
      expect(hierarchies.get(1)?.getOffspring()).toBe(id1);
      expect(hierarchies.get(2)?.getAncestor()).toBe(id1);
      expect(hierarchies.get(2)?.getOffspring()).toBe(id2);
      expect(hierarchies.get(3)?.getAncestor()).toBe(id1);
      expect(hierarchies.get(3)?.getOffspring()).toBe(id4);
      expect(hierarchies.get(4)?.getAncestor()).toBe(id1);
      expect(hierarchies.get(4)?.getOffspring()).toBe(id5);
      expect(hierarchies.get(5)?.getAncestor()).toBe(id1);
      expect(hierarchies.get(5)?.getOffspring()).toBe(id3);
      expect(hierarchies.get(6)?.getAncestor()).toBe(id1);
      expect(hierarchies.get(6)?.getOffspring()).toBe(id6);
      expect(hierarchies.get(7)?.getAncestor()).toBe(id1);
      expect(hierarchies.get(7)?.getOffspring()).toBe(id7);
      expect(hierarchies.get(8)?.getAncestor()).toBe(id2);
      expect(hierarchies.get(8)?.getOffspring()).toBe(id2);
      expect(hierarchies.get(9)?.getAncestor()).toBe(id2);
      expect(hierarchies.get(9)?.getOffspring()).toBe(id4);
      expect(hierarchies.get(10)?.getAncestor()).toBe(id2);
      expect(hierarchies.get(10)?.getOffspring()).toBe(id5);
      expect(hierarchies.get(11)?.getAncestor()).toBe(id4);
      expect(hierarchies.get(11)?.getOffspring()).toBe(id4);
      expect(hierarchies.get(12)?.getAncestor()).toBe(id4);
      expect(hierarchies.get(12)?.getOffspring()).toBe(id5);
      expect(hierarchies.get(13)?.getAncestor()).toBe(id5);
      expect(hierarchies.get(13)?.getOffspring()).toBe(id5);
      expect(hierarchies.get(14)?.getAncestor()).toBe(id3);
      expect(hierarchies.get(14)?.getOffspring()).toBe(id3);
      expect(hierarchies.get(15)?.getAncestor()).toBe(id3);
      expect(hierarchies.get(15)?.getOffspring()).toBe(id6);
      expect(hierarchies.get(16)?.getAncestor()).toBe(id3);
      expect(hierarchies.get(16)?.getOffspring()).toBe(id7);
      expect(hierarchies.get(17)?.getAncestor()).toBe(id6);
      expect(hierarchies.get(17)?.getOffspring()).toBe(id6);
      expect(hierarchies.get(18)?.getAncestor()).toBe(id7);
      expect(hierarchies.get(18)?.getOffspring()).toBe(id7);
    });
  });
});
