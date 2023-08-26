import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { refreshAccessToken } from "@/actions/auth";
import "rsuite/dist/rsuite.min.css";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        const timer = setInterval(() => {
            refreshToken();
        }, 1000 * 60 * 2);
    }, []);

    const refreshToken = async () => {
        let accessToken = localStorage.getItem("accessToken");
        let refreshToken = localStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
            let tokenData = {
                refresh: refreshToken,
            };
            let response = await refreshAccessToken(tokenData);
            localStorage.setItem("accessToken", response.access);
        }
    };

    return <Component {...pageProps} />;
}
