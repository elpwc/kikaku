import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/affairListState';

interface Props {
  children: Affair;
  state: AffairListState;
}

export default (props: Props) => {
  return (
    <div
      className={
        'AffairItem text-normal px-8 py-3 m-3 rounded   ' +
        (() => {
          switch (props.state) {
            case AffairListState.Important:
              return 'text-white bg-red-500 ring ring-red-300';
            case AffairListState.Planning:
              return 'text-white bg-green-500 ring ring-green-300';
            case AffairListState.OutsidePlan:
              return 'text-gray-700 bg-gray-400 ring ring-gray-300';
            case AffairListState.Default:
              return 'text-black bg-white ring ring-gray-300';
            default:
              return '';
          }
        })()
      }
    >
      {props.children.name}
    </div>
  );
};
