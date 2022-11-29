/* eslint-disable valid-jsdoc */
/* eslint-disable no-extra-parens */
import { useEffect, useState } from 'react';
import { DragDropContext, DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';
import { useLocation, useNavigate, useParams } from 'react-router';
import AffairListContainer from '../AffairListContainer';
import YearMonthWeekTable from '../YearMonthWeekTable';
import { findAllAffair } from '../../services/api/Affair';
import { createYearRecord, findAllYearRecord, updateYearRecord } from '../../services/api/YearRecord';
import { Affair } from '../../utils/Affair';
import { RecordType } from '../../utils/enums';
import { MonthRecord, RecordExtend, Schedule, WeekRecord, YearRecord } from '../../utils/Record';
import './index.css';
import { Breadcrumb } from 'flowbite-react';
import { createMonthRecord, findAllMonthRecord, updateMonthRecord } from '../../services/api/MonthRecord';
import { createWeekRecord, findAllWeekRecord, updateWeekRecord } from '../../services/api/WeekRecord';
import { getWeeks, getWeeksCount } from '../../utils/time';
import { createDayRecord, findAllDayRecord, updateDayRecord } from '../../services/api/DayRecord';
import { StateInfo } from '../../utils/types';

interface P {
  type: RecordType;
  info?: {
    year: number;
    month?: number;
    week?: number;
  };
}

/** 从左边拖拽的 */
let draggedAffair: Affair | null;
/** 从右边拖拽的 */
let draggedRecord: RecordExtend | null;

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const [affairsInTypes, setaffairsInTypes]: [StateInfo, any] = useState(/*im plan outim out normal*/ [[], [], [], [], []]);
  const [dragHoverId, setdragHoverId] = useState('');
  const [records, setrecords]: [RecordExtend[], any] = useState([]);
  /** 只适用于Schedule页 */
  const [thisWeek, setthisWeek] = useState({
    start: {
      m: 1,
      d: 1,
    },
    end: {
      m: 1,
      d: 1,
    },
  });

  // let currentId: string = params.id as string;

  /** 重置拖拽的信息 */
  const resetDragStates = () => {
    draggedAffair = null;
    draggedRecord = null;
    setdragHoverId('');
  };

  const reloadAffairs = () => {
    findAllAffair().then(async e => {
      let parent_records: RecordExtend[] = [];
      switch (props.type) {
        case RecordType.year:
          parent_records = (await findAllYearRecord()).data.yearRecords;
          break;
        case RecordType.month:
          parent_records = (await findAllYearRecord({ params: { year: props.info?.year } })).data.yearRecords;
          break;
        case RecordType.week:
          parent_records = (await findAllMonthRecord({ params: { year: props.info?.year, month: props.info?.month } })).data.records;
          break;
        case RecordType.day:
          parent_records = (await findAllWeekRecord({ params: { year: props.info?.year, month: props.info?.month, week: props.info?.week } })).data.records;
          break;
      }

      switch (props.type) {
        case RecordType.year:
          setaffairsInTypes([
            // 重要
            e.data.affairs.filter((e: Affair) => {
              return e.isImportant === true;
            }),
            [],
            [],
            [],
            // 一般
            e.data.affairs.filter((e: Affair) => {
              return e.isImportant === false;
            }),
          ]);
          break;
        case RecordType.month:
          setaffairsInTypes([
            // 重要
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === true &&
                (parent_records as MonthRecord[]).filter((r: MonthRecord) => {
                  return r.affair.id === e.id;
                }).length > 0
              );
            }),
            // 计划内
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === false &&
                (parent_records as MonthRecord[]).filter((r: MonthRecord) => {
                  return r.affair.id === e.id;
                }).length > 0
              );
            }),
            // 重要计划外
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === true &&
                (parent_records as MonthRecord[]).filter((r: MonthRecord) => {
                  return r.affair.id === e.id;
                }).length === 0
              );
            }),
            // 计划外
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === false &&
                (parent_records as MonthRecord[]).filter((r: MonthRecord) => {
                  return r.affair.id === e.id;
                }).length === 0
              );
            }),
            [],
          ]);
          break;
        case RecordType.week:
          setaffairsInTypes([
            // 重要
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === true &&
                (parent_records as WeekRecord[]).filter((r: WeekRecord) => {
                  return r.affair.id === e.id;
                }).length > 0
              );
            }),
            // 计划内
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === false &&
                (parent_records as WeekRecord[]).filter((r: WeekRecord) => {
                  return r.affair.id === e.id;
                }).length > 0
              );
            }),
            // 重要计划外
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === true &&
                (parent_records as WeekRecord[]).filter((r: WeekRecord) => {
                  return r.affair.id === e.id;
                }).length === 0
              );
            }),
            // 计划外
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === false &&
                (parent_records as WeekRecord[]).filter((r: WeekRecord) => {
                  return r.affair.id === e.id;
                }).length === 0
              );
            }),
            [],
          ]);
          break;
        case RecordType.day:
          setaffairsInTypes([
            // 重要
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === true &&
                (parent_records as Schedule[]).filter((r: Schedule) => {
                  return r.affair.id === e.id;
                }).length > 0
              );
            }),
            // 计划内
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === false &&
                (parent_records as Schedule[]).filter((r: Schedule) => {
                  return r.affair.id === e.id;
                }).length > 0
              );
            }),
            // 重要计划外
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === true &&
                (parent_records as Schedule[]).filter((r: Schedule) => {
                  return r.affair.id === e.id;
                }).length === 0
              );
            }),
            // 计划外
            e.data.affairs.filter((e: Affair) => {
              return (
                e.isImportant === false &&
                (parent_records as Schedule[]).filter((r: Schedule) => {
                  return r.affair.id === e.id;
                }).length === 0
              );
            }),
            [],
          ]);
          break;
      }
    });
  };

  const reloadRecords = async () => {
    let records_t: RecordExtend[] = [];
    switch (props.type) {
      case RecordType.year:
        records_t = (await findAllYearRecord()).data.yearRecords;
        break;
      case RecordType.month:
        records_t = (await findAllMonthRecord({ params: { year: props.info?.year } })).data.records;
        break;
      case RecordType.week:
        records_t = (await findAllWeekRecord({ params: { year: props.info?.year, month: props.info?.month } })).data.records;
        break;
      case RecordType.day:
        records_t = (await findAllDayRecord({ params: { year: props.info?.year, month: props.info?.month, week: props.info?.week } })).data.records;
        break;
    }
    setrecords(records_t);
    return records_t;
  };

  useEffect(() => {
    // document.title = '';
    reloadAffairs();
    reloadRecords();
  }, [props.info]);

  useEffect(() => {
    if (props.type === RecordType.day) {
      setthisWeek(getWeeks(props.info?.year ?? 2022, props.info?.month ?? 1, true)[(Number(props.info?.week) ?? 1) - 1]);
    }
  }, [props.type, props.info]);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      resetDragStates();
      return;
    }

    if (draggedAffair === null && draggedRecord === null) {
      resetDragStates();
      return;
    }

    // 拖动终点是左侧栏还是右侧表格
    const destinationType = result.destination.droppableId.split('_')[0];
    // 拖动终点表格列的head
    const destinationHead = result.destination.droppableId.split('_')[1];

    // 放回左边栏的情况
    if (destinationType === 'list') {
      resetDragStates();
      return;
    }

    switch (props.type) {
      case RecordType.year:
        if (draggedAffair !== null) {
          // 拖拽了左边栏的item
          // 已经有过了
          if (
            records.filter((record: RecordExtend) => {
              return record.year === Number(destinationHead) && record.affair.id === draggedAffair?.id;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          createYearRecord({ year: Number(destinationHead), affairId: draggedAffair?.id }).then(e => {
            reloadRecords();
          });
        } else if (draggedRecord !== null) {
          // 放回相同列的情况
          if (destinationType === 'table' && destinationHead === draggedRecord.year.toString()) {
            resetDragStates();
            return;
          }
          // 已经有过了
          if (
            records.filter((record: RecordExtend) => {
              return record.year === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          updateYearRecord({ id: draggedRecord.id.toString() }, { year: Number(destinationHead) }).then(e => {
            reloadRecords();
          });
        }
        break;
      case RecordType.month:
        if (draggedAffair !== null) {
          // 拖拽了左边栏的item
          // 已经有过了
          if (
            (records as MonthRecord[]).filter((record: MonthRecord) => {
              return record.month === Number(destinationHead) && record.affair.id === draggedAffair?.id;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          createMonthRecord({ month: Number(destinationHead), year: props.info?.year ?? 0, affairId: draggedAffair?.id }).then(e => {
            reloadRecords();
          });
        } else if (draggedRecord !== null) {
          // 放回相同列的情况
          if (destinationType === 'table' && destinationHead === (draggedRecord as MonthRecord).month.toString()) {
            resetDragStates();
            return;
          }
          // 已经有过了
          if (
            (records as MonthRecord[]).filter((record: MonthRecord) => {
              return record.month === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          updateMonthRecord({ id: draggedRecord.id.toString() }, { month: Number(destinationHead) }).then(e => {
            reloadRecords();
          });
        }
        break;
      case RecordType.week:
        if (draggedAffair !== null) {
          // 拖拽了左边栏的item
          // 已经有过了
          if (
            (records as WeekRecord[]).filter((record: WeekRecord) => {
              return record.week === Number(destinationHead) && record.affair.id === draggedAffair?.id;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          createWeekRecord({ week: Number(destinationHead), month: props.info?.month ?? 1, year: props.info?.year ?? 0, affairId: draggedAffair?.id }).then(e => {
            reloadRecords();
          });
        } else if (draggedRecord !== null) {
          // 放回相同列的情况
          if (destinationType === 'table' && destinationHead === (draggedRecord as WeekRecord).week.toString()) {
            resetDragStates();
            return;
          }
          // 已经有过了
          if (
            (records as WeekRecord[]).filter((record: WeekRecord) => {
              return record.week === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          updateWeekRecord({ id: draggedRecord.id.toString() }, { week: Number(destinationHead) }).then(e => {
            reloadRecords();
          });
        }
        break;
      case RecordType.day:
        const destinationLine = result.destination.droppableId.split('_')[2];
        if (draggedAffair !== null) {
          // 拖拽了左边栏的item
          // 已经有过了
          if (
            (records as Schedule[]).filter((record: Schedule) => {
              return record.day === Number(destinationHead) && record.startTime === Number(destinationLine) * 2;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          createDayRecord({
            startTime: Number(destinationLine) * 2,
            endTime: (Number(destinationLine) + 1) * 2,
            day: Number(destinationHead),
            week: props.info?.week ?? 1,
            month: props.info?.month ?? 1,
            year: props.info?.year ?? 0,
            affairId: draggedAffair?.id,
          }).then(e => {
            reloadRecords();
          });
        } else if (draggedRecord !== null) {
          // 放回相同列相同行的情况
          if (destinationType === 'table' && destinationHead === (draggedRecord as Schedule).day.toString() && destinationLine === ((draggedRecord as Schedule).startTime * 2).toString()) {
            resetDragStates();
            return;
          }
          // 已经有过了
          if (
            (records as Schedule[]).filter((record: Schedule) => {
              return record.day === Number(destinationHead) && record.startTime === Number(destinationLine) * 2;
            }).length > 0
          ) {
            resetDragStates();
            return;
          }
          updateDayRecord({ id: draggedRecord.id.toString() }, { day: Number(destinationHead), startTime: Number(destinationLine) * 2, endTime: (Number(destinationLine) + 1) * 2 }).then(e => {
            reloadRecords();
          });
        }
        break;
    }

    resetDragStates();
  };

  const onDragUpdate = (initial: DragUpdate) => {
    if (!initial.destination) {
      return;
    }

    setdragHoverId(initial.destination.droppableId);
  };

  const onDragStart = (initial: DragStart) => {
    const sourceType = initial.source.droppableId.split('_')[0];
    if (sourceType === 'list') {
      const state = Number(initial.source.droppableId.split('_')[1]);
      draggedAffair = affairsInTypes[state][initial.source.index];
    } else if (sourceType === 'table') {
      // 源头列的head处数据
      const head = Number(initial.source.droppableId.split('_')[1]);

      switch (props.type) {
        case RecordType.year:
          draggedRecord = records.filter((record: YearRecord) => {
            return record.year === head && record.id === Number(initial.draggableId.split('_')[2]);
          })[0];
          break;
        case RecordType.month:
          draggedRecord = (records as MonthRecord[]).filter((record: MonthRecord) => {
            return record.month === head && record.id === Number(initial.draggableId.split('_')[2]);
          })[0];
          break;
        case RecordType.week:
          draggedRecord = (records as WeekRecord[]).filter((record: WeekRecord) => {
            return record.week === head && record.id === Number(initial.draggableId.split('_')[2]);
          })[0];
          break;
        case RecordType.day:
          const line = Number(initial.source.droppableId.split('_')[2]);
          draggedRecord = (records as [Schedule]).filter((record: Schedule) => {
            return record.day === head && record.startTime === line * 2 && record.id === Number(initial.draggableId.split('_')[3]);
          })[0];
          break;
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}>
      <div className="md:flex sm:block h-full">
        <div className="w-1/8">
          <AffairListContainer
            important={affairsInTypes[0]}
            planning={affairsInTypes[1]}
            outsideplanimportant={affairsInTypes[2]}
            outsideplan={affairsInTypes[3]}
            default={affairsInTypes[4]}
            draggable={true}
          />
        </div>
        <div className="w-4/5">
          <div className="flex justify-between">
            <Breadcrumb aria-label="Default breadcrumb" className="my-3 mx-10">
              <Breadcrumb.Item
                className="cursor-pointer"
                onClick={() => {
                  navigate('/plan/');
                }}
              >
                总体规划
              </Breadcrumb.Item>
              {(props.type === RecordType.month || props.type === RecordType.week || props.type === RecordType.day) && (
                <Breadcrumb.Item
                  className="cursor-pointer"
                  onClick={() => {
                    navigate('/plan/' + props.info?.year);
                  }}
                >
                  {props.info?.year}年
                </Breadcrumb.Item>
              )}
              {(props.type === RecordType.day || props.type === RecordType.week) && (
                <Breadcrumb.Item
                  className="cursor-pointer"
                  onClick={() => {
                    navigate('/plan/' + props.info?.year + '/' + props.info?.month);
                  }}
                >
                  {props.info?.month}月
                </Breadcrumb.Item>
              )}
              {props.type === RecordType.day && (
                <Breadcrumb.Item
                  className="cursor-pointer"
                  onClick={() => {
                    navigate('/plan/' + props.info?.year + '/' + props.info?.month + '/' + props.info?.week);
                  }}
                >
                  第 {props.info?.week} 周 {` (${thisWeek.start.m}月${thisWeek.start.d}日 ~ ${thisWeek.end.m}月${thisWeek.end.d}日)`}
                </Breadcrumb.Item>
              )}
            </Breadcrumb>
            {props.type !== RecordType.year && (
              <div className="flex space-x-5 items-center pr-20">
                <button
                  className="roundButton"
                  onClick={() => {
                    navigate(
                      (() => {
                        switch (props.type) {
                          case RecordType.year:
                            return `/plan`;
                          case RecordType.month:
                            return `/plan/${(props.info?.year ?? 2022) - 1}`;
                          case RecordType.week:
                            return `/plan/${props.info?.month === 1 ? (props.info?.year ?? 2022) - 1 : props.info?.year ?? 2022}/${props.info?.month === 1 ? 12 : (props.info?.month ?? 2) - 1}`;
                          case RecordType.day:
                            const y = props.info?.month === 1 && props.info.week === 1 ? (props.info?.year ?? 2022) - 1 : props.info?.year ?? 2022;
                            const m = props.info?.week === 1 && props.info.month === 1 ? 12 : props.info?.week === 1 ? (props.info?.month ?? 2) - 1 : props.info?.month ?? 2;
                            let w = props.info?.week ?? 1;
                            if (w === 1) {
                              if (props.info?.month === 1) {
                                w = getWeeksCount((props.info?.year ?? 2022) - 1, 12);
                              } else {
                                w = getWeeksCount(props.info?.year ?? 2022, (props.info?.month ?? 1) - 1);
                              }
                            } else {
                              w = (props.info?.week ?? 2) - 1;
                            }
                            return `/plan/${y}/${m}/${w}`;
                          default:
                            return '';
                        }
                      })()
                    );
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                    />
                  </svg>
                </button>
                <button
                  className="roundButton"
                  onClick={() => {
                    navigate(
                      (() => {
                        switch (props.type) {
                          case RecordType.year:
                            return `/plan`;
                          case RecordType.month:
                            return `/plan/${(props.info?.year ?? 2022) + 1}`;
                          case RecordType.week:
                            return `/plan/${props.info?.month === 12 ? (props.info?.year ?? 2022) + 1 : props.info?.year ?? 2022}/${props.info?.month === 12 ? 1 : (props.info?.month ?? 2) + 1}`;
                          case RecordType.day:
                            return `/plan/${
                              props.info?.month === 12 && props.info.week === getWeeksCount(props.info.year, props.info?.month ?? 1) ? (props.info?.year ?? 2022) + 1 : props.info?.year ?? 2022
                            }/${
                              props.info?.month === 12 && props.info?.week === getWeeksCount(props.info?.year ?? 2022, props.info?.month ?? 1)
                                ? 1
                                : props.info?.week === getWeeksCount(props.info?.year ?? 2022, props.info?.month ?? 1)
                                ? (props.info?.month ?? 2) + 1
                                : props.info?.month ?? 2
                            }/${props.info?.week === getWeeksCount(props.info?.year ?? 2022, props.info?.month ?? 1) ? 1 : (props.info?.week ?? 2) + 1}`;
                          default:
                            return '';
                        }
                      })()
                    );
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <YearMonthWeekTable
            dragHoverId={dragHoverId}
            stateInfo={affairsInTypes}
            onDelete={() => {
              reloadRecords();
            }}
            type={props.type}
            info={props.info}
          >
            {records}
          </YearMonthWeekTable>
        </div>
      </div>
    </DragDropContext>
  );
};
