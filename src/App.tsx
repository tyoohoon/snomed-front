import './App.scss';
import MainScreen from './screens/MainScreen';
import AppNavBar from './components/AppNavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const theme = createTheme({
    typography: {
      allVariants: {
        fontFamily: 'Noto Sans Thai',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '12px',
        lineHeight: '14px',
      },
    },
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: 'Noto Sans Thai',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: '12px',
            lineHeight: '14px',
          }
        }
      }
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AppNavBar />
        <MainScreen />
      </ThemeProvider>
    </div>
  );
}

export default App;
