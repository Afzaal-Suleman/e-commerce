import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form";
import { deleteAddress } from '../userInfoApi';

const UserProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.loggedInUser.user);
    
    const [paymentMethod, setPaymentMethod ] = useState("cash");
    const [selectedIndex, setSelectedIndex ] = useState(-1);
    
    const { register, handleSubmit, formState: { errors },setValue, reset } = useForm();
   
      
    
    const handleAddress = (index) => {
        // Ensure the index is within bounds of the user's address array
        if (index < 0 || index >= user.address.length) {
            console.error('Invalid address index');
            return;
        }
    
        const selectedAddress = user.address[index];
            setValue('name', selectedAddress.name)  
            setValue('email', selectedAddress.email)
            setValue('phone', selectedAddress.phone )
            setValue('street', selectedAddress.street)
            setValue('city', selectedAddress.city)
            setValue('province', selectedAddress.province)
            setValue('code', selectedAddress.code)
        
    };
    
      const handlePayment = (value) => {
        setPaymentMethod(value);
      };
    const removeAddress = (index)=>{
        dispatch(deleteAddress({user:user.id, index:index}))
    }
    const handleEdit = (data,)=>{
        console.log(data, selectedIndex);
        setSelectedIndex(-1)
    }
    
    return (
        <div className="p-5">
            {selectedIndex >= 0?<form onSubmit={handleSubmit((data)=>
                {handleEdit(data);
                 reset()}
                 )} className='bg-white p-5'>
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
                                    name="name"                                   
                                    type="text"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.email && <span className='text-red-500'>{errors.name?.message}</span>}

                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    name="email"
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
                                {errors.email && <span className='text-red-500'>{errors.email?.message}</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    name="phone"
                                    type="tel"
                                    {...register("phone", {
                                        required: "Email is required",
                                        maxLength: { value: 15, message: "Maximum length is 5" }
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.phone && <span className='text-red-500'>{errors.phone?.message}</span>}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                    name="street"
                                    {...register("street", {
                                        required: "Street is required",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.street && <span className='text-red-500'>{errors.street?.message}</span>}

                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    name='city'
                                    {...register("city", {
                                        required: "City is required",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.city && <span className='text-red-500'>{errors.city?.message}</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                State / Province
                            </label>
                            <div className="mt-2">
                                <input
                                    name='province'
                                    {...register("province", {
                                        required: "Province is required",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.province && <span className='text-red-500'>{errors.province?.message}</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                     name='code'
                                     {...register("code", {
                                         required: "code is required",
                                     })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                {errors.code && <span className='text-red-500'>{errors.code?.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button onClick={()=>setSelectedIndex(-1)} type="button"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Edit Address
                        </button>
                    </div>

                </div>

                <div className="border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Choose from existing address
                    </p>
                    {/* <ul role="list" className=" divide-gray-100">
                        {user.address && user.address.map((add, index) => (
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
                    </ul> */}
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
                                        onChange={(e) => handlePayment(e.target.value)}
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
                                        onChange={(e) => handlePayment(e.target.value)}
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

            </form >:null}
            <h1 className="text-base font-semibold leading-7 mx-auto max-w-screen-lg mb-5 text-gray-900">My Profile:</h1>
            <div className="border-gray-900/10 pb-12 mx-auto max-w-screen-lg bg-white rounded p-3">
                <h2 className="text-base font-semibold leading-7 text-gray-900">User Name: {user.name}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                    Email: {user.email}
                </p>
                <ul role="list" className=" divide-gray-100">
                    {user.address && user.address?.map((add,index) => (
                        <li className=" flex justify-between gap-x-6 py-5 border mb-1 p-5">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto ">
                                    <p className="text-sm font-semibold leading-6 text-gray-900"><b className='pe-5'>Name:</b>  {add.name}</p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900"><b className='pe-5'>Email:</b> {add.email}</p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900"><b className='pe-5'>Phone:</b> {add.phone}</p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900"><b className='pe-5'>City:</b>  {add.city}</p>
                                    <p className="text-sm font-semibold leading-6 text-gray-900"><b className='pe-5'>Streer:</b> {add.street}</p>

                                </div>
                            </div>

                            <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <button onClick={()=>{setSelectedIndex(index); handleAddress(index)}} className=" font-small text-indigo-600 hover:text-indigo-500">edit</button>
                                </div>
                                <div className="mt-1 flex items-center gap-x-1.5">
                                    <button onClick={()=>removeAddress(index)} className="font-small text-indigo-600 hover:text-indigo-500">remove</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-10 space-y-10">


                </div>
            </div>
        </div>
    )
}

export default UserProfile