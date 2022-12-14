import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import AffairListContainer from '../../components/AffairListContainer';
import { findAllAffair, findOneAffair } from '../../services/api/Affair';
import { Affair } from '../../utils/Affair';
import { AddForm } from './AddForm';
import './index.css';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  let currentId: string = params.id as string;

  const [affairs, setaffairs] = useState([]);
  const [isModify, setisModify] = useState(false);
  const [affair, setaffair]: [Affair | undefined | any, any] = useState();

  const updateAffairs = () => {
    findAllAffair().then((e: any) => {
      setaffairs(e.data.affairs);
    });
  };

  useEffect(() => {
    document.title = 'Kikaku - 添加新计划';
    updateAffairs();
  }, []);

  useEffect(() => {
    if (currentId) {
      setisModify(true);
      findOneAffair({ id: currentId })
        .then((e: any) => {
          if (e.code === 200) {
            setaffair(e.data);
          }
        })
        .catch((e: any) => {
          console.log(e);
        });
    } else {
      setisModify(false);
      setaffair(undefined);
    }
  }, [currentId]);

  return (
    <>
      <div className="md:flex sm:block h-full metro-900">
        <div className="w-1/8">
          <AffairListContainer
            important={affairs.filter((e: Affair) => {
              return e.isImportant === true;
            })}
            default={affairs.filter((e: Affair) => {
              return e.isImportant === false;
            })}
            draggable={false}
          />
        </div>
        <div className="w-4/5">
          <div className="mx-10 mt-3 py-10 px-40 border metro-900 border-gray-300 rounded-lg shadow-lg">
            <AddForm
              affair={affair}
              isModify={isModify}
              onSubmit={() => {
                updateAffairs();
                if (currentId) {
                  navigate('/add');
                  setaffair();
                  setisModify(false);
                }
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
