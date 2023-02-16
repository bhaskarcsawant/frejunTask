import React from 'react'
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { Avatar, Stack } from '@mui/material';
import Loader from '../Loader/Loader';

function UsersTable({ data }) {//table component accepts the data and displays the data
    return (
        <>
            {data.length ? (
                <TableContainer component={Paper} sx={{ border: '2px solid var(--border)' }}>
                    <Table stickyHeader >
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'var(--white-2)' }}>
                                <TableCell>User</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Gender</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {
                                data.map((row) => (
                                    <TableRow key={row.id} >
                                        <TableCell>
                                            <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                                                <Avatar sx={{ border: '1px solid var(--black-3)' }} alt="Remy Sharp" src={row.image} />
                                                <h3 className='userName'>{row.firstName + " " + row.lastName}</h3>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <h3 className='data'>{row.email}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3 className='data'>{row.age}</h3>
                                        </TableCell>
                                        <TableCell>
                                            <h3 className='data'>{row.gender}</h3>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer >) : (<Loader msg="No users found!!" />)
            }</>
    )
}

export default UsersTable