import { useContext, useState } from "react";
import { registerUser } from "../services/auth";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { register } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        register(username, password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ username, password });
            alert("Registration successful!");
            router.push("/login");
        } catch (error) {
            alert("Registration failed: " + error.response.data.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="space-y-4">
                <h2 className="text-2xl mb-6">Register</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="p-2 bg-green-500 text-white rounded">
                    Register
                </button>
            </form>
        </div>
    );
}
