import React, { useEffect } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import { Carousel, Col, Container, Image, Row } from 'react-bootstrap'
import Loader from '../stuff/Loader'
import Message from '../stuff/Message'
import './prod.css'
import { listTopProducts } from '../../actions/index'
import { useDispatch, useSelector } from 'react-redux'
const ProductCarousel = ({history}) => {
    const dispatch = useDispatch()
    const productTop = useSelector(state => state.productTop)
    const { loading, error, products } = productTop
    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])
    const clickHandler=(id)=>{
        history.push(`/product/${id}`)
    }
    return loading ? <Loader /> : error ? <Message variant="danger">{error}
    </Message> :
        (
            <Carousel style={{display:'block',marginBottom:'auto',marginTop:'0.5%'}}>
                {products&&products.map((product)=>(
                    <Carousel.Item style={{height:'60vh',width:'100%',cursor:'pointer',backgroundColor:'#4B4B4B'}}
                    onClick={()=>clickHandler(product._id)}
                    >
                    <div style={{
                        backgroundImage:`url(${product.image})`,
                        backgroundPosition:'center',
                        backgroundSize:'30%',
                        backgroundRepeat:'no-repeat',          
                        height:'100%',
                        width:'100%', 
                    }}/>

                    <Carousel.Caption style={{position:'absolute',top:0}}>
                      
                        <h4 style={{color:'grey',marginBottom:10,color:'#fff',fontWeight:'regular'}}>{product.name}</h4>
                    </Carousel.Caption>
                </Carousel.Item>
                ))}
            </Carousel>
        )
}

export default withRouter(ProductCarousel)
