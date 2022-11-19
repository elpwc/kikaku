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
    // document.title = '';
  }, []);

  return (
    <>
      <div className="w-full h-full flex justify-center">
        <Link to="add" className="">
          先添加一些想做的事情吧！
        </Link>
      </div>
    </>
  );
};
