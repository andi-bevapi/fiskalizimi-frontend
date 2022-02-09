import styles from './index.css';

const BasicLayout = (props) => {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Fiskalizimi</h1>
      {props.children}
    </div>
  );
}

export default BasicLayout;
