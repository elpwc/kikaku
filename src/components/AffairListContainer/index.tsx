import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/affairListState';
import AffairList from '../AffairList';
import './index.css';

interface P {
  important?: Affair[];
  planning?: Affair[];
  outsideplan?: Affair[];
  default?: Affair[];
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
      <div className="bg-white">
        {props.important && <AffairList state={AffairListState.Important}>{props.important}</AffairList>}
        {props.planning && <AffairList state={AffairListState.Planning}>{props.planning}</AffairList>}
        {props.outsideplan && <AffairList state={AffairListState.OutsidePlan}>{props.outsideplan}</AffairList>}
        {props.default && <AffairList state={AffairListState.Default}>{props.default}</AffairList>}
      </div>
    </>
  );
};
