import { Outlet, NavLink } from 'react-router-dom';
export const AppLayout = () => {
    return (
        <div className="container">
            <aside className="aside">
                <NavLink to="/blogs">Blogs</NavLink>
                <NavLink to="/posts">Posts</NavLink>
            </aside>

            <main>
                <Outlet />
            </main>
        </div>
    );
};
