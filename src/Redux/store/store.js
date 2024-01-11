import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import {createStore} from 'redux';
import {rootReducer} from '../Reducer/mainReducer';
import createTransform from 'redux-persist/es/createTransform';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import Flatted from 'flatted';


export const transformCircular = createTransform(
  (inboundState, key) => Flatted.stringify(inboundState),
  (outboundState, key) => Flatted.parse(outboundState),
)

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  transforms: [transformCircular]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
