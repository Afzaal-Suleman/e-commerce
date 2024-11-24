import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid'
const ProductGrid = ({ products }) => {
    return (
        <div className="lg:col-span-3">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {products.map((product) => (
                            <Link key={product._id} to={`/productdetails/${product._id}`} className='border-2 rounded-md border-gray-500'>
                                <div key={product._id} className="group relative ">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />
                                    </div>
                                    <div className="m-2 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <p>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.title}
                                                </p>
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 flex items-center"> 
                                            <StarIcon className="text-gray-200 h-5 w-5 flex-shrink-0"/>
                                            {product.rating}</p>
                                        </div>
                                        <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGrid
