import { useCallback, useState } from "react";
import { useRegistration } from "../hooks/useRegistration";
import { Button, Label, TextInput } from "flowbite-react";


export default function Register() {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        ip_address: '',       
    });
    const register  = useRegistration();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(formData);
        }
        catch(error: any) {
            setError(error?.response?.data?.message || 'Registration failed');
        }
    }, [formData]);

    return(
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                <h2 className="text-2xl font-semibold text-center">Register</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <Label htmlFor="name">Name</Label>
                    <TextInput id="name" name="name" value={formData.name} onChange={handleChange} required/>
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <TextInput id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <TextInput id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                    <TextInput id="password_confirmation" name="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleChange} required />
                </div>
                <div>
                    <Label htmlFor="ip_address">IP Address</Label>
                    <TextInput id="ip_address" name="ip_address" value={formData.ip_address} onChange={handleChange} required />
                </div>

                <Button type="submit" className="w-full cursor-pointer mt-4">Register</Button>              
            </form>
        </div>
    )
}
