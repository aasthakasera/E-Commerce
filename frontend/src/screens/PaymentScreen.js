import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Form, Button, Col } from 'react-bootstrap'
import FormContainerComp from '../components/FormContainerComp'
import CheckoutStepsComp from '../components/CheckoutStepsComp'
import MetaComp from '../components/MetaComp'
import { savePaymentMethod } from '../redux/actions/cartActions'

const PaymentScreen = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
 
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <>
        <MetaComp title='Checkout' />
        <FormContainerComp>
            <CheckoutStepsComp step1 step2 step3 />
            <h2>Payment Method</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='PayPal or Credit Card'
                            value='PayPal'
                            name='paymentMethod'
                            id='Paypal'
                            checked
                            onChange= {(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainerComp>
        </>
    )
}

export default PaymentScreen
