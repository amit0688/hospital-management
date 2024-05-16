import React from 'react'
import Navbar from '../componenets/Navbar.componenet';
import Routers from '../routes/Routers';
import Footer from '../componenets/Footer';

function Layout() {
  return (
    <>
    <Navbar/>
    <main>
        <Routers />
    </main>
    <Footer />
    </>
  )
}

export default Layout;