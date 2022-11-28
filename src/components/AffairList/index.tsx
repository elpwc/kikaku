import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Affair } from '../../utils/Affair';
import { AffairItemShowType, AffairListState } from '../../utils/enums';
import AffairItem from '../AffairItem';
import './index.css';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface P {
  children: Affair[];
  state: AffairListState;
  draggable: boolean;
}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  // let currentId: string = params.id as string;

  useEffect(() => {
    // document.title = '';
  }, []);

  return (
    <>
      <div
        className={
          '' +
          (() => {
            switch (props.state) {
              case AffairListState.PlanningImportant:
                return '';
              case AffairListState.OutsidePlanImportant:
                return '';
              case AffairListState.Planning:
                return '';
              case AffairListState.OutsidePlan:
                return '';
              case AffairListState.Default:
                return '';
              default:
                return '';
            }
          })()
        }
      >
        <div>
          {(() => {
            switch (props.state) {
              case AffairListState.PlanningImportant:
                return <p className="AffairList_title_p text-red-800">重要</p>;
              case AffairListState.OutsidePlanImportant:
                return <p className="AffairList_title_p text-gray-600">重要(计划外)</p>;
              case AffairListState.Planning:
                return <p className="AffairList_title_p text-black">计划中</p>;
              case AffairListState.OutsidePlan:
                return <p className="AffairList_title_p text-gray-600">计划外</p>;
              case AffairListState.Default:
                return <p className="AffairList_title_p text-gray-600">一般规划</p>;
              default:
                return '';
            }
          })()}
        </div>
        {props.draggable ? (
          <Droppable droppableId={'list_' + props.state.toString()}>
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} id={'list_' + props.state.toString()}>
                {props.children.map((affair, i) => {
                  return (
                    <Draggable key={affair.id} draggableId={'list_' + props.state.toString() + '_' + affair.id.toString()} index={i}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} id={'list_' + props.state.toString() + '_' + affair.id.toString()}>
                          <AffairItem state={props.state} draggable={true} showType={AffairItemShowType.leftBar}>
                            {affair}
                          </AffairItem>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        ) : (
          <div id={'list_' + props.state.toString()}>
            {props.children.map((affair, i) => {
              return (
                <div id={'list_' + props.state.toString() + '_' + affair.id.toString()} key={affair.id}>
                  <AffairItem state={props.state} draggable={false} showType={AffairItemShowType.leftBar}>
                    {affair}
                  </AffairItem>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
