import styles from './index.css';
import Navbar from './Navbar/index';
import Body from './Body/Body';

const BasicLayout = (props) => {

  return (
    <div className={styles.normal}>
      <Navbar/>
      <Body children={props.children}/>
    </div>
  );
}

export default BasicLayout;
