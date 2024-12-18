import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterProducts, sortProducts, getAllCategories, getAllBrands } from '../../../productList/productApi';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import AdminFilterSection from './AdminFilterSection';

const sortOptions = [
    { name: 'Best Rating', sort: 'ratting', order: 'asc', current: false },
    { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
    { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

const AdminProductList = () => {
    const dispatch = useDispatch();
    const { products, categories, brands, status, error } = useSelector((state) => state.products);

    const filters = [
        {
            id: 'category',
            name: 'Category',
            options: [
                { id: 'category', value: 'all', label: 'All', checked: false },
                ...categories.map(category => ({
                    id: 'category',
                    value: category,
                    label: category,
                    checked: false,
                }))]
        },
    ];
    const brandsFilter = [
        {
          id: 'brands',
          name: 'Brand',
          options: [
            {id:'brands', value: 'all', label: 'All', checked: false },
            ...brands.map(brand => ({
            id: 'brands',
            value: brand,
            label: brand,
            checked: false,
          }))]
        },
    ]
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getAllBrands());
      }, [dispatch]);
    const sortItemsFun = (e) => {
        dispatch(sortProducts(e));
    }

    const filterItemFun = (e) => {
        dispatch(filterProducts(e));
    }

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bg-white">
            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <AdminFilterSection sortItemsFun={sortItemsFun} sortProducts={sortProducts} sortOptions={sortOptions} products={products} filters={filters} brandsFilter={brandsFilter} filterItemFun={filterItemFun} />
                    {/* pagination */}
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <a
                                href="#"
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Next
                            </a>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                    <span className="font-medium">2</span> results
                                </p>
                            </div>
                            <div>
                                <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Previous</span>
                                        <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
                                    </a>
                                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                                    <a
                                        href="#"
                                        aria-current="page"
                                        className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        1
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        2
                                    </a>
                                    <a
                                        href="#"
                                        className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                    >
                                        3
                                    </a>

                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    >
                                        <span className="sr-only">Next</span>
                                        <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminProductList