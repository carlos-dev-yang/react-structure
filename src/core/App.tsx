import { Button } from '@components/button/Button';
import React from 'react';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">Learn React</header>
      <Button onClick={() => console.log('click button')}>testButton</Button>
    </div>
  );
}

export default App;
