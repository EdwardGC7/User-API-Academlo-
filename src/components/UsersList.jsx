import React from 'react'
import deleteImg from '../assets/delete.png'
import pencilImg from '../assets/pencil.png'
import axios from 'axios'

const UsersList = ({user, toggleClass, setTitle, setUpdateInfo, getAllUsers}) => {

  const callFormUpdate = ()=>{
    setUpdateInfo(user);
    setTitle('Update User');
    toggleClass();
  }

  const deleteUser = ()=> {
    const url = `https://users-crud1.herokuapp.com/users/${user.id}/`;
    axios.delete(url)
	  .then(res => {
      getAllUsers()
    })
	  .catch(error => console.log(error));
  }

  return (
    <div className='card'>
      <div className='card-info'>
        <h2>{`${user.first_name} ${user.last_name}`}</h2>
        <p>{user.email}</p>
        <h5>&#127874; {user.birthday}</h5>
      </div>
      <div className='card-icons'>
        <div>
          <img src={deleteImg} alt="delete image" onClick={deleteUser}/>
          <img src={pencilImg} alt="edit image" onClick={callFormUpdate}/>
        </div>
      </div>
    </div>
  )
}

export default UsersList