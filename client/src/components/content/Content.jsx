import React, { useRef } from 'react'
import Post from '../Post/Post'

const Content = () => {
    const textRef = useRef();
    const Check = () => {
        console.log(textRef.current.innerText);
    }
    return (
        <main>
            <div className="create_infor">
                <div className='create_infor_fill'>
                    <div className="avatar">
                        <img src="https://billboardvn.vn/wp-content/uploads/2019/04/Ava-Max-2019-cr-Lauren-Dunn-billboard-1548.jpg" alt="" />
                    </div>
                    <div className='create_infor_fill_modal'>
                        <div aria-label='What are you thinking' ref={textRef} contentEditable="true" data-text="What are you thinking" className='text'></div>
                    </div>
                </div>
                <button onClick={Check}>Share</button>
            </div>
            <section>
                <Post />
                <Post />
            </section>
        </main>
    )
}

export default Content