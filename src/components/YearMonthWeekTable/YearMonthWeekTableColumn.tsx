import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/affairListState';
import AffairItem from '../AffairItem';
import AffairList from '../AffairList';

export const YearMonthWeekTableColumn = (props: { head: string; content: Affair[] }) => {
  return (
    <div className="border-r border-gray-300">
      <div className='border-b border-gray-300 flex justify-center items-center h-10'>{props.head}</div>
      <div>
        <AffairList state={AffairListState.Default}>{props.content}</AffairList>
      </div>
    </div>
  );
};
