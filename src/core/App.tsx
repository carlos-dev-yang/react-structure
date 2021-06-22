import React from 'react';
import * as Redux from 'react-redux';

import store from './store';
import Routes from '@src/routes/Routes';

function App(): React.ReactElement {
  return (
    <Redux.Provider store={store}>
      <div className="App">
        <Routes />
      </div>
    </Redux.Provider>
  );
}

export default App;
