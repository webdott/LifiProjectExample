import RouterComp from './route/public';
import './@azuroConfig/@azuro.config';

import './App.css';
import 'antd/dist/antd.css';

import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;
function App() {
  return (
    <div className='App'>
      <RouterComp />
    </div>
  );
}

export default App;
