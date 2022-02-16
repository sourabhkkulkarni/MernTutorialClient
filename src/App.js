
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/readdata')
      .then((res) => {
        console.log("res", res.data);
        setFriends(res.data);
      })
      .catch((err) => {
        alert(err)
      })
  }, []);

  const handleAddFriend = () => {
    axios.post('http://localhost:3001/addFriend', {
      name: name,
      age: age,
    }).then(() => {
      // this is to dispaly data immediatly after adding
      setFriends([...friends, { name: name, age: age, }])
    })
  }

  const handleUpdate = (id) => {
    const newAge = prompt("Enter new age");
    axios.put('http://localhost:3001/update', {
      newAge: newAge, id: id
    })
      .then(() => {
        setFriends(friends.map((val) => {
          return val._id === id ? { _id: id, name: val.name, age: newAge } : val
        }));
      })

  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(()=>{
      setFriends(friends.filter((val)=>{
        return val._id !== id
      }))
    })
  }

  return (
    <div className="App">

      <div className="inputs">
        <input type="text" placeholder='Name...' onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder='Age...' onChange={(e) => setAge(e.target.value)} />
        <button onClick={handleAddFriend}>Add friend</button>
      </div>
      <div className='listOfFriends'>
        {friends.map((val) => {
          return (
            <div className='friendContainer'>
              <div className='friend'>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
              </div>
              <div></div>
              <button onClick={() => { handleUpdate(val._id) }}>Update</button>
              <button id='removeButton' onClick={() => { handleDelete(val._id) }}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>

  );
}

export default App;
