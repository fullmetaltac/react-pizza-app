import CartItem from "./CartItem.jsx";
import EmptyCart from "./EmptyCart.jsx";
import Button from "../../ui/Button.jsx";
import {getUser} from "../user/userSlice.js";
import LinkButton from "../../ui/LinkButton.jsx";
import {clearCart, getCart} from "./cartSlice.js";
import {useDispatch, useSelector} from "react-redux";

function Cart() {
    const cart = useSelector(getCart);
    const username = useSelector(getUser);
    const dispatch = useDispatch();

    if (!cart.length) return <EmptyCart/>

    return (<div className="py-3 px-4">
        <LinkButton to="/menu">&larr; Back to menu </LinkButton>
        <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
        <ul className="divide-y divide-stone-200 border-b mt-3">
            {cart.map(((item) => <CartItem item={item} key={item.pizzaId}/>))}
        </ul>
        <div className="mt-6 space-x-2">
            <Button type="primary" to="/order/new">Order pizzas</Button>
            <Button type="secondary" onClick={() => dispatch(clearCart())}>
                Clear cart
            </Button>
        </div>
    </div>);
}

export default Cart;