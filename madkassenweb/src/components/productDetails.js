import React, {useState} from "react";
import {useParams} from "react-router-dom";
import useProducts from "../Hooks/useProducts";
import {useCart} from "../context/CartContext";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from "@headlessui/react";
import {HiCheck} from "react-icons/hi";
import {HeartIcon, MinusIcon, PlusIcon} from "@heroicons/react/24/outline";

const allergyTypeNames = {
    0: "Gluten",
    1: "Laktose",
    2: "Nødder",
    3: "Skaldyr",
    4: "Soya",
    5: "Æg",
};

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
    const {id} = useParams();
    const {products, loading, error} = useProducts();
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState(1);

    if (loading) {
        return <div>Loading product...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const product = products.find((p) => p.productId.toString() === id);

    if (!product) {
        return <div>Product not found.</div>;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="border-2 border-black rounded-lg bg-white shadow-lg p-6 max-w-4xl w-full">
                <div className="border border-gray-200 rounded-lg p-6 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                    {/* Image Gallery */}
                    <TabGroup className="flex flex-col-reverse">
                        <div className="mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                            <TabList className="grid grid-cols-4 gap-6">
                                <Tab
                                    key={product.productId}
                                    className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white hover:bg-gray-50"
                                >
                                    <span className="absolute inset-0 overflow-hidden rounded-md">
                                        <img
                                            alt={product.productName}
                                            src={product.imageUrl}
                                            className="h-full w-full object-cover"
                                        />
                                    </span>
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-focus:ring-indigo-500"
                                    />
                                </Tab>
                            </TabList>
                        </div>
                        <TabPanels>
                            <TabPanel>
                                <img
                                    alt={product.productName}
                                    src={product.imageUrl}
                                    className="aspect-square w-full object-cover sm:rounded-lg"
                                />
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>

                    {/* Product Info */}
                    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.productName}</h1>
                        <p className="text-xl font-semibold text-gray-900 mt-2">${product.price}</p>

                        <div className="mt-6 space-y-4">
                            <p className="text-base text-gray-700">{product.description}</p>
                            <p className="text-sm text-gray-700">Stock: {product.stockLevel}</p>
                            <p className="text-sm text-gray-700">
                                Allergies: {allergyTypeNames[product.allergyType] || "None"}
                            </p>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="mt-6 flex gap-x-4">
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="w-16 px-2 py-1 border rounded-md text-center"
                            />
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 rounded-md bg-indigo-600 px-4 py-3 text-white font-bold hover:bg-indigo-700"
                            >
                                Add to Basket
                            </button>
                            <button
                                className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                            >
                                <HeartIcon className="h-6 w-6" aria-hidden="true"/>
                                <span className="sr-only">Add to Favorites</span>
                            </button>
                        </div>

                        <section aria-labelledby="details-heading" className="mt-12">
                            <h2 id="details-heading" className="sr-only">
                                Additional details
                            </h2>
                            <div className="divide-y divide-gray-200 border-t">
                                <Disclosure>
                                    <DisclosureButton
                                        className="group relative flex w-full items-center justify-between py-6 text-left">
                                        <span className="text-sm font-medium text-gray-900 group-open:text-indigo-600">
                                            Features
                                        </span>
                                        <span className="ml-6 flex items-center">
                                            <PlusIcon
                                                aria-hidden="true"
                                                className="h-6 w-6 text-gray-400 group-hover:text-gray-500 group-open:hidden"
                                            />
                                            <MinusIcon
                                                aria-hidden="true"
                                                className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500 group-open:block"
                                            />
                                        </span>
                                    </DisclosureButton>
                                    <DisclosurePanel className="pb-6">
                                        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                                            <li>Feature 1</li>
                                            <li>Feature 2</li>
                                        </ul>
                                    </DisclosurePanel>
                                </Disclosure>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
