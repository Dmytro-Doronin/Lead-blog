import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AuthProvider } from '../context/authContext/AuthProvider.tsx';
import { AppLayout } from '../layout/appLayout/AppLayout.tsx';
import { RequireAuth } from '../layout/appLayout/RequireAuth.tsx';
import { AuthLayout } from '../layout/authLayout/AuthLayout.tsx';
import { RootLayout } from '../layout/rootLayout/RootLayout.tsx';
import { NotFound } from '../pages/404/NotFound.tsx';
import { BlogsPage } from '../pages/blogsPage/BlogsPage.tsx';
import { CreateBlogPage } from '../pages/createBlogPage/CreateBlogPage.tsx';
import { CreatePostPage } from '../pages/createPostPage/CreatePostPage.tsx';
import { EditBlogPage } from '../pages/editBlogPage/EditBlogPage.tsx';
import { EditPostPage } from '../pages/editPostPage/EditPostPage.tsx';
import { LoginPage } from '../pages/loginPage/LoginPage.tsx';
import { PostPage } from '../pages/postPage/PostPage.tsx';
import { PostsPage } from '../pages/postsPage/PostsPage.tsx';
import { RegisterPage } from '../pages/registerPage/RegisterPage.tsx';

export const router = createBrowserRouter([
    {
        element: (
            <AuthProvider>
                <RootLayout />
            </AuthProvider>
        ),
        errorElement: <NotFound />,
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
                    { path: '/blogs/:id/posts', element: <PostsPage /> },
                    { path: '/posts/:id', element: <PostPage /> },
                    {
                        element: <RequireAuth />,
                        children: [
                            { path: '/blogs/create', element: <CreateBlogPage /> },
                            { path: '/blogs/:id/edit', element: <EditBlogPage /> },
                            { path: '/posts/:id/edit', element: <EditPostPage /> },
                            { path: '/blogs/:id/posts/create', element: <CreatePostPage /> },
                        ],
                    },
                ],
            },
        ],
    },
]);
