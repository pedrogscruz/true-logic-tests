import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';

const API = 'https://jsonplaceholder.typicode.com/users';

type User = {
  "id": 1,
  "name": String;
  "username": String;
  "email": String;
  "address": {
    "street": String;
    "suite": String;
    "city": String;
    "zipcode": String;
    "geo": {
      "lat": String;
      "lng": String;
    }
  },
  "phone": String;
  "website": String;
  "company": {
    "name": String;
    "catchPhrase": String;
    "bs": String;
  }
}

let debouncing: NodeJS.Timeout;

type UsersFetched = { current: User[] };

function App() {
  let usersFetched: UsersFetched = {current: []};
  const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
    fetch(API)
      .then(response => response.json())
      .then((result) => {
        console.log(JSON.stringify(result));
        usersFetched.current = result;
        setUsers(result);
      });
  }, []);

  const handleFilterChange = useCallback((e) => {
    clearTimeout(debouncing);
    debouncing = setTimeout(() => {
      if (e.target.value === '')
        setUsers(usersFetched.current);
      else {
        const lowerCaseValue = e.target.value.toLowerCase();
        setUsers(() => (
          usersFetched.current.filter(({ name }) => name.toLowerCase().includes(lowerCaseValue))
        ));
      }
    }, 200);
  }, []);
  
  return (
    <div className="App">
      <input type='text' onChange={handleFilterChange} />
      {users.map((user) => (
        <div key={user.id} className={css(styles.item)}>
          <div className={css(styles.name)}>{user.name}</div>
          <div className={css(styles.email)}>{user.email}</div>
        </div>
      ))}
    </div>
  );
}

const styles= StyleSheet.create({
  item: {
    padding: '10px'
  },
  name: {
    color: 'black',
    fontSize: '12pt' 
  },
  email: {
    color: 'gray',
    fontSize: '10pt',
    marginTop: '3px'
  }
})

export default App;
