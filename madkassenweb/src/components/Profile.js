import React from 'react';

const ProductList = () => {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
                <h2 className="sr-only">Products</h2>

                <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                    <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                        <img
                            src="https://tailwindui.com/plus/img/ecommerce-images/category-page-05-image-card-01.jpg"
                            alt="TODO"
                            className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                        />
                        <div className="pb-4 pt-10 text-center">
                            <h3 className="text-sm font-medium text-gray-900">
                                <a href="#">
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    Organize Basic Set (Walnut)
                                </a>
                            </h3>
                            <div className="mt-3 flex flex-col items-center">

                            </div>
                            <p className="mt-4 text-base font-medium text-gray-900">$149</p>
                        </div>
                    </div>

                    {/* Other Product Cards */}
                    <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                        <img
                            src="https://tailwindui.com/plus/img/ecommerce-images/category-page-05-image-card-02.jpg"
                            alt="TODO"
                            className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                        />
                        <div className="pb-4 pt-10 text-center">
                            <h3 className="text-sm font-medium text-gray-900">
                                <a href="#">
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    Organize Pen Holder
                                </a>
                            </h3>
                            <div className="mt-3 flex flex-col items-center">

                            </div>
                            <p className="mt-4 text-base font-medium text-gray-900">$15</p>
                        </div>
                    </div>


                    <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                        <img
                            src="https://tailwindui.com/plus/img/ecommerce-images/category-page-05-image-card-03.jpg"
                            alt="TODO"
                            className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                        />
                        <div className="pb-4 pt-10 text-center">
                            <h3 className="text-sm font-medium text-gray-900">
                                <a href="#">
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    Organize Sticky Note Holder
                                </a>
                            </h3>
                            <div className="mt-3 flex flex-col items-center">

                            </div>
                            <p className="mt-4 text-base font-medium text-gray-900">$15</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default ProductList;
