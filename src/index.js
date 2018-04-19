import 'core-js/fn/object/entries';
import 'core-js/fn/object/values';
import 'core-js/fn/array/find';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
