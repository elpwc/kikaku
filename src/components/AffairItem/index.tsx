import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Affair } from '../../utils/Affair';
import { AffairListState } from '../../utils/enums';
import { YearRecord } from '../../utils/Record';
import './index.css';

interface Props {
  children: Affair;
  state: AffairListState;
  className?: string;
  style?: React.CSSProperties;
  editable?: boolean;
  draggable?: boolean;
  deletable?: boolean;
  onDelete?: (affair?: Affair, record?: YearRecord) => void;
  record?: YearRecord;
}

export default (props: Props) => {
  const [fontColor, setfontColor] = useState('text-black');
  const [editButtonVisibility, seteditButtonVisibility] = useState(false);
  const [deleteButtonVisibility, setdeleteButtonVisibility] = useState(false);

  useEffect(() => {
    switch (props.state) {
      case AffairListState.PlanningImportant:
        setfontColor('text-red-900');
        break;
      case AffairListState.OutsidePlanImportant:
        setfontColor('text-red-700');
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
        if (props.editable === undefined ? true : props.editable) {
          seteditButtonVisibility(true);
        }
        if (props.deletable === undefined ? true : props.deletable) {
          setdeleteButtonVisibility(true);
        }
      }}
      onMouseLeave={() => {
        seteditButtonVisibility(false);
        setdeleteButtonVisibility(false);
      }}
      style={props.style}
      className={
        'AffairItem text-normal text-center px-3 py-2 m-3 rounded transition-all flex ' +
        (props.draggable ? 'cursor-grab' : '') +
        props.className +
        fontColor +
        (() => {
          switch (props.state) {
            case AffairListState.PlanningImportant:
              return ' font-bold bg-red-400 ring ring-red-200 hover:bg-red-300';
            case AffairListState.OutsidePlanImportant:
              return ' font-bold bg-gray-400 ring-gray-300 hover:bg-red-300';
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
      <div className="w-full">{props.children?.name}</div>
      <div className="" style={{}}>
        <Link to={'/add/' + props.children?.id}>
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

      <div style={{ position: 'absolute', right: '-5px', top: '-5px' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all text-red-500 cursor-pointer"
          style={{ width: deleteButtonVisibility ? '16px' : '0', height: deleteButtonVisibility ? '16px' : '0' }}
          fill="currentColor"
          viewBox="0 0 16 16"
          onClick={() => {
            if (props.children) {
              props.onDelete?.(props.children, props.record);
            }
          }}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      </div>
    </div>
  );
};
