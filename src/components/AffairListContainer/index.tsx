import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/affairListState';
import AffairItem from '../AffairItem';
import AffairList from '../AffairList';
import './index.css';

interface P {
  important?: Affair[];
  planning?: Affair[];
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
      <div className="bg-white">
        {props.important && (
          <AffairList state={AffairListState.Important} draggable={props.draggable}>
            {props.important}
          </AffairList>
        )}
        {props.planning && (
          <AffairList state={AffairListState.Planning} draggable={props.draggable}>
            {props.planning}
          </AffairList>
        )}
        {props.outsideplan && (
          <AffairList state={AffairListState.OutsidePlan} draggable={props.draggable}>
            {props.outsideplan}
          </AffairList>
        )}
        {props.default && (
          <AffairList state={AffairListState.Default} draggable={props.draggable}>
            {props.default}
          </AffairList>
        )}
      </div>
    </>
  );
};
