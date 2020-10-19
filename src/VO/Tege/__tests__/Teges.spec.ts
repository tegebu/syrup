import { ImmutableAddress, ImmutableProject } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy } from 'sinon';
import { ClosureTable } from '../../../General/ClosureTable/ClosureTable';
import { ClosureTableHierarchy } from '../../../General/ClosureTable/ClosureTableHierarchy';
import { MockClosureTableHierarchy } from '../../../General/ClosureTable/Mock/MockClosureTableHierarchy';
import { StructurableTree } from '../../../General/Tree/StructurableTree';
import { StructurableTreeNode } from '../../../General/Tree/TreeNode/StructurableTreeNode';
import { TegeError } from '../Error/TegeError';
import { MockTege } from '../Mock/MockTege';
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
  describe('of', () => {
    it('throws TegeError when teges are empty', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();

      const teges: ImmutableProject<TegeID, Tege> = ImmutableProject.empty<TegeID, Tege>();
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id1, id1),
        new MockClosureTableHierarchy<TegeID>(id1, id2),
        new MockClosureTableHierarchy<TegeID>(id2, id2)
      ];

      expect(() => {
        Teges.of(teges, hierarchies);
      }).toThrow(TegeError);
    });

    it('throws TegeError when hierarchies are empty', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();

      const teges: ImmutableProject<TegeID, Tege> = ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ]
        ])
      );
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [];

      expect(() => {
        Teges.of(teges, hierarchies);
      }).toThrow(TegeError);
    });

    it('throws TegeError when no tree is going to be built', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();

      const teges: ImmutableProject<TegeID, Tege> = ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ]
        ])
      );
      const hierarchies: Array<ClosureTableHierarchy<TegeID>> = [
        new MockClosureTableHierarchy<TegeID>(id2, id2)
      ];

      expect(() => {
        Teges.of(teges, hierarchies);
      }).toThrow(TegeError);
    });

    it('returns structured tree', () => {
      expect.assertions(10);

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

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [id1, tege1],
          [id2, tege2],
          [id3, tege3],
          [id4, tege4],
          [id5, tege5]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1),
        new MockClosureTableHierarchy<TegeID>(id1, id2),
        new MockClosureTableHierarchy<TegeID>(id1, id3),
        new MockClosureTableHierarchy<TegeID>(id1, id4),
        new MockClosureTableHierarchy<TegeID>(id1, id5),
        new MockClosureTableHierarchy<TegeID>(id2, id2),
        new MockClosureTableHierarchy<TegeID>(id2, id3),
        new MockClosureTableHierarchy<TegeID>(id2, id4),
        new MockClosureTableHierarchy<TegeID>(id3, id3),
        new MockClosureTableHierarchy<TegeID>(id4, id4),
        new MockClosureTableHierarchy<TegeID>(id5, id5)
      ]);

      expect(teges.getTree().getRoot().getValue()).toBe(tege1);

      const children1: Array<StructurableTreeNode<TegeID, Tege>> = [...teges.getTree().getRoot().getChildren().values()];

      expect(children1).toHaveLength(2);
      expect(children1[0].getValue()).toBe(tege2);

      const children2: Array<StructurableTreeNode<TegeID, Tege>> = [...children1[0].getChildren().values()];

      expect(children2).toHaveLength(2);
      expect(children2[0].getValue()).toBe(tege3);
      expect(children2[0].isLeaf()).toBe(true);
      expect(children2[1].getValue()).toBe(tege4);
      expect(children2[1].isLeaf()).toBe(true);

      expect(children1[1].getValue()).toBe(tege5);
      expect(children1[1].isLeaf()).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ]);

      expect(teges.equals(teges)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ]);

      expect(teges.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('delegates its inner tree object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const tree: StructurableTree<TegeID, Tege> = StructurableTree.of<TegeID, Tege>(
        StructurableTreeNode.of<TegeID, Tege>(
          new MockTege(),
          ImmutableAddress.empty<StructurableTreeNode<TegeID, Tege>>()
        )
      );

      tree.equals = spy;

      const id1: MockTegeID = new MockTegeID();

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ]);
      // @ts-expect-error
      teges.teges = tree;

      const id2: MockTegeID = new MockTegeID();

      teges.equals(Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id2,
            Tege.of(
              id2,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/2'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id2, id2)
      ]));

      expect(spy.called).toBe(true);
    });
  });

  describe('getTree', () => {
    it('delegates inner tree object', () => {
      expect.assertions(1);

      const tree: StructurableTree<TegeID, Tege> = StructurableTree.of<TegeID, Tege>(
        StructurableTreeNode.of<TegeID, Tege>(
          new MockTege(),
          ImmutableAddress.empty<StructurableTreeNode<TegeID, Tege>>()
        )
      );

      const id1: MockTegeID = new MockTegeID();

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ]);
      // @ts-expect-error
      teges.teges = tree;

      expect(teges.getTree()).toBe(tree);
    });
  });

  describe('toString', () => {
    it('delegates its inner tree object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const tree: StructurableTree<TegeID, Tege> = StructurableTree.of<TegeID, Tege>(
        StructurableTreeNode.of<TegeID, Tege>(
          new MockTege(),
          ImmutableAddress.empty<StructurableTreeNode<TegeID, Tege>>()
        )
      );

      tree.toString = spy;

      const id1: MockTegeID = new MockTegeID();

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1)
      ]);
      // @ts-expect-error
      teges.teges = tree;

      teges.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('toJSON', () => {
    it('returns Array<TegeJSON>', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();
      const id3: MockTegeID = new MockTegeID();
      const id4: MockTegeID = new MockTegeID();
      const id5: MockTegeID = new MockTegeID();

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ],
          [
            id2,
            Tege.of(
              id2,
              new MockTegeName('mock 2'),
              new MockTegePlayingTime(11),
              new MockTegePlayers(6),
              new MockTegeMinAge(21),
              new MockTegeImagePath('/2'),
              new MockTegeExpansion()
            )
          ],
          [
            id3,
            Tege.of(
              id3,
              new MockTegeName('mock 3'),
              new MockTegePlayingTime(12),
              new MockTegePlayers(7),
              new MockTegeMinAge(22),
              new MockTegeImagePath('/3'),
              new MockTegeExpansion()
            )
          ],
          [
            id4,
            Tege.of(
              id4,
              new MockTegeName('mock 4'),
              new MockTegePlayingTime(13),
              new MockTegePlayers(8),
              new MockTegeMinAge(23),
              new MockTegeImagePath('/4'),
              new MockTegeExpansion()
            )
          ],
          [
            id5,
            Tege.of(
              id5,
              new MockTegeName('mock 5'),
              new MockTegePlayingTime(14),
              new MockTegePlayers(9),
              new MockTegeMinAge(24),
              new MockTegeImagePath('/5'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1),
        new MockClosureTableHierarchy<TegeID>(id1, id2),
        new MockClosureTableHierarchy<TegeID>(id1, id3),
        new MockClosureTableHierarchy<TegeID>(id1, id4),
        new MockClosureTableHierarchy<TegeID>(id1, id5),
        new MockClosureTableHierarchy<TegeID>(id2, id2),
        new MockClosureTableHierarchy<TegeID>(id2, id3),
        new MockClosureTableHierarchy<TegeID>(id2, id4),
        new MockClosureTableHierarchy<TegeID>(id3, id3),
        new MockClosureTableHierarchy<TegeID>(id4, id4),
        new MockClosureTableHierarchy<TegeID>(id5, id5)
      ]);

      expect(teges.toJSON()).toStrictEqual([
        {
          id: id1.toString(),
          name: 'mock 1',
          playingTime: 10,
          players: {
            type: 'unique',
            value: 5
          },
          minAge: 20,
          imagePath: '/1',
          expansion: false
        },
        {
          id: id2.toString(),
          name: 'mock 2',
          playingTime: 11,
          players: {
            type: 'unique',
            value: 6
          },
          minAge: 21,
          imagePath: '/2',
          expansion: false
        },
        {
          id: id3.toString(),
          name: 'mock 3',
          playingTime: 12,
          players: {
            type: 'unique',
            value: 7
          },
          minAge: 22,
          imagePath: '/3',
          expansion: false
        },
        {
          id: id4.toString(),
          name: 'mock 4',
          playingTime: 13,
          players: {
            type: 'unique',
            value: 8
          },
          minAge: 23,
          imagePath: '/4',
          expansion: false
        },
        {
          id: id5.toString(),
          name: 'mock 5',
          playingTime: 14,
          players: {
            type: 'unique',
            value: 9
          },
          minAge: 24,
          imagePath: '/5',
          expansion: false
        }
      ]);
    });
  });

  describe('toHierarchies', () => {
    it('delegates ClosureTable.toHierarchies()', () => {
      expect.assertions(1);

      const id1: MockTegeID = new MockTegeID();
      const id2: MockTegeID = new MockTegeID();
      const id3: MockTegeID = new MockTegeID();
      const id4: MockTegeID = new MockTegeID();
      const id5: MockTegeID = new MockTegeID();

      const teges: Teges = Teges.of(ImmutableProject.ofMap<TegeID, Tege>(
        new Map<TegeID, Tege>([
          [
            id1,
            Tege.of(
              id1,
              new MockTegeName('mock 1'),
              new MockTegePlayingTime(10),
              new MockTegePlayers(5),
              new MockTegeMinAge(20),
              new MockTegeImagePath('/1'),
              new MockTegeExpansion()
            )
          ],
          [
            id2,
            Tege.of(
              id2,
              new MockTegeName('mock 2'),
              new MockTegePlayingTime(11),
              new MockTegePlayers(6),
              new MockTegeMinAge(21),
              new MockTegeImagePath('/2'),
              new MockTegeExpansion()
            )
          ],
          [
            id3,
            Tege.of(
              id3,
              new MockTegeName('mock 3'),
              new MockTegePlayingTime(12),
              new MockTegePlayers(7),
              new MockTegeMinAge(22),
              new MockTegeImagePath('/3'),
              new MockTegeExpansion()
            )
          ],
          [
            id4,
            Tege.of(
              id4,
              new MockTegeName('mock 4'),
              new MockTegePlayingTime(13),
              new MockTegePlayers(8),
              new MockTegeMinAge(23),
              new MockTegeImagePath('/4'),
              new MockTegeExpansion()
            )
          ],
          [
            id5,
            Tege.of(
              id5,
              new MockTegeName('mock 5'),
              new MockTegePlayingTime(14),
              new MockTegePlayers(9),
              new MockTegeMinAge(24),
              new MockTegeImagePath('/5'),
              new MockTegeExpansion()
            )
          ]
        ])
      ), [
        new MockClosureTableHierarchy<TegeID>(id1, id1),
        new MockClosureTableHierarchy<TegeID>(id1, id2),
        new MockClosureTableHierarchy<TegeID>(id1, id3),
        new MockClosureTableHierarchy<TegeID>(id1, id4),
        new MockClosureTableHierarchy<TegeID>(id1, id5),
        new MockClosureTableHierarchy<TegeID>(id2, id2),
        new MockClosureTableHierarchy<TegeID>(id2, id3),
        new MockClosureTableHierarchy<TegeID>(id2, id4),
        new MockClosureTableHierarchy<TegeID>(id3, id3),
        new MockClosureTableHierarchy<TegeID>(id4, id4),
        new MockClosureTableHierarchy<TegeID>(id5, id5)
      ]);

      const spy: SinonSpy = sinon.spy();
      ClosureTable.toHierarchies = spy;

      teges.toHierarchies();

      expect(spy.called).toBe(true);
    });
  });
});
