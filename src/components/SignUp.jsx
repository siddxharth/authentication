import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }
        if(passwordRef.current.value.length < 6){
            return setError('Password must be at least 6 characters');
        }
        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Something went wrong while signing up. Please try again or contact support.');
        }
        setLoading(false);
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h1>Sign Up</h1>
                { currentUser && currentUser.email }
                <Form onSubmit={handleSubmit}>
                    <Form.Group id='email' className='mt-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id='password' className='mt-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id='passwordConfirm' className='mt-3 mb-3'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref={passwordConfirmRef} required />
                    </Form.Group>
                    <div className='d-flex justify-content-end mb-3'>
                        <Button disabled={loading} type='submit' className='w-50' style={{maxWidth: "100px"}}>Sign Up</Button>
                    </div>
                    {error && <Alert variant='danger'>{error}</Alert>}
                </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Aleady registered? <Link to="/login">Log In</Link>
        </div>
    </>
  )
}
