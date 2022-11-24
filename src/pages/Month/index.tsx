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

  useEffect(() => {
    setcurrentYear(Number(currentParams.year as string));
  }, [currentParams]);

  useEffect(() => {
    document.title = 'Kikaku - ' + currentYear + '年的规划';
  }, [currentYear]);

  return <YearMonthWeekPageFramework type={RecordType.month} info={{ year: currentYear }} />;
};
