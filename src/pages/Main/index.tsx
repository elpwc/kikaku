import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import './index.css';
import { MenuItem } from './MenuItem';

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
      <div className="bg-cyan-50">
        <header>
          <nav
            style={{
              display: 'flex',
            }}
          >
            <MenuItem to="/">
              <p style={{ margin: 0 }}>kikaku</p>
            </MenuItem>
            <MenuItem to="">年</MenuItem>
            <MenuItem to="">月</MenuItem>
            <MenuItem to="">周</MenuItem>
            <MenuItem to="">日</MenuItem>
            <MenuItem to="add">添加</MenuItem>
          </nav>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
