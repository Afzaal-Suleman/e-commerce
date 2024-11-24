import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'

import MobileFilter from './MobileFilter';

const FilterSection = ({ sortItemsFun, sortOptions, filters, brandsFilter, filterItemFun, products }) => {

    return (
        <>
            {/* Mobile filter dialog */}
            <MobileFilter sortOptions={sortOptions} sortItemsFun={sortItemsFun} brandsFilter={brandsFilter} filterItemFun={filterItemFun} filters={filters} />
            <section aria-labelledby="products-heading" className="pb-24 pt-6">

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {/* Filters */}
                    <form className="hidden lg:block">
                        <h3 className="sr-only">Categories</h3>

                        {filters.map((section) => (
                            <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                {({ open }) => (
                                    <>
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    {open ? (
                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="radio"
                                                            defaultChecked={option.checked}
                                                            onChange={e => { filterItemFun(e.target.value); }}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 text-sm text-gray-600"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        ))}

                        {brandsFilter.map((section) => (
                            <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                {({ open }) => (
                                    <>
                                        <h3 className="-my-3 flow-root">
                                            <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    {open ? (
                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                    ) : (
                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                    )}
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-4">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            id={`filter-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            defaultValue={option.value}
                                                            type="radio"
                                                            defaultChecked={option.checked}
                                                            onChange={e => { filterItemFun(e.target.value); }}
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                                            className="ml-3 text-sm text-gray-600"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </>
                                )}
                            </Disclosure>
                        ))}
                    </form>

                    {/* Product grid */}
                    <ProductGrid products={products} />
                </div>
            </section>
        </>
    );
};

export default FilterSection;
