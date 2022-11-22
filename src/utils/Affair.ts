import { AffairType } from './AffairType';

export interface Affair {
  id: number;
  name: string;

  type: AffairType;
  /** 说明 */
  content: string;

  /** 死线 */
  deadline: Date;
  /** 一次的持续时间 */
  continuePeriod_min: number;

  /** 次数 -1: 不限次数，1: 单次*/
  times: number;

  isImportant: boolean;
  /** 提醒 */
  doAlarm: boolean;
  createtime?: Date;
  updatetime?: Date;
}

export interface AffairGroup {
  affairs: Affair[];
  name: string;
}
