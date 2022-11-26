import { ToggleSwitch } from 'flowbite-react';
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
  console.log(mylocation);

  useEffect(() => {
    // document.title = '';
  }, []);

  return (
    <>
      <div className="h-screen bg-white">
        <header className="shadow-md flex justify-between mb-1">
          <nav className="flex">
            <MenuItem to="/">
              <p style={{ margin: 0, fontWeight: 500 }}>
                <span className="text-red-600">Ki</span>kaku
              </p>
            </MenuItem>
            <MenuItem to="/year" checked={mylocation.pathname.split('/')[1] === 'year'}>
              规划
            </MenuItem>
            <MenuItem to="/schedule" checked={mylocation.pathname.split('/')[1] === '?'}>
              日程
            </MenuItem>
            <MenuItem to="/add" checked={mylocation.pathname.split('/')[1] === 'add'}>
              添加
            </MenuItem>
            <MenuItem to="/" checked={mylocation.pathname.split('/')[1] === '?'}>
              一览
            </MenuItem>
            <MenuItem to="/about" checked={mylocation.pathname.split('/')[1] === '?'}>
              关于
            </MenuItem>
          </nav>
          <nav className="flex">
            <MenuItem to="">个人页</MenuItem>
          </nav>
        </header>
        <main className="w-full h-full bg-gray-50">
          <Outlet />
        </main>
      </div>
    </>
  );
};
