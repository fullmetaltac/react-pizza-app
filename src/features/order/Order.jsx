import {useEffect} from "react";
import OrderItem from "./OrderItem.jsx";
import UpdateOrder from "./UpdateOrder.jsx";
import {getOrder} from "../../services/apiRestaurant.js";
import {useFetcher, useLoaderData} from "react-router-dom";
import {calcMinutesLeft, formatCurrency, formatDate,} from "../../utils/helpers";

function Order() {
    const fetcher = useFetcher();
    const order = useLoaderData();

    useEffect(() => {
            if (!fetcher.data && fetcher.state === "idle")
                fetcher.load("/menu");
        },
        [fetcher]
    );

    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    return (
        <div className="py-6 px-4 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">Order #{id} status</h2>

                <div className="space-x-2">
                    {
                        priority &&
                        <span className="bg-red-500 rounded-full py-1 px-3
                         text-sm uppercase text-red-50 tracking-wide">
                            Priority
                        </span>}
                    <span className="bg-green-500 rounded-full py-1 px-3
                         text-sm uppercase text-green-50 tracking-wide">
                        {status} order
                    </span>
                </div>
            </div>

            <div className="flex flex-wrap items-center justify-between
             gap-2 bg-stone-200 py-5 px-6">
                <p className="font-medium">
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                        : "Order should have arrived"}
                </p>
                <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
            </div>

            <ul className="dive-stone-200 divide-y border-b border-t">
                {cart.map((item) => (
                    <OrderItem
                        item={item}
                        key={item.pizzaId}
                        isLoadingIngredients={fetcher.state === 'loading'}
                        ingredients={
                            fetcher?.data?.find((el) => el.id === item.pizzaId)
                                ?.ingredients ?? []
                        }
                    />
                ))}
            </ul>

            <div className="space-y-2 bg-stone-200 py-5 px-6">
                <p className="text-sm font-medium text-stone-600">
                    Price pizza: {formatCurrency(orderPrice)}
                </p>
                {
                    priority &&
                    <p className="text-sm font-medium text-stone-600">
                        Price priority: {formatCurrency(priorityPrice)}
                    </p>
                }
                <p className="font-bold">
                    To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
                </p>
            </div>

            {!priority && <UpdateOrder order={order}/>}

        </div>
    );
}

export async function loader({params}) {
    return await getOrder(params.orderId);
}

export default Order;
