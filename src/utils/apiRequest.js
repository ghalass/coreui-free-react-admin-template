import axios from 'axios';

const TIME_OUT = 0; // FOR TEST LOADING TIME

export const apiRequest = async (endpoint, method = "GET", body = null, token = null) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            // Add authorization header if token is provided
            ...(token && { "Authorization": `Bearer ${token}` })
        };

        const baseUrl = import.meta.env.VITE_BASE_URL;
        const url = `${baseUrl}${endpoint}`;

        const config = {
            method: method.toLowerCase(),
            url,
            headers,
            withCredentials: true, // equivalent to credentials: "include"
            data: body ? JSON.stringify(body) : undefined
        };

        const response = await axios(config);

        if (TIME_OUT > 0) {
            await new Promise((resolve) => setTimeout(resolve, TIME_OUT));
        }

        return response.data;
    } catch (error) {
        // Axios wraps the response error in error.response
        const response = error.response;

        // CHECK IF AUTHENTICATED USER
        if (response?.status === 401) {
            // Redirection vers la page de connexion
            window.location.href = "/login";
        } else {
            console.error(`API Error (${response?.status ?? "UNKNOWN"}):`,
                error.message);
        }

        throw {
            message: response?.data?.error ||
                error.message ||
                "Une erreur est survenue lors de la requête.",
            status: response?.status
        };
    }
};