import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from '../Slice/AuthSlice'; 

const persistConfig = {
  key: 'root',  
  storage,      
};

const persistedReducer = persistReducer(persistConfig, AuthReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,  
  },
});

const persistor = persistStore(store);

export { store, persistor };
