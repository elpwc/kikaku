/* eslint-disable no-extra-parens */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router';
import { removeDayRecord } from '../../services/api/DayRecord';
import { removeMonthRecord } from '../../services/api/MonthRecord';
import { removeWeekRecord } from '../../services/api/WeekRecord';
import { removeYearRecord } from '../../services/api/YearRecord';
import { Affair } from '../../utils/Affair';
import { AffairItemShowType, AffairListState, RecordType } from '../../utils/enums';
import { RecordExtend, Schedule, YearRecord } from '../../utils/Record';
import { getWeeks, months, weekdays, whichDate, whichWeek } from '../../utils/time';
import { range } from '../../utils/tools';
import { StateInfo } from '../../utils/types';
import AffairItem from '../AffairItem';

interface Props {
  head?: string;
  content?: RecordExtend[];
  stateInfo?: StateInfo;
  /** 当前drag移动到的需要高亮的列， -2: 无drag, -1: 整列, 0以上: 对于DayRecord: drag移动到的index*/
  dragHoverId?: number;
  /** 0: normal, 1: right column, 2: left column */
  columnType: number;
  onRightColumnClick?: () => void;
  onDelete?: () => void;
  type?: RecordType;
  info?: {
    year: number;
    month?: number;
    week?: number;
  };
}

