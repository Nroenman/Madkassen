import React from "react";
import useAddProductForm from "../Hooks/useAddProduct";

const AddProductPage = () => {
    const { productData, formError, handleChange, handleSubmit, loading, error } = useAddProductForm();

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Add Product
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Product Name */}
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-900">
                            Product Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="productName"
                                id="productName"
                                value={productData.productName}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter product name"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                            Description
                        </label>
                        <div className="mt-2">
                            <textarea
                                name="description"
                                id="description"
                                value={productData.description}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter product description"
                            />
                        </div>
                    </div>

                    {/* Category ID */}
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-900">
                            Category ID
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="categoryId"
                                id="categoryId"
                                value={productData.categoryId}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter category ID"
                            />
                        </div>
                    </div>

                    {/* Allergies */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="allergies"
                            id="allergies"
                            checked={productData.allergies}
                            onChange={handleChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <label htmlFor="allergies" className="ml-2 block text-sm font-medium text-gray-900">
                            Allergies
                        </label>
                    </div>

                    {/* Allergy Type */}
                    <div>
                        <label htmlFor="allergyType" className="block text-sm font-medium text-gray-900">
                            Allergy Type
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="allergyType"
                                id="allergyType"
                                value={productData.allergyType}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter allergy type"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-900">
                            Price
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="price"
                                id="price"
                                value={productData.price}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter product price"
                            />
                        </div>
                    </div>

                    {/* Stock Level */}
                    <div>
                        <label htmlFor="stockLevel" className="block text-sm font-medium text-gray-900">
                            Stock Level
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="stockLevel"
                                id="stockLevel"
                                value={productData.stockLevel}
                                onChange={handleChange}
                                required
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter stock level"
                            />
                        </div>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
                            Image URL
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="imageUrl"
                                id="imageUrl"
                                value={productData.imageUrl}
                                onChange={handleChange}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                                placeholder="Enter image URL"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                    </div>
                </form>

                {/* Error Messages */}
                {formError && (
                    <p className="mt-4 text-red-500 text-center">{formError}</p>
                )}
                {error && (
                    <p className="mt-4 text-red-500 text-center">{error}</p>
                )}
            </div>
        </div>
    );
};

export default AddProductPage;
