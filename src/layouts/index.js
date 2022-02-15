import styles from './index.css';
import Navbar from './Navbar/';
import Body from './Body/';

const BasicLayout = (props) => {

  return (
    <div className={styles.normal}>
      <Navbar/>
      <Body children={props.children}/>
    </div>
  );
}

export default BasicLayout;
