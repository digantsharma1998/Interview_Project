import { useState } from "react";
import { addProduct } from "../services/api";
import { useRouter } from "next/router";
import AuthGuard from "../components/AuthGuard";

export default function addProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await addProduct({ name, description, price, category });
            alert("Product added successfully!");
            router.push("/");
        } catch (error) {
            alert("Error adding product: " + error.response.data.message);
        }
    };

    return <div>Add Product Content</div>;(
        <div className="p-6">
            <h2 className="text-2xl mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="Submit" className="p-2 bg-blue-500 text-white rounded">
                    Add Product
                </button>
            </form>
        </div>
    );
}