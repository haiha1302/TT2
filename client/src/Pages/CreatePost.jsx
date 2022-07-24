import { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { createPost } from '../redux/slice/portSlice';
import QuillEditor from '../components/Editor/QuillEditor';
// import ButtonSubmit from '../components/ButtonSubmit/ButtonSubmit';
import '../sass/createPost.scss';
import http from '../utils/http';
import './write.css';
// import { GENERATE_ID } from '../redux/slice/portSlice';

const CreatePost = () => {
    // const postId = uuidv4()
    // console.log(postId);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [file, setFile] = useState(null);
    const author_infor = useSelector((state) => state.User.inforUserLogin);
    const navigate = useNavigate();
    console.log(content);
    // const dispatch = useDispatch();

    // const onEditorChange = (value) => {
    //     setContent(value);
    //     // console.log(post);
    // };

    // const onFilesChange = (files) => setFiles(files);

    // const onPostChange = (e) => {
    //     const { name, value } = e.target;
    //     setPost({
    //         ...post,
    //         [name]: value,
    //     });
    // };

    // const onSubmitPost = (e) => {
    //     e.preventDefault();

    //     const variables = {
    //         title: title,
    //         content: content,
    //         create_at: new Date(),
    //         author_id: author_infor._id,
    //         author_name: author_infor.username,
    //     };

    //     dispatch(createPost(variables));
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPost = {
            author_id: author_infor._id,
            author_name: author_infor.username,
            title,
            content,
            createAt: new Date().toString(),
        };

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            // data.append('postId', postId);
            data.append('file', file);

            try {
                const urlImg = await http.post('/posts/uploadFiles', data);
                // setImgUrl(urlImg.data.url)
                newPost.photo = urlImg.data.url;
            } catch (err) {}
        }

        try {
            const res = await http.post('/posts/create', newPost);
            console.log(res.data);
            navigate(`/posts/${res.data.insertedId}`, { replace: true });
            // window.location.replace('/posts/' + res.data.insertedId);
        } catch (err) {}
    };

    return (
        <div className="write">
            <img className="writeImg" src={file ? URL.createObjectURL(file) : null} alt="" />
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    {/* <textarea
                        placeholder="Tell your story..."
                        type="text"
                        className="writeInput writeText"
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea> */}
                    {/* <QuillEditor
                    placeholder={'Nhập nội dung tại đây'}
                    // onEditorChange={onEditorChange}
                    // onFilesChange={onFilesChange}
                /> */}
                    <ReactQuill placeholder="Nhapj gi do" value={content} onChange={(value) => setContent(value)} />
                </div>
                <button className="writeSubmit" type="submit">
                    Publish
                </button>
            </form>
        </div>
        // <div className="container-post">
        //     {file && <img className="writeImg" src={URL.createObjectURL(file)} alt="" />}
        //     <form className="writeForm" onSubmit={handleSubmit}>
        //         <div className="writeFormGroup">
        //             <label htmlFor="fileInput">
        //                 <i className="writeIcon fas fa-plus"></i>
        //             </label>
        //             <input
        //                 type="file"
        //                 id="fileInput"
        //                 style={{ display: 'none' }}
        //                 onChange={(e) => setFile(e.target.files[0])}
        //             />
        //             <input
        //                 type="text"
        //                 placeholder="Title"
        //                 className="writeInput"
        //                 autoFocus={true}
        //                 onChange={(e) => setTitle(e.target.value)}
        //             />
        //         </div>
        //         <div className="writeFormGroup">

        //             <textarea
        //                 placeholder="Tell your story..."
        //                 type="text"
        //                 className="writeInput writeText"
        //                 onChange={(e) => setContent(e.target.value)}
        //             ></textarea>
        //         </div>
        //         <button className="writeSubmit" type="submit">
        //             Publish
        //         </button>
        //     </form>
        //     {/* <form onSubmit={onSubmitPost}>
        //         <input
        //             type={'text'}
        //             placeholder="Tiêu đề bài viết"
        //             value={title}
        //             onChange={(e) => setTitle(e.target.value)}
        //             required
        //             name="title"
        //         />

        //         <QuillEditor
        //             placeholder={'Nhập nội dung tại đây'}
        //             onEditorChange={onEditorChange}
        //             onFilesChange={onFilesChange}
        //         />

        //         <div className="submit-btn">
        //             <ButtonSubmit event="Đăng bài" />
        //         </div>
        //     </form> */}
        // </div>
    );
};

export default CreatePost;
