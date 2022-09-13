import IndividualOrder from "../../components/order/IndividualOrder";
import dbConnect from "../../lib/dbConnect";
import Order from '../../models/Order';

export default function OrderView({order}){
    return (
        <IndividualOrder order={order} />
    )
}

export async function getServerSideProps(context) {
    const {orderId} = context.query;

    await dbConnect()

    const order = await Order.findById(orderId)

    if(!order){

    }

    return {props:{order:JSON.parse(JSON.stringify(order))}}
}