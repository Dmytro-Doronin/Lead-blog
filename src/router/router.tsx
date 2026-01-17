import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthProvider } from '../context/authContext/AuthProvider.tsx';
import { AppLayout } from '../layout/appLayout/AppLayout.tsx';
import { RequireAuth } from '../layout/appLayout/RequireAuth.tsx';
import { AuthLayout } from '../layout/authLayout/AuthLayout.tsx';
import { RootLayout } from '../layout/rootLayout/RootLayout.tsx';
import { BlogsPage } from '../pages/blogsPage/BlogsPage.tsx';
import { CreateBlogPage } from '../pages/createBlogPage/CreateBlogPage.tsx';
import { LoginPage } from '../pages/loginPage/LoginPage.tsx';
import { PostsPage } from '../pages/posts/PostsPage.tsx';
import { RegisterPage } from '../pages/registerPage/RegisterPage.tsx';

export const router = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                <RootLayout />
            </AuthProvider>
        ),
        errorElement: <div>Page not found</div>,
        children: [
            {
                element: <AuthLayout />,
                children: [
                    { path: '/login', element: <LoginPage /> },
                    { path: '/register', element: <RegisterPage /> },
                ],
            },
            {
                element: <AppLayout />,
                children: [
                    { index: true, element: <Navigate to="/blogs" replace /> },
                    { path: '/blogs', element: <BlogsPage /> },
                    { path: '/posts', element: <PostsPage /> },
                    {
                        element: <RequireAuth />,
                        children: [{ path: '/blogs/create', element: <CreateBlogPage /> }],
                    },
                ],
            },
            // {
            //     path: '/',
            //     element: (
            //         <RequireAuth>
            //             <AppLayout />
            //         </RequireAuth>
            //     ),
            //     children: [
            //         { index: true, element: <Navigate to="blogs" replace /> },
            //         { path: 'blogs', element: <BlogsPage /> },
            //         { path: 'posts', element: <PostsPage /> },
            //     ],
            // },
        ],
    },
]);
