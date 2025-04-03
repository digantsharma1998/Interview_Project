import { useContext, useState } from "react";
import { loginUser } from "../services/api";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        login(username, password);
        try{
            const response = await loginUser(username, password);
            localStorage.setItem("token", response.data.token);
            alert("Login successful!");
            router.push("/");
        } catch (error) {
            alert("Login failed: " + error.response.data.message);
        }
    };

    return (
        <div className="min-h-screen flex itmes-center justify-center bg-gray-100">
            <form className="p-8 bg-white rounded-lg shadow-md" onSubmit={handleLogin}>
                <h2 className="text-2xl mb-6">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-2 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                    required
                />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
}