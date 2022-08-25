import {useState} from 'react';
import {useCookies} from 'react-cookie';
import { KJUR } from 'jsrsasign';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [protectedData, setProtectedData] = useState();
  const [, setCookie] = useCookies(["awth-token"]);

  const email = 'eric.ly@arcticwolf.com'
  const audience = 'https://api.arcticwolf.com/'
  const scope = 'test-auth0'

  const sHeader = JSON.stringify({ alg: 'HS256', typ: 'JWT' });
  const sPayload = JSON.stringify({
    'https://rtkwlf.io/email': email, // This non-standard claim contains the email address of the user to which the token was issued.
    iss: 'https://awn-sandbox.auth0.com/', // the issuer of the token
    sub: email, // the subject to which the token was issued
    aud: audience, // the audience for which the token is valid
    iat: KJUR.jws.IntDate.get('now'), // the time at which the token was issued
    exp: KJUR.jws.IntDate.get('now + 1day'), // the time at which the token expires
    scope,
  });
  const sJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, 'skittles');
  console.log(sJWT);

  setCookie('awth-token', sJWT);

  const fetchProtectedData = async () => {
    await fetch('/protected')
      .then(response => response.json())
      .then(json => {
        setProtectedData(json);
        console.log(json)
      });
  }

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
            <button data-testid='public-button' onClick={() => fetchData()}>
              Hit endpoint
            </button>
            <p data-testid='id'>Id: {data.id}</p>
            <p data-testid='title'>Title: {data.title}</p>
            <p data-testid='userId'>UserId: {data.userId}</p>
            <button data-testid='protected-button' onClick={() => fetchProtectedData()}>
              Hit protected endpoint
            </button>
            {protectedData ? <p data-testid='protected-data'>{protectedData}</p> : null}
          </div> : null}
      </div>
    </div>
  );
}

export default App;
