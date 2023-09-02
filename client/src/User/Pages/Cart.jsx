import  { useContext, useState } from 'react'
import { GlobalContext } from '../../Context/context'
import { decodeToken } from 'react-jwt'
import { CartContext } from '../CartContext/context'
import axios from 'axios'
import Swal from 'sweetalert2'
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';


export default function Cart() {


    const { cart_state, cart_dispatch } = useContext(CartContext)
    console.log(cart_state)
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [zipcode, setZipcode] = useState("")
    const [contact, setContact] = useState("")



    const { state, dispatch } = useContext(GlobalContext)
    const total = cart_state?.cart?.reduce((accumulator, product) => accumulator + (product.price * product.quantity), 0)
    const user = decodeToken(state.token)

    const checkout = (e) => {
        e.preventDefault();
        const payload = {
            order: cart_state.cart,
            totalBill: total,
            customerAddress: `${address1} ,  ${address2} , ${city} , ${zipcode}`,
            customerContact: contact,
            customerName: user.username,
            customerEmail: user.email,
            customerId: user.id

        }


        console.log(payload)
        axios.post('/api/place-order', payload)
            .then(json => {
                cart_dispatch({
                    type: "CLEAR_CART"
                })

                Swal.fire({
                    title: 'Success!',
                    text: json.data.message,
                    icon: 'success',
                    confirmButtonText: 'Continue Exploring'
                })

            })
            .catch(err => console.log(err))
    }

    return (

        <div className="container">
            <div className="text-center my-5">
                <h2>Cart</h2>
                <small className="text-secondary">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eius totam nostrum voluptatibus culpa accusamus.</small>
            </div>

            <div className="p-5 rounded bg-dark">
                {
                    cart_state.cart?.length > 0
                        ? (

                            <>
                                <Form onSubmit={checkout}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Item Name</th>
                                                        <th>Quantity</th>
                                                        <th>Unit Price</th>
                                                        <th>Total </th>
                                                        <th>Action </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cart_state.cart.map((val, key) => <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{val.productName}</td>
                                                            <td>{val.quantity}</td>
                                                            <td> {val.price}</td>
                                                            <td>{val.quantity * val.price}</td>
                                                            <td><button className="btn btn-dark" onClick={() => cart_dispatch({
                                                                type: "REMOVE_FROM_CART",
                                                                payload: val._id
                                                            })}>Remove</button></td>
                                                        </tr>
                                                        )
                                                    }
                                                    <tr>
                                                        <td colSpan={6} className='text-center'> Total : {total} </td>
                                                    </tr>

                                                </tbody>
                                            </Table>
                                        </div>
                                        <div className="col-md-6 text-white">


                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control value={address1} onChange={(e) => setAddress1(e.target.value)} placeholder="1234 Main St" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                                <Form.Label>Address 2</Form.Label>
                                                <Form.Control value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Apartment, studio, or floor" />
                                            </Form.Group>

                                            <Row className="mb-3">
                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>City</Form.Label>
                                                    <Form.Control value={city} onChange={(e) => setCity(e.target.value)} placeholder='Karachi' />
                                                </Form.Group>



                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label>Zip</Form.Label>
                                                    <Form.Control value={zipcode} onChange={(e) => setZipcode(e.target.value)} placeholder='12345' />
                                                </Form.Group>

                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label>Contact</Form.Label>
                                                    <Form.Control value={contact} onChange={(e) => setContact(e.target.value)} placeholder='+923101234567' />
                                                </Form.Group>




                                            </Row>
                                        </div>
                                    </div>



                                    <button type="submit" className="btn btn-light mt-5 w-100 d-block">Checkout</button>
                                </Form>
                            </>




                        )
                        : (<div className='fs-1  my-5  text-center text-white'>No Items in the Cart</div>)
                }





            </div>
        </div >
    )
}