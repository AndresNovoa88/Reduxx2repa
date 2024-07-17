

import { configureStore } from "@reduxjs/toolkit";
import reducers from './reducers';

const store=configureStore({
    reducer:{
        holaAPP:reducers
    }
});

export default store;