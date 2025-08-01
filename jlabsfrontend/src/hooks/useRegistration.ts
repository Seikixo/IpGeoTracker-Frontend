import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
import { registerUser as registerApi } from "../services/user";

interface User {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    ip_address: string;
}

export const useRegistration = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const registerMutation = useMutation({
        mutationFn: (user: User) => registerApi(user),
        onSuccess: (data) => {
            queryClient.setQueryData(['user-info'], data.user);
        }
    });

    const register = async(user: User) => {
        const data =  registerMutation.mutateAsync(user);
        navigate('/login');
        return data;
    }

    return register;
}