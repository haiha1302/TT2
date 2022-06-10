import React, { useRef, useEffect } from 'react';
import Navbar from './Navbar';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';

const Header = () => {
    const scrollRef = useRef(null);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                scrollRef.current.classList.add('sticky')
            } else {
                scrollRef.current.classList.remove('sticky')
            }
        })

        return () => {
            window.removeEventListener('scroll', () => { })
        }
    })
    return (
        <header>
            <div className="header" ref={scrollRef}>
                <Navbar />
                <form>
                    <input type="text" placeholder='Search...' />
                    <span>
                        <AiIcons.AiOutlineSearch />
                    </span>
                </form>
                <nav>
                    content
                </nav>
                <div>
                    <BiIcons.BiUserCircle />
                </div>
            </div>
        </header>
    )
}

export default Header