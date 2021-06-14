import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/index'
import Loading from '../stuff/Loader'
import Message from '../stuff/Message'
import ProductCarousel from '../productsScreen/ProductCarousel'
const Homescreen = ({key}) => {
    const [search, setsearch] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(listProducts(search?search:undefined))
        dispatch(listProducts())
    }, [dispatch])
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    return (
        <>
            {loading ? <Loading/> : error ? <Message variant={'danger'}>{error}</Message> : (
                <>
                    {/* <ProductCarousel /> */}
                    <h3 style={{color:'#4B4B4B',marginTop:'1.5em',marginBottom:'1.5em',display:'flex',flexDirection:'row',justifyContent:"center"}}>Latest Products</h3>
                    <Row>
                        {products && products.map((product) => (                          
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}

export default Homescreen
