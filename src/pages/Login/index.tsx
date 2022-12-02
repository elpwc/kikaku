import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { userInfoStorage } from '../../globalStorages';
import { loginUser } from '../../services/api/User';
import { c_autoLogin, c_token, c_userName } from '../../utils/cookies';
import './index.css';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  // let currentId: string = params.id as string;

  const defaultValues = {
    name: '',
    password: '',
    autoLogin: false,
  };

  const [initialValues, setinitialValues]: [any, any] = useState(defaultValues);
  const [tip, settip]: [string, any] = useState('');

  useEffect(() => {
    document.title = 'Kikaku - 登录';
  }, []);

  return (
    <div className="w-full h-full flex justify-center">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values, { resetForm }) => {
          if (values.password !== '') {
            if (values.name !== '') {
              loginUser({ name: values.name, password: values.password })
                .then(e => {
                  console.log(e);
                  const token = e.data.user.token;
                  const name = e.data.user.name;
                  userInfoStorage.set({ name, token });

                  if (values.autoLogin) {
                    c_token(token);
                    c_userName(name);
                    c_autoLogin(true);
                  } else {
                    c_token('');
                    c_userName('');
                    c_autoLogin(false);
                  }

                  resetForm();
                  settip('登录成功喵, 马上跳转');
                  navigate('/');
                })
                .catch(e => {
                  if (e.status === 401) {
                    settip('用户名或密码错误喵');
                  }
                });
            } else {
              settip('请通过输入用户名喵');
            }
          } else {
            settip('请通过输入密码喵');
          }
        }}
      >
        {({ values }) => (
          <Form className="metro-900 shadow-lg rounded-lg px-10 py-5 mt-5 h-fit w-300 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              用户名
              <Field id="name" name="name" className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              密码
              <Field
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </label>
            <div className="flex space-x-5">
              <label className="font-medium text-gray-700 flex align-middle">
                <Field type="checkbox" name="autoLogin" className="h-6 w-6 mr-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                自动登录
              </label>
            </div>

            <button type="submit" className="btn-blue btn-blue-ring">
              登录
            </button>
            <div>{tip}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
