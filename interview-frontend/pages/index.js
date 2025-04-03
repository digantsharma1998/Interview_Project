import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/api";

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try{
            const response = await getProducts();
            setProducts(response.data);
        } catch(error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleDelete = async (id) => {
        try{
            await deleteProduct(id);
            fetchProducts();
        } catch(error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl mb-4">Product List</h1>
            {products.map((product) => (
                <div key={product._id} className="p-4 mb-2 border rounded">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <button onClick={() => router.push(`edit-product/${product._id}`)} className="text-blue-500 mr-2">
                        Edit
                    </button>
                    <button onClick={() => handleDelete(product._id)} className="text-red-500">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}