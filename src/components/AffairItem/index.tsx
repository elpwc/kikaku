import { Affair } from '../../utils/Affair';

interface Props {
  affair: Affair;
}

export default (props: Props) => {
  return <div className="AffairItem text-sm">{props.affair.name}</div>;
};
