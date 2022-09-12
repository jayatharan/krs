import { useRouter } from 'next/router'
import IndividualProduct from '../../../../components/product/IndividualProduct';
import dbConnect from '../../../../lib/dbConnect';
import Product from '../../../../models/Product';

export default function ShopNow ({product}) {

    return (
        <IndividualProduct product={product} />
    )
}

export async function getServerSideProps(context) {
    const {categoryId, productId} = context.query;

    await dbConnect()

    const product = await Product.findById(productId);

    if(!product){

    }

    return {props:{product:JSON.parse(JSON.stringify(product))}}

}