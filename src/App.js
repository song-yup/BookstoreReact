import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Clientmenubar from './layouts/clientmenubar.js';
import Adminmenubar from './layouts/adminMenubar.js';
import Footer from './layouts/footer.js';

import Books from './pages/book/books.js';
import Book from './pages/book/book.js';
import LogIn from './pages/user/login.js';
import AddBook from './pages/admin/addBook.js';
import Join from './pages/user/join.js';
import Update from './pages/book/update.js';
import Mypage from './pages/user/mypage.js';
import UpdateUser from './pages/user/updateuser.js';
import Cart from './pages/cart/cart.js';
import Purchase from './pages/order/purchase.js';
import NewBooks from './pages/book/newbooks.js';
import Categorybooks from './pages/book/categorybooks.js';
import RankingBooks from './pages/book/rankingbooks.js';
import Searchbooks from './pages/book/searchbooks.js';
import Adminbook from './pages/admin/adminbook.js';
import Adminbooks from './pages/admin/adminbooks.js';
import Adminstock from './pages/admin/adminstock.js';
import Admincalculate from './pages/admin/admincalculate.js';
import Adminsearchbooks from './pages/admin/adminsearchbooks.js';
import { AuthProvider } from './pages/user/authcontext.js';
import Adminsearchstock from './pages/admin/adminsearchstock.js';
import Purchasesuccess from './pages/order/purchasesuccess.js';
import EBooks from './pages/book/ebook.js';

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import axios from "axios";

function MenubarSelector() {
  let location = useLocation();

  if (location.pathname.startsWith('/books/ebooks/')) {
    return null;
  } else if (location.pathname.startsWith('/admin')) {
    return <Adminmenubar />;
  } else {
    return <Clientmenubar />;
  }
}

function App() {

  useEffect(() => {
    const csrfTokenMeta = document.querySelector("meta[name='_csrf']");

    if (csrfTokenMeta) {
        const csrfToken = csrfTokenMeta.content;
        axios.defaults.headers.common["X-XSRF-TOKEN"] = csrfToken;
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <MenubarSelector />
        
        <Routes>
          <Route path="/books" element={<Books />} />
          <Route path="/books/book/:id" element={<Book />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/admin/books/add" element={<AddBook />} />
          <Route path="/join" element={<Join />} />
          <Route path="/books/book/update/:id" element={<Update />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/update" element={<UpdateUser />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/books/new" element={<NewBooks />} />
          <Route path="/:category/books" element={<Categorybooks />} />
          <Route path="/books/ranking" element={<RankingBooks />} />
          <Route path="/books/search/:bookname" element={<Searchbooks />} />
          <Route path="/admin/adminbooks" element={<Adminbooks />} />
          <Route path="/admin/adminbook/:id" element={<Adminbook />} />
          <Route path="/admin/adminstock" element={<Adminstock />} />
          <Route path="/admin/admincalculate" element={<Admincalculate />} />
          <Route path="/admin/adminsearch/:bookname" element={<Adminsearchbooks />} />
          <Route path="/admin/adminsearchstock/:bookname" element={<Adminsearchstock />} />
          <Route path="/purchase/success" element={<Purchasesuccess />} />
          <Route path="/books/ebooks/:id/:page" element={<EBooks />} />
        </Routes>
        
        <Footer />
      </Router>      
    </AuthProvider>
  );
}

export default App;
