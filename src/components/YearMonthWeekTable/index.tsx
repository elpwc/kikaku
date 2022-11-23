import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { YearRecord } from '../../utils/Record';
import { range } from '../../utils/tools';
import './index.css';
import { YearMonthWeekTableColumn } from './YearMonthWeekTableColumn';

interface P {
  drag: boolean;
  dragHoverId: string;
  children: YearRecord[] | null;
  onDelete: () => void;
}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const [firstYear, setfirstYear] = useState(2022);
  const [lastYear, setlastYear] = useState(2024);

  // let currentId: string = params.id as string;

  useEffect(() => {
    // document.title = '';
    let latestYear = 0;
    props.children?.forEach(yearRecord => {
      if (yearRecord.year > latestYear) {
        latestYear = yearRecord.year;
      }
    });

    if (latestYear > 2024) {
      setlastYear(latestYear);
    }
  }, [props.children]);

  return (
    <div className="flex border border-gray-300 mx-10 bg-white rounded-lg shadow-lg overscroll-x-auto" style={{ overflowX: 'scroll' }}>
      {range(firstYear, lastYear + 1).map(head => {
        return (
          <YearMonthWeekTableColumn
            head={head.toString()}
            content={
              props.children
                ? props.children?.filter((yearRecord: YearRecord) => {
                    return yearRecord.year === head;
                  })
                : []
            }
            dragHover={props.dragHoverId === 'table_' + head}
            isRightColumn={false}
            onDelete={props.onDelete}
          />
        );
      })}
      <YearMonthWeekTableColumn
        isRightColumn={true}
        onRightColumnClick={() => {
          setlastYear(lastYear + 1);
        }}
      />
    </div>
  );
};
