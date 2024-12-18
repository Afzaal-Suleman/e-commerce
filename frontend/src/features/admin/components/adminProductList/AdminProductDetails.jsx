import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductById } from '../../../productList/productApi'
import { Link  } from "react-router-dom";
import { addTocart } from '../../../cart/cartApi';
import {getCartItems} from '../../../cart/cartApi'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const AdminProductDetails = () => {
    const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct } = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  
  const handleCart = (e)=>{
    e.preventDefault();
    dispatch(addTocart({product:selectedProduct,quantity: 1, user:user.loggedInUser.user._id}))
    if(user.loggedInUser.user){
    dispatch(getCartItems(user.loggedInUser.user._id))
    }
  }
  useEffect(() => {
    dispatch(getCartItems(user.loggedInUser.user._id))
  },[dispatch]);

  useEffect(() => {
    dispatch(fetchProductById(id));
  },[dispatch]);

  const reviews = selectedProduct?.reviews || [];
  return (
    <div className="bg-white">
    <div className="pt-6">
      <nav aria-label="Breadcrumb">
        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          {/* {selectedProduct.breadcrumbs.map((breadcrumb) => (
            <li key={breadcrumb.id}>
              <div className="flex items-center">
                <a className="mr-2 text-sm font-medium text-gray-900">
                  {breadcrumb.title}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
          ))} */}
          <li className="text-sm">
            <a  aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
              {selectedProduct.title}
            </a>
          </li>
        </ol>
      </nav>

      {/* Image gallery */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            alt={selectedProduct.thumbnail}
            src={selectedProduct.thumbnail}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt={selectedProduct.thumbnail}
              src={selectedProduct.thumbnail}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt={selectedProduct.thumbnail}
              src={selectedProduct.thumbnail}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            alt={selectedProduct.thumbnail}
            src={selectedProduct.thumbnail}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{selectedProduct.title}</h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>
          <p className="text-3xl tracking-tight text-gray-900">{selectedProduct.price}</p>

          {/* Reviews */}
          <div className="mt-6">
            <h3 className="sr-only">Reviews</h3>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0,1,2,3].map((index) => (
                  <StarIcon
                    key={index}
                    aria-hidden="true"
                    // className={classNames(
                    //   rating > rating ? 'text-gray-900' : 'text-gray-200',
                    //   'h-5 w-5 flex-shrink-0',
                    // )} 
                  />
                ))}
              </div>
              <p className="sr-only"> out of 5 stars</p>
              <Link className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                {reviews.length} reviews
              </Link>
            </div>
          </div>

          <form className="mt-10">
            {/* Colors */}
            {/* <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>

              <fieldset aria-label="Choose a color" className="mt-4">
                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <Radio
                      key={color.name}
                      value={color}
                      aria-label={color.name}
                      className={classNames(
                        color.selectedClass,
                        'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          color.class,
                          'h-8 w-8 rounded-full border border-black border-opacity-10',
                        )}
                      />
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div> */}

            {/* Sizes */}
            {/* <div className="mt-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Size guide
                </a>
              </div>

              <fieldset aria-label="Choose a size" className="mt-4">
                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                >
                  {Product.dimensions.map((size) => (
                    <Radio
                      key={size.name}
                      value={size}
                      disabled={!size.inStock}
                      className={classNames(
                        size.inStock
                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                          : 'cursor-not-allowed bg-gray-50 text-gray-200',
                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                      )}
                    >
                      <span>{size.name}</span>
                      {size.inStock ? (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                        />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                        >
                          <svg
                            stroke="currentColor"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          >
                            <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                          </svg>
                        </span>
                      )}
                    </Radio>
                  ))}
                </RadioGroup>
              </fieldset>
            </div> */}

            <button
            onClick={handleCart}
              type="submit"
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to cart
            </button>
            <Link to="/"
              className="mt-5 flex w-full items-center justify-center  px-8 py-2 text-base font-small underline text-indigo-600"
            >
              Go for Shopping
            </Link>
          </form>
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>
            <div className="space-y-6">
              <p className="text-base text-gray-900">{selectedProduct.description}</p>
            </div>
          </div>

          {/* <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {selectedProduct.highlights.map((highlight) => (
                  <li key={highlight} className="text-gray-400">
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}

          <div className="mt-10">
            <h2 className="text-sm font-medium text-gray-900">ShippingInformation</h2>

            <div className="mt-4 space-y-6">
              <p className="text-sm text-gray-600">{selectedProduct.shippingInformation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminProductDetails