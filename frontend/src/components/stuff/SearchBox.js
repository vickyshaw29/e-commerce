import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import Homescreen from '../screens/Homescreen'
const SearchBox = () => {
    const [key, setkey] = useState('')
    return (
        // <Form> 
        <>
                <Form.Control
                type="text"
                name='q'
                onChange={(e)=>setkey(e.target.value)}
                placeholder='Search Products'
                className='mr-sm-2 ml-sm-5'
                >

                </Form.Control>
                <Button type="submit" 
                variant='outline-success'
                className='p-2'>
                    Search
                </Button>
                <Homescreen key={key}/>
        </>
    )
}

export default SearchBox
