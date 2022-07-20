import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import * as AiIcons from 'react-icons/ai';
import * as BiIcons from 'react-icons/bi';
import DropMenu from '../DropMenu/DropMenu';

const Header = () => {
    const [open, setOpen] = useState(false)
    const dataUserLogin = useSelector(state => state.User.infoUserLogin)
    const currentUser = dataUserLogin.user ? true : false
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
            window.removeEventListener('scroll', () => {})
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
                <div onClick={() => setOpen(!open)}>
                    {
                        currentUser === true ?
                        <>
                            {dataUserLogin.user?.username}
                            {open === true ? <DropMenu user={currentUser} dataUserLogin={dataUserLogin} /> : <></>}
                        </>
                        :
                        <>
                            <BiIcons.BiUserCircle />
                            {open === true ? <DropMenu user={dataUserLogin} /> : <></>}
                        </>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header