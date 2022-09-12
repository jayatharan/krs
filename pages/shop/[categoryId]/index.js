import Shop from "../../../components/shop/Shop";
import { useRouter } from 'next/router'

export default function ShopNow () {
    const router = useRouter()
    const {categoryId} = router.query;

    return (
        <Shop categoryId={categoryId} />
    )
}