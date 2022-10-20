import React, { useState, useEffect } from 'react';
import {  TextField, Stack, IDropdownOption, DefaultButton, PrimaryButton, Dropdown} from '@fluentui/react'
import { User, saveUser } from '../api';
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

    const onSave = (ev: any): void => {
        ev.preventDefault()

        saveUser(user).then(() => navigate('/'))
    }

    const handleChangeName = (e:string ): any => {
        setUser({
            ...user,
            name: e
        })
    }
    const handleChangeSureName = (e:string ): any => {
        setUser({
            ...user,
            sureName: e
        })
    }
    const handleChangeUsertype = (e:string ): any => {
        setUser({
            ...user,
            userType: e
        })
    }
    const handleChangeCity = (e:string ): any => {
        setUser({
            ...user,
            city: e
        })
    }
    const handleChangeAdress = (e:string ): any => {
        setUser({
            ...user,
            adress: e
        })
    }
    const userOptions: IDropdownOption[] = 
        getUserType(data).map((user, i) => ({
            key: i,
            text: user,
        }))

    return (
        <Stack  tokens={{ padding: 20, childrenGap: 10 }} >
            <Stack>
                   <TextField 
                   label="Name:" 
                   placeholder="Type name..." 
                   type="text" 
                   value={user.name} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                    console.log('val', value)
                    return value !== undefined && handleChangeName(value)}} />
            </Stack>
            <Stack>
                   <TextField 
                   label="Surename:" 
                   placeholder="Type surename..." 
                   type="text" 
                   value={user.sureName} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                       console.log('val', value)
                       return value !== undefined && handleChangeSureName(value)}} />
            </Stack>
            <Stack >
                    <Dropdown
                     placeholder="Choose type" 
                     label="Filter by user type"
                     onChange={(_, option) =>  option !== undefined && handleChangeUsertype(option.text)}
                     options={userOptions}
                     styles={ {  root: {   width: 285  } } }
                     />
                </Stack>
                <Stack>
                   <TextField 
                   label="City:" 
                   placeholder="Type city..." 
                   type="text" 
                   value={user.city} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                       console.log('val', value)
                       return value !== undefined && handleChangeCity(value)}} />
            </Stack>
            <Stack>
                   <TextField 
                   label="Adress:" 
                   placeholder="Type adress..." 
                   type="text" 
                   value={user.adress} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                       console.log('val', value)
                       return value !== undefined && handleChangeAdress(value)}} />
            </Stack>
            <Stack horizontal tokens={{ padding: 20, childrenGap: 10 }} >
                    <PrimaryButton text="Save" onClick={onSave} allowDisabledFocus disabled={!(user.userType && user.name && user.name && user.sureName && user.date)} />
                    <Link to='/'>
                        <DefaultButton text="Back"  allowDisabledFocus />
                    </Link>
                </Stack>
                </Stack>
    )
}

export default AddUser