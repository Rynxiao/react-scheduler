import React from 'react';
import ReactDOM from 'react-dom';

import Scheduler from '.';

const App = () => (
  <div className="App" style={{ width: '100%', height: '100%' }}>
    <Scheduler />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
