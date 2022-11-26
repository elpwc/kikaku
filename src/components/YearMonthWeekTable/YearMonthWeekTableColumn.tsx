import { useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router';
import { removeMonthRecord } from '../../services/api/MonthRecord';
import { removeWeekRecord } from '../../services/api/WeekRecord';
import { removeYearRecord } from '../../services/api/YearRecord';
import { AffairListState, RecordType } from '../../utils/enums';
import { YearRecord } from '../../utils/Record';
import { getWeeks, months, weekdays, whichDate, whichWeek } from '../../utils/time';
import AffairItem from '../AffairItem';

interface Props {
  head?: string;
  content?: YearRecord[];
  dragHover?: boolean;
  isRightColumn: boolean;
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
      console.log(props.info?.year ?? 2022, props.info?.month ?? 1, Number(props.head) - 1, getWeeks(props.info?.year ?? 2022, props.info?.month ?? 1, true));
      setthisWeek(getWeeks(props.info?.year ?? 2022, props.info?.month ?? 1, true)[Number(props.head) - 1]);
    }
    if (props.type === RecordType.day) {
      setthisDate(whichDate(props.info?.year ?? 2022, props.info?.month ?? 1, props.info?.week ?? 1, Number(props.head)));
    }
  }, [props.type, props.info]);

  return (
    <div
      className={
        'border-r border-gray-300 transition-all ' +
        (props.dragHover ? 'shadow-lg' : '') +
        (() => {
          const date = new Date();
          const headT = Number(props.head);
          switch (props.type) {
            case RecordType.year:
              if (headT < date.getFullYear()) {
                return 'bg-gray-50';
              } else if (headT === date.getFullYear()) {
                return 'bg-blue-50';
              }
              return '';
            case RecordType.month:
              if ((props.info?.year ?? 2022) < date.getFullYear()) {
                return 'bg-gray-50';
              } else if ((props.info?.year ?? 2022) === date.getFullYear()) {
                if (headT < date.getMonth() + 1) {
                  return 'bg-gray-50';
                } else if (headT === date.getMonth() + 1) {
                  return 'bg-blue-50';
                }
              }

              return '';
            case RecordType.week: {
              const w = whichWeek(date.getFullYear(), date.getMonth() + 1, date.getDate()).w;
              if ((props.info?.year ?? 2022) < date.getFullYear()) {
                return 'bg-gray-50';
              } else if ((props.info?.year ?? 2022) === date.getFullYear()) {
                if ((props.info?.month ?? 1) < date.getMonth() + 1) {
                  return 'bg-gray-50';
                } else if ((props.info?.month ?? 1) === date.getMonth() + 1) {
                  if (headT < w) {
                    return 'bg-gray-50';
                  } else if (headT === w) {
                    return 'bg-blue-50';
                  }
                }
              }
              return '';
            }
            case RecordType.day: {
              const w = whichWeek(date.getFullYear(), date.getMonth() + 1, date.getDate()).w;
              if ((props.info?.year ?? 2022) < date.getFullYear()) {
                return 'bg-gray-50';
              } else if ((props.info?.year ?? 2022) === date.getFullYear()) {
                if ((props.info?.month ?? 1) < date.getMonth() + 1) {
                  return 'bg-gray-50';
                } else if ((props.info?.month ?? 1) === date.getMonth() + 1) {
                  if ((props.info?.week ?? 1) < w) {
                    return 'bg-gray-50';
                  } else if ((props.info?.week ?? 1) === w) {
                    if (headT < date.getDay()) {
                      return 'bg-gray-50';
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
        })()
      }
    >
      <div
        className="border-b border-gray-300 flex justify-center items-center h-10 cursor-pointer hover:bg-gray-100 active:bg-gray-200"
        onClick={() => {
          if (props.isRightColumn) {
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
        {props.isRightColumn ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg>
        ) : (
          (() => {
            switch (props.type) {
              case RecordType.year:
                return props.head + '年';
              case RecordType.month:
                return months(Number(props.head));
              case RecordType.week:
                console.log(thisWeek.start.m, thisWeek.start.d, thisWeek.end.m, thisWeek.end.d);
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

      <Droppable droppableId={'table_' + props.head}>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} id={'table_' + props.head} style={{ minHeight: '30rem', minWidth: '5rem' }}>
            {props.content?.map((yearRecord, i) => {
              return (
                <Draggable key={yearRecord.id} draggableId={'table_' + props.head + '_' + yearRecord.id.toString()} index={i}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={'table_' + props.head + '_' + yearRecord.id.toString()}>
                      <AffairItem
                        state={AffairListState.Default}
                        editable={false}
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
                            case RecordType.day:
                              //return record.day! === head;
                              return false;
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
    </div>
  );
};
