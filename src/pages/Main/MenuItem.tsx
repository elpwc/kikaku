import { Link } from 'react-router-dom';

interface Props {
  children: string | JSX.Element | null;
  to: string;
}

export const MenuItem = (props: Props) => {
  return (
    <div className='MainMenuItem'>
      <Link to={props.to} style={{ color: '#000', textDecorationLine: 'none' }}>
        {props.children}
      </Link>
    </div>
  );
};
