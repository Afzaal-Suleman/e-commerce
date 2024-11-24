import React, { useState, useEffect } from 'react'
import { Link,Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem, getCartItems, updateItems } from '../features/cart/cartApi'
import { updateUser } from '../features/auth/authApi';
import { createOrder } from '../features/order/orderApi';
import { selectCurrentOrder } from '../features/order/orderSlice';



// const products = [
//     {
//         id: 1,
//         name: 'Throwback Hip Bag',
//         href: '#',
//         color: 'Salmon',
//         price: '$90.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//         imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//     },
//     {
//         id: 2,
//         name: 'Medium Stuff Satchel',
//         href: '#',
//         color: 'Blue',
//         price: '$32.00',
//         quantity: 1,
//         imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//         imageAlt:
//             'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//     },
//     // More products...
// ]
// const address = [
//     {
//         name: "john Doe",
//         street: "2-street",
//         phone: "0302102020101",
//         city: "Rawalpindi",
//         state: "Karachi",
//         email: "aaa@gmail.com"
//     },
//     {
//         name: "john Doe",
//         street: "2-street",
//         phone: "0302102020101",
//         city: "Rawalpindi",
//         state: "Karachi",
//         email: "bbb@gmail.com"
//     },
// ]
const Checkout = () => {

    const user = useSelector((state) => state.user);    
    const userid = user?.loggedInUser.user._id;

    const currentOrder = useSelector(selectCurrentOrder);
    
    const dispatch = useDispatch();
    const [selectedAddress, setSelectedAddress ] = useState();
    const [paymentMethod, setPaymentMethod ] = useState("cash");
    const [updateItem, setUpdateItem] = useState()

    useEffect(() => {
        dispatch(getCartItems(user.loggedInUser.user._id))
    }, [dispatch]);

    const items = useSelector((state) => state.cart.items);
    
    const totalAmount = items?.reduce((amount, item) => {
        const itemPrice = item.product.price;
        const itemQuantity = item.quantity;
        const itemTotal = itemPrice * itemQuantity;
        return amount + itemTotal;
    }, 0);
    const formattedTotalAmount = totalAmount?.toFixed(2);
    // const totalItems = items.reduce((total, item)=> item.quantity + total, 0)    
    const handleUpdate = (e, _id)=>{
        setUpdateItem({_id, quantity: +e.target.value})
    }
    useEffect(()=>{
        dispatch(updateItems(updateItem));
        dispatch(getCartItems(user.loggedInUser.user._id))
    },[updateItem])
    const handleRemoveItems = (id) => {
        dispatch(deleteItem(id))
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        
        dispatch(updateUser({
          ...user.loggedInUser.user,
          address: [...user.loggedInUser.user.address, data]  // Spread the existing addresses and add the new one
        }))
        // reset();
      };
      

    const handleAddress = (e)=>{
        setSelectedAddress(user.loggedInUser.user.address[e])
    }
    const handlePayment = (e)=>{
        setPaymentMethod(e)
    }
    const handleOrder = ()=>{
        if(selectedAddress && paymentMethod){
            dispatch(createOrder({ userid, items, totalAmount, paymentMethod, selectedAddress }))
            
        }
        else{
            alert('Enter address and payment method')
        }
    }
    return (
        <>
            {!items?.length && <Navigate to='/' replace={true}></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder._id}`} replace={true}></Navigate>}
            <div className="m-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-2 gap-y-8 lg:grid-cols-4">
                    <div className='lg:col-span-2'>
                        <form onSubmit={handleSubmit(onSubmit)} className='bg-white p-5'>
                            <div className=" border-gray-900/10 pb-12">
                                <h2 className=" text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Full name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                 type="text"
                                                 {...register("name", {
                                                   required: "Name is required",
                                                 })}  
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.email && <span className='text-red-500'>{errors.name?.message }</span>}

                                        </div>
                                    </div>                                  

                                    <div className="sm:col-span-4">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                               type="text"
                                               {...register("email", {
                                                 required: "Email is required",
                                                 pattern: {
                                                   value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                   message: "Invalid email address"
                                                 }
                                               })}  
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.email && <span className='text-red-500'>{errors.email?.message }</span>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone
                                        </label>
                                        <div className="mt-2">
                                            <input
                                               type="tel"
                                               {...register("phone", {
                                                 required: "Email is required",
                                                 maxLength: { value: 15, message: "Maximum length is 5" }
                                               })}  
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.phone && <span className='text-red-500'>{errors.phone?.message }</span>}
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                {...register("street", {
                                                    required: "Street is required",
                                                  })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.street && <span className='text-red-500'>{errors.street?.message }</span>}

                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                               {...register("city", {
                                                required: "City is required",
                                              })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.city && <span className='text-red-500'>{errors.city?.message }</span>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                            State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                               {...register("province", {
                                                required: "Province is required",
                                              })}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            {errors.province && <span className='text-red-500'>{errors.province?.message }</span>}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                            ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="postal-code"
                                                name="postal-code"
                                                type="text"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Save
                                    </button>
                                </div>

                            </div>

                            <div className="border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Choose from existing address
                                </p>
                                <ul role="list" className=" divide-gray-100">
                                    {user.loggedInUser.user.address?.map((add, index) => (
                                        <li key={add.email} className="flex justify-between gap-x-6 py-5 border mb-1 p-5">
                                            <div className="flex min-w-0 gap-x-4">
                                                        <input
                                                            name="option"
                                                            value={index}
                                                            type="radio"                                                        
                                                            onChange={e => { handleAddress(e.target.value); }}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">Name</p>
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">Email</p>
                                                </div>
                                            </div>
                                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <p className="text-xs leading-5 text-gray-500">{add.name}</p>
                                                </div>
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <p className="text-xs leading-5 text-gray-500">{add.email}</p>
                                                </div>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 space-y-10">

                                    <fieldset>
                                        <legend className="text-md font-semibold leading-6 text-gray-900">Payment Method</legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash"
                                                    name="push-notifications"
                                                    checked={paymentMethod === "cash"}
                                                    value="cash"
                                                    onChange={(e)=>handlePayment(e.target.value)}
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="card"
                                                    name="push-notifications"
                                                    type="radio"
                                                    checked={paymentMethod === "card"}
                                                    value="card"
                                                    onChange={(e)=>handlePayment(e.target.value)}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Card
                                                </label>
                                            </div>

                                        </div>
                                    </fieldset>
                                </div>
                            </div>

                        </form >
                    </div>
                    <div className='lg:col-span-2'>
                        <div className=" mx-auto max-w-7xl p-8 sm:px-6 lg:px-8 bg-white">
                            <h1 className="text-2xl font-semibold leading-7 text-gray-900">Cart</h1>
                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items && items.map((product) => (
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
                                                            <p className="ml-4">{product.price}</p>
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


                                                        <div className="flex">
                                                            <button onClick={() => handleRemoveItems(product.id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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
                                    <p>{formattedTotalAmount}</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div onClick={handleOrder} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                        Pay and Order
                                    </div>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout