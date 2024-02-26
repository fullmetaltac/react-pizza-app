import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";

function Header() {
    return (
        <header>
            <Link to="/">React Pizza Co.</Link>
            <SearchOrder/>
            <p>Jonas</p>
        </header>
    );
}

export default Header;
