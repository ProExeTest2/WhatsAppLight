import React from 'react';
import Routes from './src/navigation/routes';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/Redux/store/store';
import CommanMessage from './src/components/common/CommanMessage';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <MenuProvider>
            <Routes />
            <CommanMessage />
          </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
