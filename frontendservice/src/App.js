import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryBar from './components/layout/CategoryBar';
import ContentBox from './components/layout/ContentBox';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Login from './pages/authorization/Login';
import Signup from './pages/authorization/Signup';
import CategoryForm from './pages/category/CategoryForm';
import CategoryList from './pages/category/CategoryList';
import TaskList from './pages/task/TaskList';
import UserList from './pages/user/UserList';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <CategoryBar />
        <ContentBox>
          <Routes>
            <Route path="/categories/page" element={<CategoryList />} exact />
            <Route path="/categories/edit/:id" element={<CategoryForm />} exact />

            <Route path="/tasks/offers/page" element={<TaskList />} exact />
            <Route path="/tasks/requests/page" element={<TaskList />} exact />

            <Route path="/auth/login" element={<Login />} exact />
            <Route path="/auth/signup" element={<Signup />} exact />

            <Route path="/users/page" element={<UserList />} exact />

          </Routes>
        </ContentBox>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
