import React from 'react';
import ReactDOM from 'react-dom';

import Scheduler from '.';

const App = () => (
  <div className="App">
    <Scheduler />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
