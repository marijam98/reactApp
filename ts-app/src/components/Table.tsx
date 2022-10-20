import React from "react";
import { User } from '../api';
import { useNavigate } from 'react-router-dom';
import { DetailsList, IColumn, Stack, IIconProps } from '@fluentui/react';
import { IconButton } from '@fluentui/react/lib/Button';

type Props = {
    filterData: Array<User>,
    onDelete: (id: number) => void
}

const Table: React.FunctionComponent<Props> = ({ filterData, onDelete }) => {
    const navigate = useNavigate()

    const editClick = (ev: any, data: any) => {
        ev.preventDefault()
        navigate(`/edit/${data.id}`)
    }
    
    const columns: IColumn[] = [{
        key: 'name',
        name: 'Name',
        minWidth: 120,
        maxWidth: 120,
        onRender: data => <div> {data.name} </div>
    
    },
    {
        key: 'sureName',
        name: 'Surename',
        minWidth: 120,
        maxWidth: 120,
        onRender: data => <div>{data.sureName}</div>
    },
    {
        key: 'userType',
        name: 'User type',
        minWidth: 120,
        maxWidth: 120,
        onRender: data => <div>{data.userType}</div>
    },
    {
        key: 'date',
        name: 'Created at',
        minWidth: 120,
        maxWidth: 120,
        onRender: data => <div>{data.date}</div>
    },
    {
        key: 'city',
        name: 'City',
        minWidth: 120,
        maxWidth: 120,
        onRender: data => <div>{data.city}</div>
    },
    {
        key: 'adress',
        name: 'Adress',
        minWidth: 120,
        maxWidth: 120,
        onRender: data => <div>{data.adress}</div>
    },
    {
        key: 'actions',
        name: 'Actions',
        minWidth: 120,
        maxWidth: 120,
        onRender: (data) =>
        <Stack horizontal>
            <IconButton  iconProps={editIcon} title="Edit" onClick={(event) => editClick(event, data)}/>
            <IconButton  iconProps={deleteIcon} title="Delete" onClick={(ev) => { ev.preventDefault(); onDelete(data.id ? data.id : 0) }}/>
        </Stack>

    },
    ]
    const deleteIcon: IIconProps = { iconName: 'Delete' };
    const editIcon: IIconProps = { iconName: 'PAgeEdit' };
    return (
        <Stack  tokens={{ padding: 10, childrenGap: 10 }} >
            <DetailsList items={filterData.map(data => data)} columns={columns} />
        </Stack>

    )
}

export default Table