import React, { useEffect ,useState} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from './Rating'
import { listProducts, detailsProduct } from '../../actions'
import {postReview} from '../../actions/index'
import {PRODUCT_REVIEW_RESET} from '../../constants/products'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../stuff/Loader'
import Message from '../stuff/Message'
const Singalproduct = ({ match,history}) => {
    const [qty, setqty] = React.useState(1)
    const [rating, setrating] = useState(0)
    const [comment, setcomment] = useState("")
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    // userinfo from the store
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // details of the reviewed product from the store
    const productReview = useSelector(state => state.productReview)
    const { loading:loadingReview, success,error:errorReview} = productReview

    useEffect(() => {
        if(success){
            alert('Review submited')
            setrating(0)
            setcomment('')
            dispatch({type:PRODUCT_REVIEW_RESET})
        }
        dispatch(detailsProduct(match.params.id))
    }, [match,dispatch,success])
    const addToCart=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(postReview(match.params.id,{
            rating:rating,
            comment:comment,
            name:userInfo.user.name,
            id:userInfo.user._id
        }))

        
    }
    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {loading ? <Loading /> : product.error ? <Message variant="danger">{product.error}</Message> : (
                <>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                                    <ListGroup.Item>
                                        price:{product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description:{product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    price
                                         </Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    status
                                         </Col>
                                                <Col>
                                                    {product.countInStock ? 'in Stock' : 'out of stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.countInStock>0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control as="select" value={qty} onChange={(e)=>setqty(e.target.value)}>
                                                         {[...Array(product.countInStock).keys()].map((x)=>(
                                                           <option key={x+1} value={x+1}>
                                                               {x+1}
                                                           </option>
                                                         ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}
                                        <ListGroupItem>
                                            <Button
                                            onClick={addToCart} 
                                            className="btn btn-block" disabled={product.countInStock === 0}>
                                                Add to cart
                                     </Button>
                                        </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length===0 && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                    {product.reviews.map((review)=>(
                                        <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h2>Write a customer review</h2>
                                        {errorReview && <Message variant="danger">{errorReview}</Message> }
                                        {userInfo? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId="rating">
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as="select"
                                                value={rating}
                                                onChange={(e)=>setrating(e.target.value)}
                                                >
                                                    <option value=''>Select</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4- Very Good</option>
                                                    <option value='5'>5 - Excellent</option>

                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                    <Form.Control as="textarea" row="3" value={comment}
                                                    onChange={(e)=>setcomment(e.target.value)}
                                                    style={{border:'1px solid #205b70'}}
                                                    >

                                                    </Form.Control>

                                            </Form.Group>
                                            <Button type="submit" variant="primary">submit</Button>
                                        </Form>

                                        ):<Message> Please <Link to='/login'>sign in
                                        
                                        </Link> to write a review</Message>}
                                    </ListGroup.Item>
                            </ListGroup>
                            </Col>
                        </Row>
                </>
            )}



        </>
    )
}

export default Singalproduct
