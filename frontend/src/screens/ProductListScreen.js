import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import MessageComp from '../components/MessageComp'
import LoaderComp from '../components/LoaderComp'
import MetaComp from '../components/MetaComp'
import PaginateComp from '../components/PaginateComp'
import { listProducts, deleteProducts, createProduct } from '../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../redux/ActionTypes/productConstants'

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, pages, page } = productList
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
   
    const productDelete = useSelector((state) => state.productDelete)
    const { loading: loadingDelete,
            error: errorDelete,
            success: successDelete 
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct
    } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }
    
        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])
  
    const deleteHandler = (id) => {
      if (window.confirm('Are you sure')) {
         dispatch(deleteProducts(id))
      }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }
    
    return (
        <>
        <MetaComp title='Products' />
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <LoaderComp />}
            {errorDelete && <MessageComp variant='danger'>{errorDelete}</MessageComp>}
            {loadingCreate && <LoaderComp />}
            {errorCreate && <MessageComp variant='danger'>{errorCreate}</MessageComp>}
            {loading ? (
                <LoaderComp />
            ) : error ? (
                <MessageComp variant='danger'>{error}</MessageComp>
            ) : (
                <>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(product._id)}
                                    >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <PaginateComp pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </>
    )  
}

export default ProductListScreen
