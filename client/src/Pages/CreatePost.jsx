import { useState } from 'react';
// import ReactQuill from 'react-quill';
import QuillEditor from '../components/Editor/QuillEditor';

const CreatePost = () => {
    const [post, setPost] = useState('')
    const [files, setFiles] = useState([])

    const onEditorChange = value => setPost(value)
    
    const onFilesChange = files => setFiles(files)

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <QuillEditor
                placeholder={'Nhập nội dung tại đây'}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
            />
        </div>
    );
};

export default CreatePost;
