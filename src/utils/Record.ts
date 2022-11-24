import { Affair } from './Affair';

export interface RecordExtend {
  id: number;
  year: number;
  affair: Affair;
  createtime?: Date;
  updatetime?: Date;
}

export interface YearRecord extends RecordExtend {}

export interface MonthRecord extends RecordExtend {
  month: number;
}

export interface WeekRecord extends RecordExtend {
  week: number;
}

export interface Schedule extends RecordExtend {
  week: number;
  month: number;
  dayOfWeek: number;
  startTime: Date;
  endTime: Date;
}
