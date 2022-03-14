import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Form, Button } from 'react-bootstrap'
import MessageComp from '../components/MessageComp'
import LoaderComp from '../components/LoaderComp'
import FormContainerComp from '../components/FormContainerComp'
import MetaComp from '../components/MetaComp'
import { login } from '../redux/actions/userActions'

const LoginScreen = ({ location, history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect( () => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
        <>
        <MetaComp title='Login' />
        <FormContainerComp>
            <h1>Sign In</h1>
            {error && <MessageComp variant='danger'>{error}</MessageComp>}
            {loading && <LoaderComp /> }
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control 
                        type='email' 
                        placeholder= 'Enter email'
                        value= {email}
                        onChange= {(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control 
                        type='password' 
                        placeholder= 'Enter password'
                        value= {password}
                        onChange= {(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

                <Row className='py-3'>
                    <Col>
                        New Customer?{' '}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register
                        </Link>
                    </Col>
                </Row>
        </FormContainerComp>
        </>
    )
}

export default LoginScreen
