import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import AffairListContainer from '../../components/AffairListContainer';
import YearMonthWeekTable from '../../components/YearMonthWeekTable';
import { findAllAffair } from '../../services/api/Affair';
import { Affair } from '../../utils/Affair';
import './index.css';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const [affairs, setaffairs] = useState([]);

  // let currentId: string = params.id as string;

  const updateAffairs = () => {
    findAllAffair().then(e => {
      console.log(e);
      setaffairs(e.data.affairs);
    });
  };

  useEffect(() => {
    // document.title = '';
    updateAffairs();
  }, []);

  return (
    <>
      <div className="md:flex sm:block">
        <div className="w-1/5">
          <AffairListContainer
            important={affairs.filter((e: Affair) => {
              return e.isImportant === true;
            })}
            default={affairs.filter((e: Affair) => {
              return e.isImportant === false;
            })}
          />
        </div>
        <div className="w-4/5">
          <YearMonthWeekTable />
        </div>
      </div>
    </>
  );
};
