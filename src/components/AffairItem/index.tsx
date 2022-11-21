import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/affairListState';

interface Props {
  children: Affair;
  state: AffairListState;
}

export default (props: Props) => {
  const [fontColor, setfontColor] = useState('text-black');
  const [editButtonVisibility, seteditButtonVisibility] = useState(false);

  useEffect(() => {
    switch (props.state) {
      case AffairListState.Important:
        setfontColor('text-red-900');
        break;
      case AffairListState.Planning:
        setfontColor('text-white');
        break;
      case AffairListState.OutsidePlan:
        setfontColor('text-gray-700');
        break;
      case AffairListState.Default:
        setfontColor('text-black');
        break;
      default:
        setfontColor('text-black');
        break;
    }
  }, [props.state]);

  return (
    <div
      onMouseEnter={() => {
        seteditButtonVisibility(true);
      }}
      onMouseLeave={() => {
        seteditButtonVisibility(false);
      }}
      className={
        'AffairItem text-normal text-center px-3 py-2 m-3 rounded transition-all cursor-move flex ' +
        fontColor +
        (() => {
          switch (props.state) {
            case AffairListState.Important:
              return ' font-bold bg-red-400 ring ring-red-200 hover:bg-red-300';
            case AffairListState.Planning:
              return ' bg-green-400 ring ring-green-300';
            case AffairListState.OutsidePlan:
              return ' bg-gray-400 ring ring-gray-300';
            case AffairListState.Default:
              return ' bg-white ring ring-gray-300';
            default:
              return '';
          }
        })()
      }
    >
      <div className="w-full">{props.children.name}</div>
      <div className="" style={{}}>
        <Link to={'/add/' + props.children.id}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all"
            style={{ width: editButtonVisibility ? '16px' : '0', height: editButtonVisibility ? '16px' : '0' }}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path
              fillRule="evenodd"
              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
