import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import YearMonthWeekPageFramework from '../../components/YearMonthWeekPageFramework';
import { RecordType } from '../../utils/enums';
import './index.css';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  let currentYear: string = params.year as string;

  useEffect(() => {
    document.title = 'Kikaku - 总体规划';
  }, []);

  return <YearMonthWeekPageFramework type={RecordType.year} />;
};
