import BaseApi from "./BaseApi";

class ProductApiImpl extends BaseApi {

    async getProductsAsync(params={}) {
        return await this.getAsync("products", params);
    }

    async addProductAsync(data) {
        return await this.postAsync("products", {}, data);
    }

}

const ProductApi = new ProductApiImpl();

export default ProductApi;