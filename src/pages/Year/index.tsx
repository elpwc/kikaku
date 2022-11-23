import { useEffect, useState } from 'react';
import { DragDropContext, DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';
import { useLocation, useNavigate, useParams } from 'react-router';
import AffairListContainer from '../../components/AffairListContainer';
import YearMonthWeekTable from '../../components/YearMonthWeekTable';
import { findAllAffair } from '../../services/api/Affair';
import { createYearRecord, findAllYearRecord, updateYearRecord } from '../../services/api/YearRecord';
import { Affair } from '../../utils/Affair';
import { YearRecord } from '../../utils/Record';
import './index.css';

interface P {}

let draggedAffair: Affair | null;
let draggedRecord: YearRecord | null;

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const [affairs, setaffairs] = useState([]);
  const [affairsInTypes, setaffairsInTypes] = useState([[], [], [], []]);
  const [drag, setdrag] = useState(false);
  const [dragHoverId, setdragHoverId] = useState('');
  const [yearRecords, setyearRecords] = useState([]);

  // let currentId: string = params.id as string;

  const reloadAffairs = () => {
    findAllAffair().then(e => {
      console.log(e);
      setaffairs(e.data.affairs);
      setaffairsInTypes([
        e.data.affairs.filter((e: Affair) => {
          return e.isImportant === true;
        }),
        e.data.affairs.filter((e: Affair) => {
          return false;
        }),
        e.data.affairs.filter((e: Affair) => {
          return false;
        }),
        e.data.affairs.filter((e: Affair) => {
          return e.isImportant === false;
        }),
      ]);
    });
  };

  const reloadRecords = () => {
    findAllYearRecord().then(e => {
      console.log(e);
      setyearRecords(e.data.yearRecords);
    });
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

    // 终点是左侧栏还是右侧表格
    const destinationType = result.destination.droppableId.split('_')[0];
    // 终点表格列的head
    const destinationHead = result.destination.droppableId.split('_')[1];

    // 放回左边栏的情况
    if (destinationType === 'list') {
      return;
    }

    if (draggedAffair !== null) {
      // 拖拽左边栏事件

      // 已经有过了
      if (
        yearRecords.filter((record: YearRecord) => {
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
        yearRecords.filter((record: YearRecord) => {
          return record.year === Number(destinationHead) && record.affair.id === draggedRecord?.affair.id;
        }).length > 0
      ) {
        return;
      }

      updateYearRecord({ id: draggedRecord.id.toString() }, { year: Number(destinationHead) }).then(e => {
        reloadRecords();
      });
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
      const year = Number(initial.source.droppableId.split('_')[1]);

      draggedRecord = yearRecords.filter((record: YearRecord) => {
        return record.year === year && record.id === Number(initial.draggableId.split('_')[2]);
      })[0];
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate} onDragStart={onDragStart}>
      <div className="md:flex sm:block">
        <div className="w-1/5">
          <AffairListContainer important={affairsInTypes[0]} default={affairsInTypes[3]} draggable={true} />
        </div>
        <div className="w-4/5">
          <YearMonthWeekTable
            drag={drag}
            dragHoverId={dragHoverId}
            onDelete={() => {
              reloadRecords();
            }}
          >
            {yearRecords}
          </YearMonthWeekTable>
        </div>
      </div>
    </DragDropContext>
  );
};
