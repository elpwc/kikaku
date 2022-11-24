import { Link } from 'react-router-dom';

interface Props {
  children: string | JSX.Element | null;
  to: string;
}

export const MenuItem = (props: Props) => {
  return (
    <Link to={props.to} style={{ color: '#000', textDecorationLine: 'none' }} className="px-5 py-2 transition-all hover:bg-gray-200 active:bg-gray-300">
      {props.children}
    </Link>
  );
};
