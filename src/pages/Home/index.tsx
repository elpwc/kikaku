import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './index.css';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  // let currentId: string = params.id as string;

  useEffect(() => {
    document.title = 'Kikaku';
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center pt-32">
        <div className="metro-500 shadow-lg rounded-lg w-fit h-fit flex justify-center">
          <Link to="add" className="btn-white btn-white-ring m-20">
            添加一些想做的事情吧！
          </Link>
        </div>
      </div>
    </>
  );
};
