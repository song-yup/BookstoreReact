import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 메뉴바 컴포넌트 로드
import Clientmenubar from './layouts/clientmenubar.js'; // 클라이언트 메뉴바
import Adminmenubar from './layouts/adminMenubar.js'; // 관리자 메뉴바
import Footer from './layouts/footer.js';

// 페이지들...
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
  let location = useLocation(); // 현재 URL 경로를 가져옵니다.
  
  // EBooks 페이지일 때 메뉴바를 표시하지 않습니다.
  if (location.pathname.startsWith('/books/ebooks/')) {
    return null; // 메뉴바가 필요 없으므로 null을 반환합니다.
  } else if (location.pathname.startsWith('/admin')) {
    return <Adminmenubar />;
  } else {
    return <Clientmenubar />;
  }
}

function App() {

  useEffect(() => {
    // 서버에서 렌더링된 HTML 문서에서 CSRF 토큰을 가져오는 로직
    const csrfTokenMeta = document.querySelector("meta[name='_csrf']");

    // CSRF 토큰이 존재하는지 확인 후 요청 헤더에 추가
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
