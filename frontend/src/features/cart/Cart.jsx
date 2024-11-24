import React, { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getCartItems, updateItems } from './cartApi'
import { useAlert } from "react-alert";
import Modal from '../common/Modal';


const Cart = () => {

    const alert = useAlert();
    const user = useSelector((state) => state.user);
    const cartloaded = useSelector((state) => state.cart.cartloaded)
    const dispatch = useDispatch();

    const [updateItem, setUpdateItem] = useState()
    const [openModal, setOpenModal] = useState(null)
    const [open, setOpen] = useState(true)
    const items = useSelector((state) => state.cart.items);
    // items.forEach((item)=>{})
    const totalAmount = items?.reduce((amount, item) => {
        const itemPrice = item.product.price;
        const itemQuantity = item.quantity;
        const itemTotal = itemPrice * itemQuantity;
        return amount + itemTotal;
    }, 0);
    const formattedTotalAmount = totalAmount?.toFixed(2);
    const totalItems = items?.reduce((total, item) => item.quantity + total, 0)
    const handleUpdate = (e, _id) => {
        setUpdateItem({ _id, quantity: +e.target.value })
    }
    useEffect(() => {
        dispatch(updateItems(updateItem));
        dispatch(getCartItems(user.loggedInUser.user?._id))
    }, [updateItem])
    const handleRemoveItems = (id) => {
        dispatch(deleteItem(id))
        alert.success('Delete Item from cart')
    }

    return (
        <>
            {!items?.length && cartloaded && <Navigate to='/home' replace={true}></Navigate>}

            <div className="m-8 mx-auto max-w-7xl p-8 sm:px-6 lg:px-8 bg-white">
                <h1 className="text-3xl font-bold tracking-tight text-gray-800">Cart</h1>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items && items.map((product) => (
                                <li key={product._id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img
                                            alt={product.product.title}
                                            src={product.product.thumbnail}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <p >{product.product.title}</p>
                                                </h3>
                                                <p className="ml-4">{product.product.price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                                Qty {/* Qty {product.quantity} */}
                                                <select className='text-sm border-gray-200  py-1' onChange={(e) => handleUpdate(e, product._id)} value={product.quantity}>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </label>

                                            <Modal
                                               title={`Delete ${product.product.title}`}
                                                message="Are you sure you want to delete this cart item"
                                                dangerOption="Delete"
                                                cancelOption="cancel"
                                                dangerAction={() => handleRemoveItems(product._id)}
                                                cancelAction={()=>setOpenModal(-1)}
                                                showModal={openModal === product._id}
                                                >
                                            </Modal>
                                            <div className="flex">
                                                <button onClick={(e)=>setOpenModal(product._id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${formattedTotalAmount}</p>
                    </div>

                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total Items</p>
                        <p>{totalItems} items</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                        <Link to="/checkout"
                            href="#"
                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            Checkout
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or{' '}
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                <Link to="/">Continue Shopping</Link>
                                <span aria-hidden="true"> &rarr;</span>
                            </button>
                        </p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Cart