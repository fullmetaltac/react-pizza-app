import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/Username.jsx";

function Header() {
    return (
        <header className="bg-yellow-500 px-4 py-3 sm:px-6
         uppercase border-b border-stone-200
         flex items-center justify-between">
            <Link to="/" className="tracking-widest">
                React Pizza Co.
            </Link>
            <SearchOrder/>
            <Username/>
        </header>
    );
}

export default Header;
