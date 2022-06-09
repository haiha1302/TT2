import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';


export const Modal = ({ turnOn }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="modal" onClick={() => turnOn(false)}>
            <form>
                <div className='title'>
                    <h2>Create Post</h2>
                </div>
                <div className="form">
                    <div className="form-group"></div>
                </div>
            </form>
        </div>
    )
}
