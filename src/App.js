import {useState} from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});

  const fetchData = async () => await fetch('/todos/1')
    .then(response => response.json())
    .then(json => {
      setData(json);
      console.log(json)
    });

  return (
    <div className="App">
      <div>
        {data ?
          <div className='App-header'>
            <button onClick={() => fetchData()}>
              Hit endpoint
            </button>
            <p data-testid='id'>Id: {data.id}</p>
            <p data-testid='title'>Title: {data.title}</p>
            <p data-testid='userId'>UserId: {data.userId}</p>
          </div> : null}
      </div>
    </div>
  );
}

export default App;
