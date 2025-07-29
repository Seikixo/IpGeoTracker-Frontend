import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
      <button className="text-blue-500 underline" onClick={logout}>Logout</button>
    </div>
  );
}
