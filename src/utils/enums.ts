export enum AffairListState {
  /** 计划内重要 */
  PlanningImportant,
  /** 计划内 */
  Planning,
  /** 计划外重要 */
  OutsidePlanImportant,
  /** 计划外 */
  OutsidePlan,
  /** 默认 */
  Default,
}

export enum RecordType {
  year,
  month,
  week,
  day,
}

export enum AffairItemShowType {
  leftBar,
  table,
  schedule
}