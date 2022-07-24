import { Routes, Route } from 'react-router-dom';
import FormLogin from './components/FormLogin/FormLogin';
import FormRegister from './components/FormLogin/FormRegister';
import FormValidateOtp from './components/FormLogin/FormValidateOtp';
import Header from './components/header/Header';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import CreatePost from './Pages/CreatePost';
import SinglePost from './Pages/SinglePost';
import Settings from './Pages/Settings';

function App() {
    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="/post/:id" element={<SinglePost />} />
                <Route index element={<Home />} />
                <Route path="/profile" element={<Settings />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/login" element={<FormLogin />} />
                <Route path="/register" element={<FormRegister />} />
                <Route path="/validate-otp" element={<FormValidateOtp />} />
            </Routes>
        </div>
    );
}

export default App;
