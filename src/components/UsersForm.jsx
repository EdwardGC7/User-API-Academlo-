import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'


const defaultValue = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  birthday: ''
}


const UsersForm = ({isActive, createNewUser, setActive, title, updateInfo, getAllUsers}) => {
  const { register, handleSubmit, reset } = useForm()

  const submit = data => {
    try {
      if (updateInfo) {
        const url = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`;
        axios.put(url, data)
        .then(res => {
          getAllUsers()
          reset(defaultValue)
          setActive(false)
        })
        .catch(err => console.log(err))
  
      } else {
        createNewUser(data)
        reset(defaultValue)
        setActive(false)
      }
    } catch (error) {
      alert('Make sure the email is not already in use')
    }
  }

  useEffect(() => {
    if (updateInfo) {
      reset(updateInfo)
    }
  
  }, [updateInfo])
  


  return (
    <div className={`form-content ${isActive ? null: 'translate'}`}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit(submit)}>
        <div>
        <label htmlFor='first_name'>Firs name: </label>
        <input {...register('first_name')} type="text" id='first_name' />
        </div>

        <div>
        <label htmlFor='last_name'>Last name: </label>
        <input {...register('last_name')} type="text" id='last_name' />
        </div>

        <div>
        <label htmlFor='email'>Email: </label>
        <input {...register('email')} type="text" id='email' />
        </div>

        <div>
        <label htmlFor='password'>Password: </label>
        <input {...register('password')} type="password" id='password' />
        </div>

        <div>
        <label htmlFor='birthday'>Birthday: </label>
        <input {...register('birthday')} type="text" id='birthday' />
        </div>

        <button>Submit</button>
        
      </form>
    </div>
  )
}

export default UsersForm