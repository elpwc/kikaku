import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import AffairList from '../../components/AffairList';
import AffairListContainer from '../../components/AffairListContainer';
import { AddForm } from './AddForm';
import './index.css';

interface P {}

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
      <div className="md:flex sm:block">
        <div className="w-1/5">
          <AffairListContainer>
            {[
              {
                id: 1,
                name: 'test',
                type: 'ABC',
                content: '123123',
                deadline: new Date(),
                continuePeriod_min: 60,
                times: 1,
                isImportant: false,
                doAlarm: false,
              },
              {
                id: 2,
                name: 'test2',
                type: 'ABC',
                content: '123123',
                deadline: new Date(),
                continuePeriod_min: 60,
                times: 1,
                isImportant: false,
                doAlarm: false,
              },
            ]}
          </AffairListContainer>
        </div>
        <div className="w-4/5">
          <div className="m-10 py-10 px-40 bg-white border  border-blue-300 rounded-lg shadow-lg">
            <AddForm />
          </div>
        </div>
      </div>
    </>
  );
};
