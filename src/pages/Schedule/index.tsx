import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import YearMonthWeekPageFramework from '../../components/YearMonthWeekPageFramework';
import { RecordType } from '../../utils/enums';
import './index.css';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  const currentParams = params;

  const [currentYear, setcurrentYear] = useState(Number(params.year as string));
  const [currentMonth, setcurrentMonth] = useState(Number(params.month as string));
  const [currentWeek, setcurrentWeek] = useState(Number(params.week as string));

  useEffect(() => {
    setcurrentYear(Number(currentParams.year as string));
    setcurrentMonth(Number(currentParams.month as string));
    setcurrentWeek(Number(currentParams.week as string));
  }, [currentParams]);

  useEffect(() => {
    document.title = 'Kikaku - ' + currentYear + '年' + currentMonth + '月第' + currentWeek + '周的规划';
  }, [currentYear]);

  return <YearMonthWeekPageFramework type={RecordType.day} info={{ year: currentYear, month: currentMonth, week: currentWeek }} />;
};
