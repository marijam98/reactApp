import React, { useEffect, useState } from 'react';
import { User, getUsers, deleteUser } from '../api';
import Form from './Form';
import Table from './Table';
import Message from './Message';
import {  Stack } from '@fluentui/react'

const Home: React.FunctionComponent = ({ }) => {
    const [name, setName] = useState<string | undefined>()
    const [date, setDate] = useState<string | undefined>()
    const [userType, setUserType] = useState<string | undefined>()
    const [data, setData] = useState<Array<User>>([])
    const [filterData, setFilterData] = useState<Array<User>>([])

    const changeName = (value: string) => {
        setName(value)
    }
    const changeUserType = (e: string) => {
        setUserType(e)
    }
    const changeDate = (e: string) => {
        setDate(e)
    }
    useEffect(() => {
        getUsers().then(data => {
            setData(data)
            setFilterData(data)
        }).catch(e => console.log("ERROR", e))
    }, [])

    const filterUsers = (): void => {
        setFilterData(
            data.filter((data) => {
                if (name && userType && date) {
                    return (data.name ? data.name : '').toLowerCase().startsWith(name.toLowerCase())
                        && data.userType === userType && (data.date ? data.date : '') <= date
                }
                if (name && userType) {
                    return (data.name ? data.name : '').toLowerCase().startsWith(name.toLowerCase())
                        && data.userType === userType
                }
                if (name && date) {
                    return (data.name ? data.name : '').toLowerCase().startsWith(name.toLowerCase())
                        && (data.date ? data.date : '') <= date
                }
                if (userType && date) {
                    return data.userType === userType
                        && (data.date ? data.date : '') <= date
                }
                if (name) {
                    return (data.name ? data.name : '').toLowerCase().startsWith(name.toLowerCase())
                }
                if (userType) {
                    return data.userType === userType
                }
                if (date) {
                    return (data.date ? data.date : '') <= date
                }
                return data
            }
            ))
    }
    
    const clearFilter = (): void => {
        setName('')
        setFilterData(data)
        setDate('')
    }
    const onDelete = (id: number): void => {
        deleteUser(id).then(() => getUsers()).then(data => {
            setData(data)
            setFilterData(data)
        }).catch(err => { console.log("Greska", err) })
    }

    return (
        <Stack horizontal tokens={{ padding: 20, childrenGap: 10 }} >
                        {filterData.length === 0
                ? <Message />
                : <Table
                    filterData={filterData}
                    onDelete={onDelete}
                />
            }
            <Form
                data={data}
                date={date}
                name={name}
                userType={userType}
                filterUsers={filterUsers}
                clearFilter={clearFilter}
                changeName={changeName}
                changeUserType={changeUserType}
                changeDate={changeDate}
            />

        </Stack>
    )
}

export default Home