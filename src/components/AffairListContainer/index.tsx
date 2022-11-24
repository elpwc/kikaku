import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/enums';
import AffairList from '../AffairList';
import './index.css';

interface P {
  important?: Affair[];
  planning?: Affair[];
  outsideplanimportant?: Affair[];
  outsideplan?: Affair[];
  default?: Affair[];
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
      <div className="border border-gray-300 mt-3 bg-white rounded-lg shadow-lg h-full " style={{}}>
        {(props.important?.length ?? 0) > 0 && (
          <AffairList state={AffairListState.PlanningImportant} draggable={props.draggable}>
            {props.important!}
          </AffairList>
        )}
        {(props.planning?.length ?? 0) > 0 && (
          <AffairList state={AffairListState.Planning} draggable={props.draggable}>
            {props.planning!}
          </AffairList>
        )}
        {(props.outsideplanimportant?.length ?? 0) > 0 && (
          <AffairList state={AffairListState.OutsidePlanImportant} draggable={props.draggable}>
            {props.outsideplanimportant!}
          </AffairList>
        )}
        {(props.outsideplan?.length ?? 0) > 0 && (
          <AffairList state={AffairListState.OutsidePlan} draggable={props.draggable}>
            {props.outsideplan!}
          </AffairList>
        )}
        {(props.default?.length ?? 0) > 0 && (
          <AffairList state={AffairListState.Default} draggable={props.draggable}>
            {props.default!}
          </AffairList>
        )}
      </div>
    </>
  );
};
