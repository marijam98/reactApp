import React, { useState, useEffect } from 'react';
import {  TextField, Stack, DefaultButton, PrimaryButton} from '@fluentui/react'
import { User, getUser, saveEditData } from '../api';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Message from './Message';

const EditUser: React.FunctionComponent = () => {
    const isEqual = require("react-fast-compare");

    const [user, setUser] = useState<User | null>(null)
    const [original, setOriginal] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getUser(id).then(data => {
                setOriginal(data)
                setUser(data)
            }).catch(e => console.log("ERROR", e))
        }
    }, [id]);

    const handleChangeName = (e: string ): any => {
        setUser({
                ...user,
                name: e,

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
    const handleChangeDate = (e:string ): any => {
        setUser({
            ...user,
            date: e
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
    const onSave = (): void => {
        if (id && user) {
            saveEditData(id, user).then(() => navigate('/'))
        }
    }

    return (
        <Stack  tokens={{ padding: 20, childrenGap: 10 }} >
            {Object.keys(user ? user : 0).length === 0 ? <Message /> :
            <Stack  tokens={{ padding: 20, childrenGap: 10 }} >
            <Stack>
                   <TextField 
                   label="Name:" 
                   type="text" 
                   value={user ? user.name : ''} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                    console.log('val', value)
                    return value !== undefined && handleChangeName(value)}} />
            </Stack>
            <Stack>
                   <TextField 
                   label="Surename:" 
                   type="text" 
                   value={user ? user.sureName : ''} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                    console.log('val', value)
                    return ( value !== undefined  ) && handleChangeSureName(value)}} />
            </Stack>
            <Stack>
                   <TextField 
                   label="User type:" 
                   type="text" 
                   value={user ? user.userType : ''} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                    console.log('val', value)
                    return value !== undefined && handleChangeUsertype(value)}} />
            </Stack>
            <Stack>
                   <TextField 
                   label="Created at:" 
                   type="date" 
                   value={user ? user.date : ''} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                    console.log('val', value)
                    return value !== undefined && handleChangeDate(value)}} />
            </Stack>
            <Stack>
                   <TextField 
                   label="City:" 
                   type="text" 
                   value={user ? user.city : ''} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                    console.log('val', value)
                    return value !== undefined && handleChangeCity(value)}} />
            </Stack>
            <Stack>
                   <TextField 
                   label="Adress:" 
                   type="text" 
                   value={user ? user.adress : ''} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                    console.log('val', value)
                    return value !== undefined && handleChangeAdress(value)}} />
            </Stack>
            <Stack horizontal tokens={{ padding: 20, childrenGap: 10 }} >
                    <PrimaryButton text="Save" onClick={onSave} allowDisabledFocus disabled={isEqual(user, original)} />
                    <Link to='/'>
                        <DefaultButton text="Back"  allowDisabledFocus />
                    </Link>
                </Stack>
            </Stack>
}
        </Stack>
    )
}

export default EditUser
            