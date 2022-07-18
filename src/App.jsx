import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

const bg = ["https://img.freepik.com/premium-photo/programming-code-abstract-technology-background-software-developer-computer-script_34663-31.jpg?w=740"]

function App() {
  const [showForm, setShowForm] = useState(false)

  const [users, setUsers] = useState([])

  const [userSelected, setUserSelected] = useState(null)

  useEffect(() => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }, [])

  const getUsers = () => {
    axios.get("https://users-crud1.herokuapp.com/users/")
      .then(res => setUsers(res.data))
  }

  const selectUser = user => {
    setUserSelected(user)
    setShowForm(!showForm)
  }

  const deleteUser = user => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}`)
      .then(() => {
        getUsers()
      })
  }

  const deselectUser = () => setUserSelected(null);

  console.log(users)

  document.body.style = `background-image: url(${bg[0]});
    background-size: 100%;
    background-repeat: no-repeat;
    `


  return (
    <div className="App">
      {showForm ? <UsersForm showForm={showForm} setShowForm={setShowForm} deselectUser={deselectUser} userSelected={userSelected} getUsers={getUsers}/> : ""}
      {showForm ? "" : <button onClick={() => setShowForm(!showForm)} className="btn btn-primary btn-block mb-4"> Create User</button>}
      
      
      <div>
        <UsersList deleteUser={deleteUser} selectUser={selectUser} users={users} />
      </div>
    </div>
  )
}

export default App
