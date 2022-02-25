import styles from './index.css';
import Navbar from './Navbar/';
import Body from './Body/';
import Login from '../pages/Login/Login';
import {AuthProvider} from "../Context/AuthContext";

const BasicLayout = (props) => {

  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
     
    // <div className={styles.normal}>
    //   {/* If login true: <Login /> */}
    //   {/* !login : <> <Navbar /> <Body /> </> */}
     
    //   {/* <Navbar/>
    //   <Body children={props.children}/> */}
    // </div>
  );
}

export default BasicLayout;
