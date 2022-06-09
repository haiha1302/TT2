import React, { useState } from 'react'
import { Modal } from './Modal';

const Content = () => {
    const [open, setOpen] = useState(false);
    return (
        <main>
            <div className="create_infor">
                <div className='create_infor_fill'>
                    <div className="avatar">
                        <img src="https://billboardvn.vn/wp-content/uploads/2019/04/Ava-Max-2019-cr-Lauren-Dunn-billboard-1548.jpg" alt="" />
                    </div>
                    <div className='create_infor_fill_modal'>
                        <div onClick={() => setOpen(true)}>
                            <span>What are you thinking?</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                open && <Modal turnOn={setOpen} />
            }
        </main>
    )
}

export default Content