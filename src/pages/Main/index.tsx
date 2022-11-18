import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
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

  return <>
  
  <Outlet />
  </>;
};
