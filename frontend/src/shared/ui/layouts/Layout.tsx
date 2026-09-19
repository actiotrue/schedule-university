import { Outlet } from 'react-router';
import Nav from '../generic/Nav';
import Footer from '../generic/Footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
