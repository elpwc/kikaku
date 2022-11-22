import { Affair } from './Affair';

export interface YearRecord {
  id: number;
  year: number;
  affair: Affair;
  createtime?: Date;
  updatetime?: Date;
}
