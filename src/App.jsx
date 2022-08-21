import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'

function App() {
  
  const [users, setUsers] = useState()
  const [isActive, setActive] = useState(false)
  const [title, setTitle] = useState('New User')
  const [updateInfo, setUpdateInfo] = useState()


  const getAllUsers = () => {
    const url = 'https://users-crud1.herokuapp.com/users/';
    axios.get(url)
    .then((res)=>{setUsers(res.data)})
    .catch((err)=>{console.log(err)})
  }
  useEffect(() => {
    getAllUsers();
  }, [])


  const createNewUser = data => {
    const url = 'https://users-crud1.herokuapp.com/users/';

    axios.post(url, data)
    .then(res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

  const callFormCreate = ()=>{
    setTitle('New User');
    toggleClass(); 
  }

  const toggleClass = () => {
    setActive(!isActive);
  };
 
  return (
    <div>
      <div className={`container ${isActive ? 'hide': null}`} ></div>

      <UsersForm isActive={isActive} createNewUser={createNewUser} setActive={setActive} title={title} updateInfo={updateInfo} getAllUsers={getAllUsers}/>
      
        <div className="cards">
        {
        users?.map((user) => {
          return <UsersList key={user.id} user={user} toggleClass={toggleClass} setTitle={setTitle} setUpdateInfo={setUpdateInfo} getAllUsers={getAllUsers}/>
          })
        }
        </div>
        <div className='create-btn' onClick={callFormCreate}>{isActive ? 'Cancel': 'Create'}</div>
      
    </div>
  )
}

export default App
