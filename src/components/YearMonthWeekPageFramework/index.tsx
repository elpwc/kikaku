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
import { MonthRecord, RecordExtend, WeekRecord, YearRecord } from '../../utils/Record';
import './index.css';
import { Breadcrumb } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { createMonthRecord, findAllMonthRecord, updateMonthRecord } from '../../services/api/MonthRecord';
import { createWeekRecord, findAllWeekRecord, updateWeekRecord } from '../../services/api/WeekRecord';

interface P {
  type: RecordType;
  info?: {
    year: number;
    month?: number;
    week?: number;
  };
}

let draggedAffair: Affair | null;
let draggedRecord: RecordExtend | null;

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const [affairs, setaffairs] = useState([]);
  const [affairsInTypes, setaffairsInTypes] = useState(/*im plan outim out normal*/ [[], [], [], [], []]);
  const [drag, setdrag] = useState(false);
  const [dragHoverId, setdragHoverId] = useState('');
  const [records, setrecords]: [RecordExtend[], any] = useState([]);

  // let currentId: string = params.id as string;

  const reloadAffairs = () => {
    findAllAffair().then(async e => {
      console.log(e);
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
          console.log(parent_records);
          break;
        case RecordType.day:
          //setrecords((await findAllWeekRecord({year: props.info?.year, month: props.info?.month})).data.week_records)
          break;
      }

      setaffairs(e.data.affairs);
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
          //setrecords((await findAllWeekRecord({year: props.info?.year, month: props.info?.month})).data.week_records)
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
        console.log(records_t);
        break;
      case RecordType.day:
        //setrecords((await findAllWeekRecord({year: props.info?.year, month: props.info?.month})).data.week_records)
        break;
    }
    setrecords(records_t);
    return records_t;
  };

  useEffect(() => {
    // document.title = '';
    reloadAffairs();
    reloadRecords();
  }, []);

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (draggedAffair === null && draggedRecord === null) {
      return;
    }

    // 拖动终点是左侧栏还是右侧表格
    const destinationType = result.destination.droppableId.split('_')[0];
    // 拖动终点表格列的head
    const destinationHead = result.destination.droppableId.split('_')[1];

    // 放回左边栏的情况
    if (destinationType === 'list') {
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
            return;
          }
          createYearRecord({ year: Number(destinationHead), affairId: draggedAffair?.id }).then(e => {
            reloadRecords();
          });
        } else if (draggedRecord !== null) {
          // 放回相同列的情况
          if (destinationType === 'table' && destinationHead === draggedRecord.year.toString()) {
            return;
          }
          // 已经有过了
          if (
            records.filter((record: RecordExtend) => {
              return record.year === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
            }).length > 0
          ) {
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
            return;
          }
          createMonthRecord({ month: Number(destinationHead), year: props.info?.year ?? 0, affairId: draggedAffair?.id }).then(e => {
            reloadRecords();
          });
        } else if (draggedRecord !== null) {
          // 放回相同列的情况
          if (destinationType === 'table' && destinationHead === (draggedRecord as MonthRecord).month.toString()) {
            return;
          }
          // 已经有过了
          if (
            (records as MonthRecord[]).filter((record: MonthRecord) => {
              return record.month === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
            }).length > 0
          ) {
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
            return;
          }
          createWeekRecord({ week: Number(destinationHead), month: props.info?.month ?? 1, year: props.info?.year ?? 0, affairId: draggedAffair?.id }).then(e => {
            reloadRecords();
          });
        } else if (draggedRecord !== null) {
          // 放回相同列的情况
          if (destinationType === 'table' && destinationHead === (draggedRecord as WeekRecord).week.toString()) {
            return;
          }
          // 已经有过了
          if (
            (records as WeekRecord[]).filter((record: WeekRecord) => {
              return record.week === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
            }).length > 0
          ) {
            return;
          }
          updateWeekRecord({ id: draggedRecord.id.toString() }, { week: Number(destinationHead) }).then(e => {
            reloadRecords();
          });
        }
        break;
      case RecordType.day:
        // if (draggedAffair !== null) {
        //   // 拖拽了左边栏的item
        //   // 已经有过了
        //   if (
        //     (records as WeekRecord[]).filter((record: WeekRecord) => {
        //       return record.week === Number(destinationHead) && record.affair.id === draggedAffair?.id;
        //     }).length > 0
        //   ) {
        //     return;
        //   }
        //   createWeekRecord({ week: Number(destinationHead), month: props.info?.month ?? 1, year: props.info?.year ?? 0, affairId: draggedAffair?.id }).then(e => {
        //     reloadRecords();
        //   });
        // } else if (draggedRecord !== null) {
        //   // 放回相同列的情况
        //   if (destinationType === 'table' && destinationHead === (draggedRecord as WeekRecord).week.toString()) {
        //     return;
        //   }
        //   // 已经有过了
        //   if (
        //     (records as WeekRecord[]).filter((record: WeekRecord) => {
        //       return record.week === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
        //     }).length > 0
        //   ) {
        //     return;
        //   }
        //   updateWeekRecord({ id: draggedRecord.id.toString() }, { week: Number(destinationHead) }).then(e => {
        //     reloadRecords();
        //   });
        // }
        break;
    }

    draggedAffair = null;
    draggedRecord = null;
    setdragHoverId('');
    console.log(result);
  };

  const onDragUpdate = (initial: DragUpdate) => {
    console.log(initial);

    if (!initial.destination) {
      return;
    }

    setdragHoverId(initial.destination.droppableId);
  };

  const onDragStart = (initial: DragStart) => {
    console.log(initial);

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
          // draggedRecord = (records as []).filter((record: WeekRecord) => {
          //   return record.week === head && record.id === Number(initial.draggableId.split('_')[2]);
          // })[0];
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
          <Breadcrumb aria-label="Default breadcrumb" className="my-3 mx-10">
            <Breadcrumb.Item href="#">
              <Link to="/year">总体规划</Link>
            </Breadcrumb.Item>
            {(props.type === RecordType.month || props.type === RecordType.week || props.type === RecordType.day) && (
              <Breadcrumb.Item href="#">
                <Link to={'/year/' + props.info?.year}>{props.info?.year}年</Link>
              </Breadcrumb.Item>
            )}
            {(props.type === RecordType.day || props.type === RecordType.week) && (
              <Breadcrumb.Item href="#">
                <Link to={'/year/' + props.info?.year + '/month/' + props.info?.month}>{props.info?.month}月</Link>
              </Breadcrumb.Item>
            )}
            {props.type === RecordType.day && (
              <Breadcrumb.Item href="#">
                <Link to={'/year/' + props.info?.year + '/month/' + props.info?.month + '/week/' + props.info?.week}>第 {props.info?.week} 周</Link>
              </Breadcrumb.Item>
            )}
          </Breadcrumb>
          <YearMonthWeekTable
            drag={drag}
            dragHoverId={dragHoverId}
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
