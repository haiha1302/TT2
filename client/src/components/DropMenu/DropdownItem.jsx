import { Link } from "react-router-dom";

const DropdownItem = (props) => {
    return (
        <Link to={props.path} className='modal-item'>
            {props.title}
        </Link>
    );
};

export default DropdownItem;