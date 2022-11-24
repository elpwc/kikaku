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

  useEffect(() => {
    // document.title = '';
  }, []);

  return (
    <>
      <div className="h-screen bg-white">
        <header className="shadow flex justify-between">
          <nav className="flex">
            <MenuItem to="/">
              <p style={{ margin: 0, fontWeight: 500 }}>
                <span className="text-red-600">Ki</span>kaku
              </p>
            </MenuItem>
            <MenuItem to="year">规划</MenuItem>
            <MenuItem to="">日程</MenuItem>
            <MenuItem to="add">添加</MenuItem>
            <MenuItem to="">一览</MenuItem>
          </nav>
          <nav className="flex">
            <MenuItem to="">个人页</MenuItem>
          </nav>
        </header>
        <main className="w-full h-full pt-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </>
  );
};
