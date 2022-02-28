import React, { useState, useEffect } from 'react';
import { User, getUsers, saveUser } from '../api';
import { getUserType } from './Form';
import moment from 'moment';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const AddUser: React.FunctionComponent = ({ }) => {
    const location = useLocation()
    const state = location.state as Array<User>
    const navigate = useNavigate()
    const [data, setData] = useState<Array<User>>([])
    const [user, setUser] = useState({
        name: '',
        sureName: '',
        userType: '',
        date: moment(new Date()).format("MM/DD/YYYY"),
        city: '',
        adress: ''
    })
    useEffect(() => {
        setData(state)
    }, [state])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>): any => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const onSave = (ev: any): void => {
        ev.preventDefault()

        saveUser(user).then(() => navigate('/'))
    }
    return (
        <div>
            <div><p>Add user</p></div>
            <form className="addForm">
                <label className='labelForm'>Name:</label>
                <input className="inputForm" name='name' type="text" value={user.name} required={!user.name ? true : false} onChange={handleChange} />
                <label className='labelForm'>Surename:</label>
                <input className="inputForm" name='sureName' type="text" value={user.sureName} required onChange={handleChange} />
                <label className='labelForm'>User type:</label>
                <select className='select' name='userType' value={user.userType} required onChange={handleChange}>
                    <option className='select' key="default" value=''>Choose type...</option>
                    {getUserType(data).map((typeUser, i) => <option className='select' key={`${i}`} value={typeUser}>{typeUser}</option>)}
                </select>
                <label className='labelForm'>City:</label>
                <input className="inputForm" name='city' type="text" value={user.city} onChange={handleChange} />
                <label className='labelForm'>Adress:</label>
                <input className="inputForm" name='adress' type="text" value={user.adress} onChange={handleChange} />
                <div className='buttons'>
                    <button className='btnSaveAdd' type="submit" disabled={!(user.userType && user.name && user.name && user.sureName && user.date)} onClick={onSave}>Save</button>
                    <Link to='/'>
                        <button className='btnBack' type="submit">Back</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default AddUser