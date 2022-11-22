import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import './index.css';
import { YearMonthWeekTableColumn } from './YearMonthWeekTableColumn';

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
      <div className="flex border border-gray-300 m-10 bg-white  rounded-lg shadow-lg">
        {[2022, 2023, 2024].map(head => {
          return (
            <YearMonthWeekTableColumn
              head={head.toString()}
              content={[
                {
                  id: 15,
                  name: '喵叽',
                  content: '',
                  deadline: new Date('2022-11-19T21:10:00.000Z'),
                  continuePeriod_min: 3,
                  times: 114514,
                  isImportant: true,
                  doAlarm: false,
                  createtime: new Date('2022-11-21T21:10:49.000Z'),
                  updatetime: new Date('2022-11-21T21:10:49.000Z'),
                  type: {
                    id: 6,
                    name: 'dfg',
                    createtime: new Date('2022-11-20T18:14:34.000Z'),
                    updatetime: new Date('2022-11-20T18:14:34.000Z'),
                  },
                },
                {
                  id: 14,
                  name: '挼',
                  content: '',
                  deadline: new Date('2022-11-25T21:08:00.000Z'),
                  continuePeriod_min: 2,
                  times: -1,
                  isImportant: false,
                  doAlarm: true,
                  createtime: new Date('2022-11-21T21:08:38.000Z'),
                  updatetime: new Date('2022-11-21T21:08:38.000Z'),
                  type: {
                    id: 8,
                    name: 'dfgsdf3434tt4',
                    createtime: new Date('2022-11-20T18:14:42.000Z'),
                    updatetime: new Date('2022-11-20T18:14:42.000Z'),
                  },
                },
                {
                  id: 3,
                  name: 'test2',
                  content: '1ewrfewrgwefwf',
                  deadline: new Date('2022-11-04T18:25:00.000Z'),
                  continuePeriod_min: 2,
                  times: 3,
                  isImportant: false,
                  doAlarm: true,
                  createtime: new Date('2022-11-20T20:12:22.000Z'),
                  updatetime: new Date('2022-11-20T20:12:22.000Z'),
                  type: {
                    id: 4,
                    name: 'test',
                    createtime: new Date('2022-11-20T18:14:16.000Z'),
                    updatetime: new Date('2022-11-20T18:14:16.000Z'),
                  },
                },
                {
                  id: 1,
                  name: 'test1',
                  content: '',
                  deadline: new Date('2022-11-03T18:25:00.000Z'),
                  continuePeriod_min: 12,
                  times: 1,
                  isImportant: true,
                  doAlarm: false,
                  createtime: new Date('2022-11-20T18:25:32.000Z'),
                  updatetime: new Date('2022-11-20T18:25:32.000Z'),
                  type: {
                    id: 6,
                    name: 'dfg',
                    createtime: new Date('2022-11-20T18:14:34.000Z'),
                    updatetime: new Date('2022-11-20T18:14:34.000Z'),
                  },
                },
              ]}
            />
          );
        })}
      </div>
    </>
  );
};
