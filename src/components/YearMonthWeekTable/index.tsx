import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { RecordType } from '../../utils/enums';
import { RecordExtend } from '../../utils/Record';
import { getWeeksCount } from '../../utils/time';
import { range } from '../../utils/tools';
import './index.css';
import { YearMonthWeekTableColumn } from './YearMonthWeekTableColumn';

interface P {
  drag: boolean;
  dragHoverId: string;
  children: RecordExtend[] | null;
  onDelete: () => void;
  type: RecordType;
  info?: {
    year: number;
    month?: number;
    week?: number;
  };
}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const [firstYMW, setfirstYMW] = useState(1);
  const [lastYMW, setlastYMW] = useState(1);

  // let currentId: string = params.id as string;

  // 获取有数据的最靠後的年份
  const getLastYear = (): number => {
    let latestYMW = 0;
    let defaultLastYear = 2024;
    props.children?.forEach(yearRecord => {
      if (yearRecord.year > latestYMW) {
        latestYMW = yearRecord.year;
      }
    });

    if (latestYMW > defaultLastYear) {
      return latestYMW;
    }
    return defaultLastYear;
  };

  useEffect(() => {
    switch (props.type) {
      case RecordType.year:
        setfirstYMW(2022);
        setlastYMW(getLastYear());
        break;
      case RecordType.month:
        setfirstYMW(1);
        setlastYMW(12);
        break;
      case RecordType.week:
        setfirstYMW(1);
        setlastYMW(getWeeksCount(props.info?.year ?? 2022, props.info?.month ?? 1));
        break;
      case RecordType.day:
        setfirstYMW(0);
        setlastYMW(6);
        break;
    }
  }, [props.info, props.type]);

  useEffect(() => {
    // document.title = '';
    if (props.type === RecordType.year) {
      setlastYMW(getLastYear());
    }
  }, [props.children, props.type]);

  return (
    <div className="flex border border-gray-300 mx-10 bg-white rounded-lg shadow-lg overscroll-x-auto" style={{ overflowX: 'scroll' }}>
      {props.type === RecordType.day && <YearMonthWeekTableColumn columnType={2} />}
      {range(firstYMW, lastYMW + 1).map(head => {
        return (
          <YearMonthWeekTableColumn
            key={head}
            head={head.toString()}
            content={
              props.children
                ? props.children?.filter((record: RecordExtend) => {
                    switch (props.type) {
                      case RecordType.year:
                        return record.year === head;
                      case RecordType.month:
                        // @ts-ignore
                        return record.month! === head;
                      case RecordType.week:
                        // @ts-ignore
                        return record.week! === head;
                      case RecordType.day:
                        // @ts-ignore
                        return record.day! === head;
                      default:
                        return false;
                    }
                  })
                : []
            }
            dragHover={props.dragHoverId === 'table_' + head}
            columnType={0}
            onDelete={props.onDelete}
            type={props.type}
            info={props.info}
          />
        );
      })}
      {props.type === RecordType.year && (
        <YearMonthWeekTableColumn
          columnType={1}
          onRightColumnClick={() => {
            setlastYMW(lastYMW + 1);
          }}
        />
      )}
    </div>
  );
};
