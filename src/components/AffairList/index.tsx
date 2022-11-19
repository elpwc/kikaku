import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/affairListState';
import AffairItem from '../AffairItem';
import './index.css';

interface P {
  children: Affair[];
  state: AffairListState;
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
              case AffairListState.Important:
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
              case AffairListState.Important:
                return <p className="AffairList_title_p text-red-800">重要</p>;
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
        {props.children.map(affair => {
          return <AffairItem state={props.state}>{affair}</AffairItem>;
        })}
      </div>
    </>
  );
};
