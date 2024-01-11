import { View, Text } from 'react-native'
import React from 'react'
import Routes from './src/navigation/routes'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { persistor, store } from './src/Redux/store/store';
import SplasScreen from './src/screens/splash/SplasScreen';
import { ThemeProvider } from './src/helper/themeHelper';
import { colors } from './src/helper';
const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate persistor={persistor}>
          <Routes/>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  )
}

export default App