import { Link } from 'react-router-dom';

interface Props {
  children: string | JSX.Element | null;
  to: string;
  checked?: boolean;
  onClick?: () => void;
}

export const MenuItem = (props: Props) => {
  return (
    <Link
      to={props.to}
      style={{ color: '#000', textDecorationLine: 'none', borderBottom: props.checked ? 'solid 1px red' : '' /*fontFamily: 'ZCOOL KuaiLe'*/ }}
      className="px-5 py-2 transition-all hover:bg-gray-200 active:bg-gray-300 text-md"
      onClick={props.onClick}
    >
      {props.children}
    </Link>
  );
};
