import styles from './index.css';
import Navbar from './Navbar';
import Body from './Body';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { Suspense } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D4D47',
    },
  },
});

const BasicLayout = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.layout}>
        <Suspense fallback="Loading...">
          <I18nextProvider i18n={i18n}>
            <Navbar />
            <Body children={props.children} />
          </I18nextProvider>
        </Suspense>
      </div>
    </ThemeProvider>
  );
};

export default BasicLayout;
