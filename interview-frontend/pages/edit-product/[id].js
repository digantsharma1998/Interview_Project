import { useState, useEffect } from "react";
import { updateProduct, getProducts } from "../../services/api";
import { useRouter } from "next/router";

export default function EditProduct() {
    const [product, setProduct] = useState({ name: "", description: "", price: "", category: "" });
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await getProducts();
            const existingProduct = response.data.find((prod) => prod._id === id);
            setProduct(existingProduct);
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(id, product);
            alert("Product updated successfully!");
            router.push("/");
        } catch (error) {
            alert("Error updating product: " + error.response.data.message);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Edit Product</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="p-2 bg-green-500 text-white rounded">
                    Update Product
                </button>
            </form>
        </div>
    );
}
