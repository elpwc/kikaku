import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { isLogin } from '../../utils/userUtils';
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
          {isLogin() ? (
            <Link to="/add" className="btn-white btn-white-ring my-14 mx-20">
              添加一些想做的事情吧！
            </Link>
          ) : (
            <div className="m-20 text-center">
              <p className="mb-5">请先</p>
              <Link to="/login" className="btn-blue btn-blue-ring">
                登录
              </Link>
              <p className="my-5">或</p>
              <Link to="/register" className="btn-white btn-white-ring">
                注册
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
