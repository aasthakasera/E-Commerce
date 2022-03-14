import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Row , Col } from 'react-bootstrap'
import ProductComp from '../components/ProductComp'
import MessageComp from '../components/MessageComp'
import LoaderComp from '../components/LoaderComp'
import MetaComp from '../components/MetaComp'
import PaginateComp from '../components/PaginateComp'
import { listProducts } from '../redux/actions/productActions'
import ProductCarouselComp from '../components/ProductCarouselComp'


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList )
    const { loading, error, products, page, pages } = productList

    useEffect( () => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <React.Fragment>
            <MetaComp />
            {!keyword ? (
             <ProductCarouselComp />
            ) : (
                <Link to='/' className='btn btn-light'>
                    Go Back
                </Link>
            )}
            <h1>Latest Products </h1>
            { loading ? (
                <LoaderComp />
            ) : error ? (
                <MessageComp variant='danger'>{error}</MessageComp>
            ) : (
                <>
                <Row>
                    {products.map ( product => {
                        return(
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                                <ProductComp product={product} />
                            </Col>
                        );
                    })}
                </Row>
                <PaginateComp pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </React.Fragment>
    )
}

export default HomeScreen
