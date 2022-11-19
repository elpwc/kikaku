import { Affair } from '../../utils/Affair';

interface Props {
  affair: Affair;
}

export default (props: Props) => {
  return <div className="AffairItem">{props.affair.name}</div>;
};
