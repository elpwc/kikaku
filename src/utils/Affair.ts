export interface Affair {
  id: number;
  name: string;
  type: string;

  deadline: Date;
  continuePeriod_min: number;

  isOnce: boolean;
  isImportant: boolean;
  doAlarm: boolean;
}
