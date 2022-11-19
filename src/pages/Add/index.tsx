import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import AffairList from '../../components/AffairList';
import './index.css';

interface P {}

export default (props: P) => {
  const params = useParams();
  const navigate = useNavigate();
  const mylocation = useLocation();

  // let currentId: string = params.id as string;

  useEffect(() => {
    // document.title = '';
  }, []);

  return <>
    <div>
      <div>
        <AffairList affairs={[]}></AffairList>
      </div>
      <div>
        <div>
          <form>
            
          </form>
        </div>
      </div>
    </div>
  </>;
};
