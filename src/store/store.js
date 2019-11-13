import { createStore } from 'redux'
import { persistStore } from 'redux-persist';

import reducer from './reducers/_root'

export default (() => {
    const store = createStore(
        reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    let persistor = persistStore(store)
    return { store, persistor }
})()