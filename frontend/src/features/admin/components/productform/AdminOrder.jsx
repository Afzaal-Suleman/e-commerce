import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders, updateOrderStatus } from '../../../order/orderApi'

const AdminOrder = () => {
    const dispatch = useDispatch()
    const orders = useSelector((state)=>state.order.orders)
    // const [status, setstatus] =useState(
    //     orders.reduce((acc, item) => {
    //       acc[item._id] = item.status || "pending";
    //       return acc;
    //     }, {})
    // )
    
    const handleStatus = (e, item)=>{
        const update = {...item, status:e.target.value}
        dispatch(updateOrderStatus(update))
    }
    useEffect(() => {
      dispatch(getAllOrders())
    }, [dispatch])
    
    return (
        <>
           
            <div className="overflow-x-auto ">
                <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-6 text-center">Order Number</th>
                                        <th className="py-3 px-6 text-center">User</th>
                                        <th className="py-3 px-6 text-center">Items</th>
                                        <th className="py-3 px-6 text-center">Total Amount</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {orders.map((item, index)=>(<tr key={item._id} className="border-b border-gray-200 hover:bg-gray-100">
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                               {item._id+' / '+(index+1)}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                               {item.selectedAddress.name}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                {item.items.length}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center">
                                                {item.totalAmount}
                                            </div>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            {/* <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                Active
                                            </span> */}
                                            <select name="status" id="status" onChange={(e)=>handleStatus(e, item)} className='ml-2 text-sm rounded'>
                                                <option value={item.status}>{item.status}</option>                                
                                                <option value="pending">pending</option>
                                                <option value="dispatched">dispatched</option>
                                                <option value="delivered">delivered</option>
                                                <option value="cancelled">cancelled</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-6 text-center">
                                            <div className="flex item-center justify-center">
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default AdminOrder