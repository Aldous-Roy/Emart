import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';

/**
 * The login page component.
 * It provides a form for users to enter their credentials.
 */
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-800">eMart Inventory</h1>
                        <p className="text-gray-500">Please sign in to continue</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="username" type="text" placeholder="maker / checker"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="password" type="password" placeholder="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <Button type="submit" className="w-full">Sign In</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
