import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import http from '../utils/http';
import '../sass/home.scss';
import Posts from '../components/Post/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../redux/slice/portSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.Posts);
    
    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);
    return (
        <div className="">
            <Posts posts={posts} />
        </div>
    );
};

export default Home;
