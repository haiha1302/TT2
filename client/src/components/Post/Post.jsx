import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

const Post = () => {
  const [like, setLike] = useState(false);
  return (
    <div className='post'>
      <div className="post_user">
        <div className="post_user_avatar">
          <img src="https://billboardvn.vn/wp-content/uploads/2019/04/Ava-Max-2019-cr-Lauren-Dunn-billboard-1548.jpg" alt="" />
        </div>
        <div className="post_user_name">
          <span>Hieu</span>
        </div>
      </div>
      <div className="post_content">
        <img src="https://billboardvn.vn/wp-content/uploads/2019/04/Ava-Max-2019-cr-Lauren-Dunn-billboard-1548.jpg" alt="" />
        <div className='emotion'>
          <span onClick={() => setLike(!like)}>
            {
              like ? <AiIcons.AiTwotoneLike style={{ color: "rgb(59 130 246)", }} /> : <BiIcons.BiLike />
            }
          </span>
          <span>
            <BiIcons.BiComment />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Post