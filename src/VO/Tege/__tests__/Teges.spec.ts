import { MockProject, Project } from '@jamashita/publikum-collection';
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
    it('returns singleton', () => {
      expect.assertions(1);

      expect(Teges.empty()).toBe(Teges.empty());
    });
  });

  describe('ofMap', () => {
    it('returns singleton if 0 size map given', () => {
      expect.assertions(1);

      expect(Teges.ofMap(new Map<TegeID, Tege>())).toBe(Teges.empty());
    });
  });

  describe('contains', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.contains = spy;

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.contains(new MockTege());

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

      project.contains = spy;

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.contains(new MockTege());

      expect(spy.called).toBe(true);
    });
  });

  describe('every', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.every = spy;

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.every(() => {
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

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.forEach(() => {
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

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.get(new MockTegeID());

      expect(spy.called).toBe(true);
    });
  });

  describe('isEmpty', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.isEmpty = spy;

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.isEmpty();

      expect(spy.called).toBe(true);
    });
  });

  describe('toString', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.toString = spy;

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.toString();

      expect(spy.called).toBe(true);
    });
  });

  describe('size', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.size = spy;

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.size();

      expect(spy.called).toBe(true);
    });
  });

  describe('some', () => {
    it('delegates its inner collection object', () => {
      expect.assertions(1);

      const spy: SinonSpy = sinon.spy();
      const project: Project<TegeID, Tege> = new MockProject<TegeID, Tege>(new Map<TegeID, Tege>());

      project.some = spy;

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.some(() => {
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

      const expansions: Teges = Teges.empty();
      // @ts-expect-error
      expansions.teges = project;

      expansions.values();

      expect(spy.called).toBe(true);
    });
  });
});
