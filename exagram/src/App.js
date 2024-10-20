import React from 'react';
import AppRoutes from './routes/route';  
import { UserProvider } from './context/UserContext';
import { PostsProvider } from './context/PostsContext';

function App() {
    return (
        <UserProvider>
            <PostsProvider>
                <AppRoutes />
            </PostsProvider>
        </UserProvider>
    );
}

export default App;
