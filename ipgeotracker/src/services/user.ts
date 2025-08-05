import axiosInstance from "./axios";

interface User {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    ip_address: string;
}

export const registerUser = async (user: User) => {
    try
    {
        const res = await axiosInstance.post('/register', user);
        return res.data;
    }
    catch(error: any)
    {
        console.error("Error in user registration", error);
        throw error;
    }

}