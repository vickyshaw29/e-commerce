import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../stuff/Message'
import Loader from '../stuff/Loader'
import FormContainer from '../user/FormContainer'
import { Button, Form } from 'react-bootstrap'
import { detailsProduct, updateProduct, listProducts } from '../../actions/index'
import { PRODUCT_DETAILS_RESET, PRODUCT_LIST_RESET } from '../../constants/products'
import axios from 'axios'
const ProductsScreen = ({ match, history }) => {
    let productId = match.params.id
    console.log(productId, 'from the match params')
    const [name, setname] = useState("")
    const [price, setprice] = useState(0)
    const [image, setimage] = useState("")
    const [brand, setbrand] = useState("")
    const [category, setcategory] = useState("")
    const [countInStock, setcountInStock] = useState(0)
    const [description, setdescription] = useState("")
    const [uploading, setuploading] = useState(false)
    const dispatch = useDispatch()

    // 
    const productList = useSelector(state => state.productList)
    const { loading: listLoading, error: listError, products } = productList
    // 
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product, success } = productDetails
    // getting details of the updated product from the store
    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: updateLoading, success: updateSuccess, error: updateError, product: updatedProduct } = productUpdate
    console.log(product)
    useEffect(() => {
        if (!product.name || product._id !== productId) {
            dispatch({ type: PRODUCT_DETAILS_RESET })
            dispatch(detailsProduct(productId))
        }

    }, [dispatch, history, productId])
    useEffect(() => {
        if (product) {

            setname(product.name)
            setprice(product.price)
            setimage(product.image)
            setbrand(product.brand)
            setcategory(product.category)
            setcountInStock(product.countInStock)
            setdescription(product.description)
        }
    }, [product, products])
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setuploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('http://localhost:8000/api/upload', formData, config)
            console.log(data)
            setimage(data)
            setuploading(false)
        } catch (error) {
            console.log(error)
            setuploading(false)
        }
    }

    const submitHandler = (e) => {
        dispatch({ type: PRODUCT_LIST_RESET })
        dispatch(listProducts())
        dispatch({ type: PRODUCT_DETAILS_RESET })
        dispatch(detailsProduct(productId))
        e.preventDefault()
        dispatch(updateProduct(productId, {
            name: name || undefined,
            price: price || undefined,
            image: image || undefined,
            brand: brand || undefined,
            category: category || undefined,
            countInStock: countInStock || undefined,
            description: description || undefined
        }))
        history.push('/admin/productlist')

    }

    return (
        <>
            <Link to='/admin/productlist' className="btn btn-light my-3">Go Back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>
                                Name
                                        </Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>
                                Price
                                        </Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={price} onChange={(e) => setprice(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="image">
                            <Form.Label>
                                Image
                            </Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter image url"
                                value={image}
                                onChange={(e) => setimage(e.target.value)} />
                            <Form.File id="image-file" label="Choose File" custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>
                        <Form.Group controlId="brand">
                            <Form.Label>
                                Brand
                                        </Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter brand name"
                                value={brand}
                                onChange={(e) => setbrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="category">
                            <Form.Label>
                                Category
                                        </Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter brand name"
                                value={category}
                                onChange={(e) => setcategory(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="countInStock">
                            <Form.Label>
                                CountInStock
                                        </Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter count in stock"
                                value={countInStock}
                                onChange={(e) => setcountInStock(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="Description">
                            <Form.Label>
                                Description
                                        </Form.Label>
                            <Form.Control type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setdescription(e.target.value)} />
                        </Form.Group>

                        <Button
                            type="submit" variant="primary"
                        >
                            Submit
                    </Button>
                    </Form>
                )}
            </FormContainer>
        </>



    )
}

export default ProductsScreen
