import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import { useParams, Link } from 'react-router-dom';
import { fetchProductById, updateProduct } from '../../../productList/productApi';
const AdminEditProduct = () => {
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductById(params.id));
        }
    }, [dispatch, params.id]);

    const categories = useSelector((state) => state.products.categories)
    const selectProduct = useSelector((state) => state.products?.selectedProduct)
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
    const onSubmit = async (data) => {

        const product = { ...data };
        product.images = [product.image1, product.image2, product.image3]
        delete product['image1']
        delete product['image2']
        delete product['image3']

        dispatch(updateProduct(product))
        // reset()
    };

    useEffect(() => {
        if (selectProduct) {
            setValue('_id', selectProduct._id || '');
            setValue('title', selectProduct.title || '');
            setValue('description', selectProduct.description || '');
            setValue('price', selectProduct.price || '');
            setValue('stock', selectProduct.stock || '');
            setValue('rating', selectProduct.rating || '');
            setValue('discountPercentage', selectProduct.discountPercentage || '');
            setValue('category', selectProduct.category || '');
            setValue('brand', selectProduct.brand || '');

            if (selectProduct.images && selectProduct.images.length > 0) {
                setValue('image1', selectProduct.images[0] || '');
                setValue('image2', selectProduct.images[1] || '');
                setValue('image3', selectProduct.images[2] || '');
            }
            setValue('thumbnail', selectProduct.thumbnail || '');
        }
    }, [selectProduct, setValue]);



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12 bg-white p-10">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Edit Product</h2>
                    <div className='hidden'>
                        <input
                            id="id"
                            name="id"                           
                            type="text"
                            {...register("_id")}
                        />
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        {...register("title", {
                                            required: "Name is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.title && <span className='text-red-500'>{errors.title?.message}</span>}
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                                {errors.description && <span className='text-red-500'>{errors.description?.message}</span>}
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                                    <input
                                        id="price"
                                        name="price"
                                        type="text"
                                        {...register("price", {
                                            required: "Price is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.price && <span className='text-red-500'>{errors.price?.message}</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="discountpercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                Discount
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                                    <input
                                        id="discountPercentage"
                                        name="discountPercentage"
                                        type="text"
                                        {...register("discountPercentage", {
                                            required: "Discount is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.discountPercentage && <span className='text-red-500'>{errors.discountPercentage?.message}</span>}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                                    <input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        {...register("stock", {
                                            required: "Stock is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.stock && <span className='text-red-500'>{errors.stock?.message}</span>}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Rating
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                                    <input
                                        id="rating"
                                        name="rating"
                                        type="number"
                                        {...register("rating", {
                                            required: "rating is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.rating && <span className='text-red-500'>{errors.rating?.message}</span>}
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Categories
                            </label>
                            <select
                                name="category"
                                id="category"
                                className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                                {...register("category", {
                                    required: "Category is required",
                                })}
                            >
                                <option value="afzaal">Afzaal</option>
                                {categories.map((cate, index) => (
                                    <option key={index} value={cate}>{cate}</option>
                                ))}
                            </select>
                            {errors.category && <span className='text-red-500'>{errors.category?.message}</span>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                                    <input
                                        id="brand"
                                        name="brand"
                                        type="text"
                                        {...register("brand", {
                                            required: "Brand is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.brand && <span className='text-red-500'>{errors.brand?.message}</span>}
                            </div>

                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                Image1
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                                    <input
                                        id="image1"
                                        name="image1"
                                        type="text"
                                        {...register("image1", {
                                            required: "Image1 is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.image1 && <span className='text-red-500'>{errors.image1?.message}</span>}
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                Image2
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    {/* <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span> */}
                                    <input
                                        id="image2"
                                        name="image2"
                                        type="text"
                                        {...register("image2", {
                                            required: "Image2 is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.image2 && <span className='text-red-500'>{errors.image2?.message}</span>}
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                Image3
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="image3"
                                        name="image3"
                                        type="text"
                                        {...register("image3", {
                                            required: "Image3 is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.image3 && <span className='text-red-500'>{errors.image3?.message}</span>}
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        id="thumbnail"
                                        name="thumbnail"
                                        type="text"
                                        {...register("thumbnail", {
                                            required: "Thumbnail is required",
                                        })}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                {errors.thumbnail && <span className='text-red-500'>{errors.thumbnail?.message}</span>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 p-10">
                <Link to='/admin' className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-500">
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Update
                </button>
            </div>
        </form>
    )
}

export default AdminEditProduct