import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/affairListState';
import AffairList from '../AffairList';
import './index.css';

interface P {
  children: Affair[];
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
        <AffairList state={AffairListState.Important}>{props.children}</AffairList>
        <AffairList state={AffairListState.Planning}>{props.children}</AffairList>
        <AffairList state={AffairListState.OutsidePlan}>{props.children}</AffairList>
        <AffairList state={AffairListState.Default}>{props.children}</AffairList>
      </div>
    </>
  );
};
