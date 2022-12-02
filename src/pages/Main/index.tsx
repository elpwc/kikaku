import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router';
import { userInfoStorage } from '../../globalStorages';
import { whichWeek } from '../../utils/time';
import { isLogin, logout } from '../../utils/userUtils';
import './index.css';
import { MenuItem } from './MenuItem';
import ParticlesBg from 'particles-bg';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  // let currentId: string = params.id as string;

  const date = new Date();
  const currentWeek = whichWeek(date.getFullYear(), date.getMonth() + 1, date.getDate());

  useEffect(() => {
    // document.title = '';
  }, []);

  return (
    <>
      <div className="h-screen">
        <header className="shadow-md flex justify-between metro-900 sticky z-50 top-0">
          <nav className="flex">
            <MenuItem to="/">
              <p style={{ margin: 0, fontWeight: 500 }}>
                <span className="text-red-600">Ki</span>ʞaʞu
              </p>
            </MenuItem>
            <MenuItem to="/plan" checked={mylocation.pathname.split('/')[1] === 'plan' && mylocation.pathname.split('/').length < 5}>
              规划
            </MenuItem>
            <MenuItem to={`/plan/${currentWeek.y}/${currentWeek.m}/${currentWeek.w}`} checked={mylocation.pathname.split('/')[1] === 'plan' && mylocation.pathname.split('/').length >= 5}>
              日程
            </MenuItem>
            <MenuItem to="/add" checked={mylocation.pathname.split('/')[1] === 'add'}>
              添加
            </MenuItem>
            {/*
            <MenuItem to="/" checked={mylocation.pathname.split('/')[1] === '?'}>
              一览
            </MenuItem>
            */}
            <MenuItem to="/about" checked={mylocation.pathname.split('/')[1] === 'about'}>
              关于
            </MenuItem>
          </nav>
          <nav className="flex">
            {isLogin() ? (
              <>
                <MenuItem to="">
                  <p className=" flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <span>{userInfoStorage.value.name}</span>
                  </p>
                </MenuItem>
                <MenuItem
                  to=""
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }}
                >
                  登出
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem to="/register">注册</MenuItem>
                <MenuItem to="/login">登录</MenuItem>
              </>
            )}
          </nav>
        </header>
        <main className="w-full h-full fixed">
          <Outlet />
        </main>
      </div>

      <ParticlesBg num={5} type="fountain" bg={true} />
    </>
  );
};
