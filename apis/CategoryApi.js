import BaseApi from "./BaseApi";

class CategoryApiImpl extends BaseApi {

    async getCategoriesAsync() {
        return await this.getAsync("categories", {});
    }

    async addCategoryAsync(data) {
        return await this.postAsync("categories", {}, data)
    }

    async getCategoryAsync(id) {
        return await this.getAsync(`categories/${id}`, {})
    }

    async updateCategoryAsync(id, data){
        return await this.putAsync(`categories/${id}`, {}, data)
    }

    async deleteCategoryAsync(id){
        return await this.deleteAsync(`categories/${id}`, {})
    }

    async getProductsAsync(id, params={}){
        return await this.getAsync(`categories/${id}/products`, params)
    }

    async getSubCategoriesAsync(id, params={}){
        return await this.getAsync(`categories/${id}/sub-categories`, params)
    }
}

const CategoryApi = new CategoryApiImpl();

export default CategoryApi;