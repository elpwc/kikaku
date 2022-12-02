import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './index.css';
import image_lonely from '../../resources/lonely.png';
interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  // let currentId: string = params.id as string;

  useEffect(() => {
    document.title = 'Kikaku - 404';
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="bg-white rounded-lg shadow-lg w-2/4 h-fit px-10 py-10 flex flex-col items-center">
        <img src={image_lonely} className="h-40" />
        <Link to="/" className="btn-blue">
          返回主页
        </Link>
      </div>
    </div>
  );
};
