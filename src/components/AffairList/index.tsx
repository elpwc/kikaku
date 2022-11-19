import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Affair } from '../../utils/Affair';
import AffairItem from '../AffairItem';
import './index.css';

interface P {
  affairs: Affair[];
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
      <div>
        {props.affairs.map(affair => {
          return <AffairItem affair={affair}></AffairItem>;
        })}
      </div>
    </>
  );
};