export const YearMonthWeekTableColumn = (props: Props) => {
  const navigate = useNavigate();

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
  const [thisDate, setthisDate] = useState({ y: 2022, m: 1, d: 1 });

  useEffect(() => {
    if (props.type === RecordType.week) {
      setthisWeek(getWeeks(props.info?.year ?? 2022, props.info?.month ?? 1, true)[Number(props.head) - 1]);
    }
    if (props.type === RecordType.day) {
      setthisDate(whichDate(props.info?.year ?? 2022, props.info?.month ?? 1, props.info?.week ?? 1, Number(props.head)));
    }
  }, [props.type, props.info]);

  return (
    /*column*/
    <div
      className={
        'border-r border-gray-300 transition-all ' +
        (props.dragHoverId === -1
          ? 'shadow-lg bg-white ring-inset ring '
          : (() => {
              const date = new Date();
              const headT = Number(props.head);
              const currentDate = whichWeek(date.getFullYear(), date.getMonth() + 1, date.getDate());
              switch (props.type) {
                case RecordType.year:
                  if (headT < currentDate.y) {
                    return 'bg-gray-100';
                  } else if (headT === currentDate.y) {
                    return 'bg-blue-50';
                  }
                  return '';
                case RecordType.month:
                  if ((props.info?.year ?? 2022) < currentDate.y) {
                    return 'bg-gray-100';
                  } else if ((props.info?.year ?? 2022) === currentDate.y) {
                    if (headT < currentDate.m) {
                      return 'bg-gray-100';
                    } else if (headT === currentDate.m) {
                      return 'bg-blue-50';
                    }
                  }

                  return '';
                case RecordType.week: {
                  if ((props.info?.year ?? 2022) < currentDate.y) {
                    return 'bg-gray-100';
                  } else if ((props.info?.year ?? 2022) === currentDate.y) {
                    if ((props.info?.month ?? 1) < currentDate.m) {
                      return 'bg-gray-100';
                    } else if ((props.info?.month ?? 1) === currentDate.m) {
                      if (headT < currentDate.w) {
                        return 'bg-gray-100';
                      } else if (headT === currentDate.w) {
                        return 'bg-blue-50';
                      }
                    }
                  }
                  return '';
                }
                case RecordType.day: {
                  if ((props.info?.year ?? 2022) < currentDate.y) {
                    return 'bg-gray-100';
                  } else if ((props.info?.year ?? 2022) === currentDate.y) {
                    if ((props.info?.month ?? 1) < currentDate.m) {
                      return 'bg-gray-100';
                    } else if ((props.info?.month ?? 1) === currentDate.m) {
                      if ((props.info?.week ?? 1) < currentDate.w) {
                        return 'bg-gray-100';
                      } else if ((props.info?.week ?? 1) === currentDate.w) {
                        if (headT < date.getDay()) {
                          return 'bg-gray-100';
                        } else if (headT === date.getDay()) {
                          return 'bg-blue-50';
                        }
                      }
                    }
                  }
                  return '';
                }
                default:
                  return '';
              }
            })())
      }
    >
      {/*head*/}
      <div
        className="border-b border-gray-300 flex justify-center items-center h-10 cursor-pointer hover:bg-gray-100 active:bg-gray-200"
        onClick={() => {
          if (props.columnType === 1) {
            props.onRightColumnClick?.();
          } else {
            switch (props.type) {
              case RecordType.year:
                navigate('/plan/' + props.head);
                break;
              case RecordType.month:
                navigate('/plan/' + props.info?.year + '/' + props.head);
                break;
              case RecordType.week:
                navigate('/plan/' + props.info?.year + '/' + props.info?.month + '/' + props.head);
                break;
              case RecordType.day:
                navigate('/plan/' + props.info?.year + '/' + props.info?.month + '/' + props.info?.week + '/' + props.head);
                break;
            }
          }
        }}
      >
        {props.columnType === 1 ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg>
        ) : props.columnType === 2 ? (
          <div></div>
        ) : (
          (() => {
            switch (props.type) {
              case RecordType.year:
                return props.head + '年';
              case RecordType.month:
                return months(Number(props.head));
              case RecordType.week:
                return (
                  <div className="text-center">
                    <p>{'第' + props.head + '周'}</p>
                    <p className="text-sm text-gray-400">{`${thisWeek.start.m}月${thisWeek.start.d}日 ~ ${thisWeek.end.m}月${thisWeek.end.d}日`}</p>
                  </div>
                );
              case RecordType.day:
                return (
                  <div className="text-center">
                    <p>{weekdays(Number(props.head))}</p>
                    <p className="text-sm text-gray-400">{`${thisDate.m}月${thisDate.d}日`}</p>
                  </div>
                );
              default:
                return '';
            }
          })()
        )}
      </div>

      {/*body*/}
      {props.columnType === 2 ? (
        <div>
          {range(0, 12, 1).map(item => {
            return (
              <div style={{ minHeight: '3rem', minWidth: '5rem' }} className="border-b-gray-300 border-b text-center" key={item}>
                <p>{item * 2 + ':00-' + (item * 2 + 2) + ':00'}</p>
              </div>
            );
          })}
        </div>
      ) : props.type === RecordType.day ? (
        <div>
          {range(0, 12, 1).map(item => {
            return (
              <Droppable droppableId={'table_' + props.head + '_' + item} key={item}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    id={'table_' + props.head + '_' + item}
                    style={{ minHeight: '3rem', minWidth: '5rem' }}
                    className={'border-b-gray-300 border-b flex flex-col justify-center ' + (props.dragHoverId === item ? 'shadow-lg bg-white ring-inset ring ' : '')}
                  >
                    {(() => {
                      if (props.content && props.content?.length > 0) {
                        const crtItems_t = (props.content! as Schedule[]).filter?.((c: Schedule) => {
                          return (c?.startTime! ?? -1) === item * 2;
                        });
                        if (crtItems_t.length === 0) {
                          return <></>;
                        }
                        const crtItem = crtItems_t[0];
                        return (
                          <Draggable key={crtItem.id} draggableId={'table_' + props.head + '_' + item + '_' + crtItem.id.toString()} index={0}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                id={'table_' + props.head + '_' + item + '_' + crtItem.id.toString()}
                                className=""
                              >
                                <AffairItem
                                  state={
                                    props.stateInfo?.findIndex((affairs: Affair[]) => {
                                      return (
                                        affairs.findIndex(a => {
                                          return a.id === crtItem.affair.id;
                                        }) !== -1
                                      );
                                    }) ?? 0
                                  }
                                  editable={false}
                                  showType={AffairItemShowType.schedule}
                                  deletable={true}
                                  onDelete={(affair, record) => {
                                    removeDayRecord({ id: record?.id.toString() ?? '-1' }).then(e => {
                                      props.onDelete?.();
                                    });
                                  }}
                                  record={crtItem}
                                >
                                  {crtItem.affair!}
                                </AffairItem>
                              </div>
                            )}
                          </Draggable>
                        );
                      } else {
                        return <></>;
                      }
                    })()}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      ) : (
        <Droppable droppableId={'table_' + props.head}>
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} id={'table_' + props.head} style={{ minHeight: '30rem', minWidth: '5rem' }}>
              {props.content?.map((yearRecord, i) => {
                return (
                  <Draggable key={yearRecord.id} draggableId={'table_' + props.head + '_' + yearRecord.id.toString()} index={i}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={'table_' + props.head + '_' + yearRecord.id.toString()}>
                        <AffairItem
                          state={
                            props.stateInfo?.findIndex((affairs: Affair[]) => {
                              return (
                                affairs.findIndex(a => {
                                  return a.id === yearRecord.affair.id;
                                }) !== -1
                              );
                            }) ?? 0
                          }
                          editable={false}
                          showType={AffairItemShowType.table}
                          deletable={true}
                          onDelete={(affair, record) => {
                            switch (props.type) {
                              case RecordType.year:
                                removeYearRecord({ id: record?.id.toString() ?? '-1' }).then(e => {
                                  props.onDelete?.();
                                });
                                break;
                              case RecordType.month:
                                removeMonthRecord({ id: record?.id.toString() ?? '-1' }).then(e => {
                                  props.onDelete?.();
                                });
                                break;
                              case RecordType.week:
                                removeWeekRecord({ id: record?.id.toString() ?? '-1' }).then(e => {
                                  props.onDelete?.();
                                });
                                break;
                              default:
                                return false;
                            }
                            return false;
                          }}
                          record={yearRecord}
                        >
                          {yearRecord.affair}
                        </AffairItem>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      )}
      {}
    </div>
  );
};
