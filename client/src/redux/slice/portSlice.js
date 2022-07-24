import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../utils/http';

export const createPost = createAsyncThunk('postSlice/create', async (dataPost) => {
    const res = await http.post('/posts/create', dataPost);
    return res.data;
});

export const getAllPosts = createAsyncThunk('postSlice/getAllPosts', async () => {
    const res = await http.get('/posts/all-posts');
    return res.data;
});

export const getDetailPost = createAsyncThunk('/postSlice/getDetailPosts', async (idPost) => {
    const res = await http.post(`/posts/${idPost}`)
    return res.data
})

const postSlice = createSlice({
    name: 'Posts',
    initialState: {
        postId: null,
        posts: [],
        detailPost: {}
    },
    extraReducers: {
        [getAllPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },

        [getDetailPost.fulfilled]: (state, action) => {
            state.detailPost = action.payload
        }
    },
});

export default postSlice.reducer;
