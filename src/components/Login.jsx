import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    async function handleSubmit(e){
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/dashboard');
        } catch {
            setError('Something went wrong while logging in. Please try again or contact support.');
        }
        setLoading(false);
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h1>Log In</h1>
                { currentUser && currentUser.email }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email' className='mt-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password' className='mt-3 mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <div className='d-flex justify-content-end mb-3'>
                        <Button disabled={loading} type='submit' className='w-50' style={{maxWidth: "100px"}}>Log In</Button>
                    </div>
                    {error && <Alert variant='danger'>{error}</Alert>}
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Not registered? <Link to='/signup'>Sign Up</Link>
        </div>
    </>
  )
}
