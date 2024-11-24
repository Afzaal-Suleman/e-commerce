import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../userInfoApi';
import { Link } from 'react-router-dom';
const userOrder = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.loggedInUser.user._id);

    const userInfo = useSelector((state) => state.userInfo)


    useEffect(() => {
        dispatch(getOrders(user)); // Assuming user object has an 'id' property
    }, [dispatch]);


    return (
        <div>
            {userInfo.userInfoOrders && userInfo.userInfoOrders.map((products) =>
                <div className="m-8 mx-auto max-w-7xl p-8 sm:px-6 lg:px-8 bg-white">
                    {console.log(products, 'ap')}

                    <h1 className="text-3xl font-bold tracking-tight text-gray-800">Order</h1>
                    <p className='text-red-500'>Order Status: {products.status}</p>
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {products.items.map((product) => (
                                    <li key={product.id} className="flex py-6">
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
                                                    Qty {product.quantity}

                                                </label>


                                                <div className="flex">
                                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                            <p>{products.totalAmount.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total Product</p>
                            <p>{products.items.length}</p>
                        </div>
                        <div className='mt-1'>
                            <p className="text-gray-500">Shipping Address:</p>

                            <div className="flex justify-between gap-x-6 py-5 border mb-1 p-5">
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">Name:</p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900">Email:</p>
                                </div>
                                <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <p className="text-xs leading-5 text-gray-500">{products.selectedAddress.name}</p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <p className="text-xs leading-5 text-gray-500">{products.selectedAddress.email}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mt-6">
                            {/* <div onClick={handleOrder} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                        Pay and Order
                                    </div> */}
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or{' '}
                                <button
                                    type="button"
                                    // onClick={() => setOpen(false)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    <Link to="/">Continue Shopping</Link>
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>

                </div >
            )}
        </div>
    )
}


export default userOrder