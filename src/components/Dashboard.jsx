import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from "react-router-dom";

export default function Dashboard() {
    async function handleLogout() {
        setError('')
        try{
            await logout()
            history.push('/login');
        } catch{
            setError('Something went wrong.')
        }
    }
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory();
    return (
        <>
            <Card>
                <Card.Body>
                    <h2>Profile</h2>
                    Email: <strong>{ currentUser.email }</strong>
                </Card.Body>
            </Card>
            {error && <Alert variant='danger'>{error}</Alert>}
            <div className='w-100 text-center mt-2'>
                <Button onClick={handleLogout} variant='link'>Log Out</Button>
            </div>
        </>
    )
}
