import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Menubar from './layouts/menubar.js';
import Footer from './layouts/footer.js';

import Books from '././pages/book/books.js';
import Book from '././pages/book/book.js';
import LogIn from './pages/user/login.js';
import AddBook from './pages/book/addBook.js';
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
import MobileMenubar from './layouts/mobilemenubar.js';
import { AuthProvider } from './pages/user/authcontext.js';
import { Mobile,PC } from './pages/reactresponsive.js';


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  
    return (
    <AuthProvider>
    <Router>
      <Mobile>
        <MobileMenubar />
      </Mobile>
      <PC>
        <Menubar />
      </PC>
      
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/book/:id" element={<Book />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/books/add" element={<AddBook />} />
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
      </Routes>
      
      <Footer />
    </Router>      
    </AuthProvider>

    );
}

export default App;
