import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CategoryBar from './components/layout/CategoryBar';
import ContentBox from './components/layout/ContentBox';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import FullscreenImageViewer from './components/ui/FullscreenImageViewer';
import Login from './pages/authorization/Login';
import Signup from './pages/authorization/Signup';
import CategoryDetail from './pages/category/CategoryDetail';
import CategoryForm from './pages/category/CategoryForm';
import CategoryList from './pages/category/CategoryList';
import TaskList from './pages/task/TaskList';
import TaskOfferDetail from './pages/task/TaskOfferDetail';
import TaskOfferForm from './pages/task/TaskOfferForm';
import TaskRequestDetail from './pages/task/TaskRequestDetail';
import TaskRequestForm from './pages/task/TaskRequestForm';
import UserDetail from './pages/user/UserDetail';
import UserForm from './pages/user/UserForm';
import UserList from './pages/user/UserList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <CategoryBar />
        <ContentBox>
          <Routes>
            <Route path="/categories/edit/:id" element={<CategoryForm />} />
            <Route path="/categories/:id" element={<CategoryDetail />} exact />
            <Route path="/categories/page" element={<CategoryList />} exact />
            <Route path="/categories/edit/:id" element={<CategoryForm />} exact />
            <Route path="/categories/new" element={<CategoryForm />} exact />
            <Route path="/tasks/offers/page" element={<TaskList />} exact />
            <Route path="/tasks/requests/page" element={<TaskList />} exact />
            <Route path="/tasks/offers/category/:categoryId/page" element={<TaskList />} exact />
            <Route path="/tasks/requests/category/:categoryId/page" element={<TaskList />} exact />
            <Route path="/tasks/requests/new/:categoryId" element={<TaskRequestForm />} />
            <Route path="/tasks/requests/edit/:id" element={<TaskRequestForm />} />
            <Route path="/tasks/requests/:id" element={<TaskRequestDetail />} />
            <Route path="/tasks/offers/:id" element={<TaskOfferDetail />} />
            <Route path="/tasks/offers/new/:categoryId" element={<TaskOfferForm />} />
            <Route path="/tasks/offers/edit/:id" element={<TaskOfferForm />} />
            <Route path="/auth/login" element={<Login />} exact />
            <Route path="/auth/signup" element={<Signup />} exact />
            <Route path="/users/page" element={<UserList />} exact />
            <Route path="/users/:userId" element={<UserDetail />} exact />
            <Route path="/users/edit/:id" element={<UserForm />} exact />
            <Route path="/tasks/image/:taskId/:index" element={<FullscreenImageViewer />} />
          </Routes>
        </ContentBox>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
