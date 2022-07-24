import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link, useParams } from 'react-router-dom';
// import { Context } from '../../context/Context';
import './singlePost.css';
import http from '../utils/http';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailPost } from '../redux/slice/portSlice';

export default function SinglePost() {
    const { id } = useParams();
    const post = useSelector((state) => state.Posts.detailPost.post);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailPost(id));
    }, [id, dispatch]);

    const handleDelete = async () => {
        try {
            await http.delete(`/posts/${post._id}`, {
                // data: { username: user.username },
            });
            window.location.replace('/');
        } catch (err) {}
    };

    const handleUpdate = async () => {
        try {
            await http.put(`/posts/${post._id}`, {
                // username: user.username,
                title,
                desc,
            });
            setUpdateMode(false);
        } catch (err) {}
    };

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post?.photo && <img src={post?.photo ? post?.photo : null} alt="" className="singlePostImg" />}
                {updateMode ? (
                    <input
                        type="text"
                        value={title}
                        className="singlePostTitleInput"
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                    />
                ) : (
                    <h1 className="singlePostTitle">
                        {title}
                        {/* {post.username === user?.username && (
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                            </div>
                        )} */}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post?.username}`} className="link">
                            <b> {post?.author_name}</b>
                        </Link>
                    </span>
                    {/* <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span> */}
                </div>
                {updateMode ? (
                    <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} />
                ) : (
                    <>
                        {/* <p className="singlePostDesc">{desc}</p> */}
                        <div dangerouslySetInnerHTML={{ __html: desc }} />
                    </>
                )}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>
        </div>
    );
}
