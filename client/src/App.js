import {useState, useEffect} from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/users')
    .then(res => res.json())
    .then(data => setUsers([...data]))
  }, [])

  return (
    <div className="App">
      {users.map(user => <div key={user._id}>{user.name}</div>)}
    </div>
  );
}

export default App;
