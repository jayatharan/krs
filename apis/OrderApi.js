import BaseApi from "./BaseApi";

class OrderApiImpl extends BaseApi {
    
    async initiateOrderAsync(data) {
        return await this.postAsync("orders", {}, data);
    }

    async getAllOrdersAsync(params) {
        return await this.getAsync("orders", params);
    }

    async getOrderAsync(id){
        return await this.getAsync(`orders/${id}`);
    }

    async updateOrderAsync(id, data){
        return await this.putAsync(`orders/${id}`, {}, data);
    }

    async deleteOrderAsync(id){
        return await this.deleteAsync(`orders/${id}`);
    }

    async addToCart(id, data){
        return await this.postAsync(`orders/${id}/cart`, {}, data);
    }

}

const OrderApi = new OrderApiImpl();

export default OrderApi;