import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import LoaderComp from '../components/LoaderComp'
import MessageComp from '../components/MessageComp'
import MetaComp from '../components/MetaComp'
import{ getOrderDetails, payOrder, deliverOrder } from '../redux/actions/orderActions'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../redux/ActionTypes/orderConstants'
import { updateProductStock } from '../redux/actions/productActions'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id
    const dispatch = useDispatch()

    //to check if software development kit provided bt paypal is ready or not
    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay

    const productUpdateStock = useSelector((state) => state.productUpdateStock)
    const { loading:loadingUpdateStock } = productUpdateStock

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = orderDeliver

    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        order.shippingPrice = addDecimals(Number(order.shippingPrice))
        order.taxPrice = addDecimals(Number(order.taxPrice))
        order.totalPrice = addDecimals(Number(order.totalPrice))
    }

  
    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        }

        const addPayPalScript = async() => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
              setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(successPay){
          order.orderItems.map((item) => (
            dispatch(updateProductStock(item.product, { qty: item.qty}))
          ))
        }

        if(!order || successPay || order._id !== orderId || successDeliver){
          dispatch({ type: ORDER_PAY_RESET })
          dispatch({ type: ORDER_DELIVER_RESET})
          dispatch(getOrderDetails(orderId))
        }  
        else if (!order.isPaid) {
          if(!window.paypal){
            addPayPalScript()
          } else {
            setSdkReady(true)
          }
        }

    }, [dispatch, orderId, successPay, order, history, userInfo, successDeliver])   

    const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
      dispatch(deliverOrder(order))
    }

    return loading ? (
        <LoaderComp />
      ) : error ? (
        <MessageComp variant='danger'>{error}</MessageComp>
      ) : (
        <>
          <MetaComp title='Order' />
          <h1>Order {order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>{' '}
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <MessageComp variant='success'>
                      Delivered on {order.deliveredAt}
                    </MessageComp>
                  ) : (
                    <MessageComp variant='danger'>Not Delivered</MessageComp>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <MessageComp variant='success'>Paid on {order.paidAt}</MessageComp>
                  ) : (
                    <MessageComp variant='danger'>Not Paid</MessageComp>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.length === 0 ? (
                    <MessageComp>Order is empty</MessageComp>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fluid
                                rounded
                              />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${item.price} = ${item.qty * item.price}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && !userInfo.isAdmin && (
                    <ListGroup.Item>
                      {loadingPay && <LoaderComp />}
                      {loadingUpdateStock && <LoaderComp />}
                      {!sdkReady ? (
                        <LoaderComp />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                  {loadingDeliver && <LoaderComp />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )
}

export default OrderScreen

