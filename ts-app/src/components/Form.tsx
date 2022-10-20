import React from "react";
import {  TextField, Stack, IDropdownOption, DefaultButton, PrimaryButton, Dropdown, IIconProps} from '@fluentui/react'
import { IconButton } from '@fluentui/react/lib/Button';
import { User } from '../api';
import {  useNavigate } from 'react-router-dom'

type Props = {
    data: Array<User>,
    name: string | undefined,
    date: string | undefined,
    userType: string | undefined,
    filterUsers: () => void,
    clearFilter: () => void,
    changeName: (e: string) => void,
    changeUserType: (e: string) => void,
    changeDate: (e: string) => void,
}

export const getUserType = (data: Array<User>): Array<string> => {
    return data.reduce((typeUsers: Array<string>, user: User) => {
        if (!typeUsers.includes(user.userType || '')) {
            typeUsers.push(user.userType || '')
            return typeUsers
        } else {
            return typeUsers
        }
    }, [])
}


const Form: React.FunctionComponent<Props> = ({ data, name, userType, filterUsers, clearFilter, changeName, changeUserType, changeDate }) => {
    const navigate = useNavigate()

    const userOptions: IDropdownOption[] = 
        getUserType(data).map((user, i) => ({
            key: i,
            text: user,
        }))
    const search = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        filterUsers()
    }
    const clear = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        ev.preventDefault();
        clearFilter();
    }
    const icon: IIconProps = { iconName: 'ClearFormatting' };
    
    return (
        <div>
            <Stack  tokens={{ padding: 10, childrenGap: 10 }} >
                
                <Stack>
                   <TextField 
                   label="Filter by name" 
                   placeholder="Type name..." 
                   type="text" 
                   value={name} 
                   styles={{  root: { color: '#000',  width: 285  } }}
                   onChange={(_, value) => {
                       console.log('val', value)
                       return value !== undefined && changeName(value)}} />
                       {/* <IconButton iconProps={icon} title="Clear" onClick={clear}/> */}
                       
                </Stack>
                <Stack >
                    <Dropdown
                     placeholder="Choose type" 
                     label="Filter by user type"
                     onChange={(_, option) =>  option !== undefined  && changeUserType(option.text)}
                     options={userOptions}
                     styles={ {  root: {   width: 285  } } }
                     />
                </Stack>
                </Stack>
                <Stack horizontal tokens={{ padding: 10, childrenGap: 10 }} >
                    <DefaultButton text="Search" onClick={search} allowDisabledFocus />
                    <DefaultButton text="Clear" onClick={clear} allowDisabledFocus />
                </Stack>
                <Stack horizontal tokens={{ padding: 10, childrenGap: 10 }} >
                <PrimaryButton text="Add User" onClick={() => (navigate('/add', { state: data }))} allowDisabledFocus />
                </Stack>
        </div>
    )
}

export default Form