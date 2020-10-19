import { ImmutableProject, MockProject, Project } from '@jamashita/publikum-collection';
import { MockValueObject } from '@jamashita/publikum-object';
import sinon, { SinonSpy } from 'sinon';
import { MockTege } from '../Mock/MockTege';
import { MockTegeID } from '../Mock/MockTegeID';
import { Tege } from '../Tege';
import { TegeExpansion } from '../TegeExpansion';
import { TegeID } from '../TegeID';
import { TegeImagePath } from '../TegeImagePath';
import { TegeMinAge } from '../TegeMinAge';
import { TegeName } from '../TegeName';
import { TegePlayers } from '../TegePlayers';
import { TegePlayingTime } from '../TegePlayingTime';
import { Teges } from '../Teges';
import { TegeSeries } from '../TegeSeries';

describe('Teges', () => {
  describe('empty', () => {
    it('returns singleton instance', () => {
      expect.assertions(1);

      expect(Teges.empty()).toBe(Teges.empty());
    });

    it('\'s size is 0', () => {
      expect.assertions(1);

      expect(Teges.empty().size()).toBe(0);
    });
  });

  describe('ofMap', () => {
    it('returns singleton if 0 size map given', () => {
      expect.assertions(1);

      expect(Teges.ofMap(new Map<TegeID, Tege>())).toBe(Teges.empty());
    });
  });

  describe('validate', () => {
    it('returns true', () => {
      expect.assertions(1);

      const n: unknown = [
        {
          id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
          name: 'te1',
          playingTime: 20,
          players: {
            type: 'unique',
            value: 30
          },
          minAge: 8,
          imagePath: '/p1',
          expansion: true,
          series: [
            'aa620de8-833a-422b-a484-31001bfc5714'
          ]
        },
        {
          id: '9fc75748-af19-412e-97d2-af40ff8983ef',
          name: 'te2',
          playingTime: 40,
          players: {
            type: 'range',
            min: 40,
            max: 60
          },
          minAge: 9,
          imagePath: '/p2',
          expansion: false,
          series: [
            '9fefbd2b-66c0-4e54-bfec-d401edffbcd5'
          ]
        }
      ];

      expect(Teges.validate(n)).toBe(true);
    });

    it('returns false when non-object given', () => {
      expect.assertions(1);

      expect(Teges.validate('toi')).toBe(false);
    });

    it('returns false when non-array given', () => {
      expect.assertions(1);

      expect(Teges.validate({})).toBe(false);
    });
  });

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.contains = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.contains(new MockTege());

      expect(spy.called).toBe(true);
    });
  });

  describe('equals', () => {
    it('returns true when the same instance given', () => {
      expect.assertions(1);

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);
      const series: TegeSeries = TegeSeries.empty();
      const tege1: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );
      const tege2: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      const teges: Teges = Teges.ofMap(new Map<TegeID, Tege>([[tege1.getID(), tege1], [tege2.getID(), tege2]]));

      expect(teges.equals(teges)).toBe(true);
    });

    it('return false when the different class instance given', () => {
      expect.assertions(1);

      const id: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const name: TegeName = TegeName.of('te');
      const time: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const players: TegePlayers = TegePlayers.ofUnique(30);
      const minAge: TegeMinAge = TegeMinAge.ofNumber(8);
      const imagePath: TegeImagePath = TegeImagePath.of('/');
      const expansion: TegeExpansion = TegeExpansion.of(false);
      const series: TegeSeries = TegeSeries.empty();
      const tege: Tege = Tege.of(
        id,
        name,
        time,
        players,
        minAge,
        imagePath,
        expansion,
        series
      );

      const teges: Teges = Teges.ofMap(new Map<TegeID, Tege>([[tege.getID(), tege]]));

      expect(teges.equals(new MockValueObject('mock'))).toBe(false);
    });

    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.equals = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.equals(Teges.of(ImmutableProject.ofMap<TegeID, Tege>(new Map<TegeID, Tege>([
        [new MockTegeID(), new MockTege()]
      ]))));

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.every = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.every(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('forEach', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.forEach = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.forEach(() => {
        // NOOP
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('get', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.get = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.get(new MockTegeID());

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.isEmpty = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.toString = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.size = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.some = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.some(() => {
        return true;
      });

      expect(spy.called).toBe(true);
    });
  });

  describe('values', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.values = spy;

      const teges: Teges = Teges.empty();
      // @ts-expect-error
      teges.teges = project;

      teges.values();

      expect(spy.called).toBe(true);
    });
  });


  describe('iterator', () => {
    it('returns Pair<TegeID, Tege>', () => {
      expect.assertions(6);

      const array: Array<[MockTegeID, MockTege]> = [
        [new MockTegeID(), new MockTege()],
        [new MockTegeID(), new MockTege()],
        [new MockTegeID(), new MockTege()]
      ];

      const teges: Teges = Teges.ofMap(new Map<MockTegeID, MockTege>(array));
      let i: number = 0;

      for (const pair of teges) {
        expect(pair.getKey()).toBe(array[i][0]);
        expect(pair.getValue()).toBe(array[i][1]);
        i++;
      }
    });
  });

  describe('toJSON', () => {
    it('returns Array<TegeJSON>', () => {
      expect.assertions(1);

      const id1: TegeID = TegeID.ofString('5e799ca4-0f26-4760-ab26-83a59624fc82');
      const id2: TegeID = TegeID.ofString('0d683348-0e24-4a47-ae23-aad7ec3a491e');
      const name1: TegeName = TegeName.of('te1');
      const name2: TegeName = TegeName.of('te2');
      const time1: TegePlayingTime = TegePlayingTime.ofNumber(20);
      const time2: TegePlayingTime = TegePlayingTime.ofNumber(40);
      const players1: TegePlayers = TegePlayers.ofUnique(30);
      const players2: TegePlayers = TegePlayers.ofRange(50, 80);
      const minAge1: TegeMinAge = TegeMinAge.ofNumber(8);
      const minAge2: TegeMinAge = TegeMinAge.ofNumber(16);
      const imagePath1: TegeImagePath = TegeImagePath.of('/p1');
      const imagePath2: TegeImagePath = TegeImagePath.of('/p2');
      const expansion1: TegeExpansion = TegeExpansion.of(false);
      const expansion2: TegeExpansion = TegeExpansion.of(true);
      const series1: TegeSeries = TegeSeries.empty();
      const series2: TegeSeries = TegeSeries.empty();
      const tege1: Tege = Tege.of(
        id1,
        name1,
        time1,
        players1,
        minAge1,
        imagePath1,
        expansion1,
        series1
      );
      const tege2: Tege = Tege.of(
        id2,
        name2,
        time2,
        players2,
        minAge2,
        imagePath2,
        expansion2,
        series2
      );

      const teges: Teges = Teges.ofMap(new Map<TegeID, Tege>([[tege1.getID(), tege1], [tege2.getID(), tege2]]));

      expect(teges.toJSON()).toStrictEqual([
        {
          id: '5e799ca4-0f26-4760-ab26-83a59624fc82',
          name: 'te1',
          playingTime: 20,
          players: {
            type: 'unique',
            value: 30
          },
          minAge: 8,
          imagePath: '/p1',
          expansion: false,
          series: []
        },
        {
          id: '0d683348-0e24-4a47-ae23-aad7ec3a491e',
          name: 'te2',
          playingTime: 40,
          players: {
            type: 'range',
            min: 50,
            max: 80
          },
          minAge: 16,
          imagePath: '/p2',
          expansion: true,
          series: []
        }
      ]);
    });
  });
});
