import { Visitable } from './Visitable';

export interface Visitor {
  visit(visitable: Visitable): void;
}
