import { Routes, Route } from 'react-router-dom';
import FormLogin from './components/FormLogin/FormLogin';
import FormRegister from './components/FormLogin/FormRegister';
import FormValidateOtp from './components/FormLogin/FormValidateOtp';
// import Content from './components/content/Content';
import { Provider } from 'react-redux';
import store from './redux/store/store'
import Header from './components/header/Header';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import CreatePost from './Pages/CreatePost';

function App() {
    return (
        <Provider store={store}>
            <div className="container">
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path='/create-post' element={<CreatePost />} />
                    <Route path="/login" element={<FormLogin />} />
                    <Route path="/register" element={<FormRegister />} />
                    <Route path="/validate-otp" element={<FormValidateOtp />} />
                </Routes>
                {/* <div className="content">
                    <div className="empty">1</div>
                    <div className="main">
                        <Content />
                    </div>
                    <div className="empty">1</div>
                </div> */}
            </div>
        </Provider>
    );
}

export default App;
