import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function AuthGuard({ children }) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await axios.get("http://localhost:5000/api/auth/check", { withCredentials: true });
            } catch (error) {
                router.push("/login");
            }
        };
        checkAuth();
    }, [router]);

    return <>{children}</>;
}
