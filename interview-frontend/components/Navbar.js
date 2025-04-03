import Link from "next/link";
import { logoutUser } from "../services/auth";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await logoutUser();
            alert("Logged out successfully!");
            router.push("/login");
        } catch(error) {
            alert("Error logging out");
        }
    };

    return (
        <nav className="p-4 bg-gray-800 text-white">
            <div className="flex justify-between">
                <Link href="/" className="text-lg font-bold">
                    Home
                </Link>
                <div>
                    <Link href="/add-product" className="mr-4">
                        Add Product
                    </Link>
                    <Link href="/login" className="mr-4">Login</Link>
                    <Link href="/register" className="mr-4">Register</Link>
                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                </div>
            </div>
        </nav>
    );
}