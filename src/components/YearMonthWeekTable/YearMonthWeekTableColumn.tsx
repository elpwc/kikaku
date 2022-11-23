import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router';
import { removeYearRecord } from '../../services/api/YearRecord';
import { AffairListState } from '../../utils/affairListState';
import { YearRecord } from '../../utils/Record';
import AffairItem from '../AffairItem';

export const YearMonthWeekTableColumn = (props: { head?: string; content?: YearRecord[]; dragHover?: boolean; isRightColumn: boolean; onRightColumnClick?: () => void; onDelete?: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className={'border-r border-gray-300 transition-all ' + (props.dragHover ? 'shadow-lg' : '')}>
      <div
        className="border-b border-gray-300 flex justify-center items-center h-10 cursor-pointer hover:bg-gray-100 active:bg-gray-200"
        onClick={() => {
          if (props.isRightColumn) {
            props.onRightColumnClick?.();
          } else {
            navigate('/month/' + props.head);
          }
        }}
      >
        {props.isRightColumn ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
          </svg>
        ) : (
          props.head
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
                          removeYearRecord({ id: record?.id.toString() ?? '-1' }).then(e => {
                            props.onDelete?.();
                          });
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
