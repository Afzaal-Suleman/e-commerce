import React from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, filterProducts, sortProducts, getAllCategories, getAllBrands } from '../productApi';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import FilterSection from './FilterSection';
import Loader from '../../common/Loader';

const sortOptions = [
  { name: 'Best Rating', sort: 'ratting', order: 'asc', current: false },
  { name: 'Price: Low to High', sort: 'price', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'price', order: 'desc', current: false },
]

// const filters = [
 
//   {
//     id: 'category',
//     name: 'Category',
//     options: [
//       {id:'category', value: 'all', label: 'All', checked: false },
//       {id:'category', value: 'beauty', label: 'beauty', checked: false },
//       {id:'category', value: 'fragrances', label: 'fragrances', checked: false },
//       {id:'category', value: 'furniture', label: 'furniture', checked: false },
//       {id:'category', value: 'groceries', label: 'groceries', checked: false }
//     ]
//   },
//   {
//     id: 'brand',
//     name: 'Brand',
//     options: [
//       {id: 'brand', value: 'Essence', label: 'Essence', checked: false },
//       {id: 'brand', value: 'Glamour Beauty', label: 'Glamour Beauty', checked: false },
//       {id: 'brand', value: 'Velvet Touch', label: 'Velvet Touch', checked: false },
//       {id: 'brand', value: 'Chic Cosmetics', label: 'Chic Cosmetics', checked: false },
//       {id: 'brand', value: 'Nail Couture', label: 'Nail Couture', checked: false },
//       {id: 'brand', value: 'Calvin Klein', label: 'Calvin Klein', checked: false },
//       {id: 'brand', value: 'Chanel', label: 'Chanel', checked: false },
//       {id: 'brand', value: 'Dior', label: 'Dior', checked: false },
//       {id: 'brand', value: 'Dolce & Gabbana', label: 'Dolce & Gabbana', checked: false },
//       {id: 'brand', value: 'Gucci', label: 'Gucci', checked: false },
//       {id: 'brand', value: 'Annibale Colombo', label: 'Annibale Colombo', checked: false },
//       {id: 'brand', value: 'Furniture Co.', label: 'Furniture Co.', checked: false },
//       {id: 'brand', value: 'Knoll', label: 'Knoll', checked: false },
//       {id: 'brand', value: 'Bath Trends', label: 'Bath Trends', checked: false },
//     ],
//   },
 
// ]




// pagination
const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]



const ProductList = () => {

  const dispatch = useDispatch();
  const { products, categories, brands, status, error } = useSelector((state) => state.products);

  const filters = [
    {
      id: 'category',
      name: 'Category',
      options: [
        {id:'category', value: 'all', label: 'All', checked: false },
        ...categories.map(category => ({
        id: 'category',
        value: category,
        label: category,
        checked: false,
      }))]
    },
  ]
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

  // useEffect(() => {
  //   if (filterItem) {
  //     let filteredProducts;
  //     if (filterId === 'brand') {
  //       filteredProducts = products.filter(product => product.brand === filterItem);
  //     } else if (filterId === 'category') {
  //       filteredProducts = products.filter(product => product.category === filterItem);
  //     }
  //     setProducts(filteredProducts);
  //   } else {
  //     // If no filter is applied, show all products
  //     setProducts(products);
  //   }
  // }, [filterItem, filterId, products]);
  

  //filter catagory from product api
  // const a = new Set([...products.map(p => p.brand)]);
  // const a = products.map(p => p.brand);

  // const c = Array.from(a).map(c => ({ value: c, label: c, checked: false }));
  // console.log(a);


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
  const sortItemsFun =(e)=>{
    dispatch(sortProducts(e));
  }
  
  const filterItemFun = (e, b)=>{
    dispatch(filterProducts(e));
  }
  
  if (status === 'loading') {
    return <div><Loader /></div>;
  }
  

  // if (status === 'failed') {
  //   return <div>Error: {error}</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }
  
  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FilterSection sortItemsFun={sortItemsFun} sortProducts={sortProducts} sortOptions={sortOptions} products={products} filters={filters} brandsFilter={brandsFilter} filterItemFun={filterItemFun} />
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

export default ProductList;
