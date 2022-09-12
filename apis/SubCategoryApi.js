import BaseApi from "./BaseApi";

class SubCategoryApiImpl extends BaseApi {

    async getSubCategoriesAsync() {
        return await this.getAsync("sub-categories", {});
    }

    async addSubCategoryAsync(data) {
        return await this.postAsync("sub-categories", {}, data)
    }

    async getSubCategoryAsync(id) {
        return await this.getAsync(`sub-categories/${id}`, {})
    }

    async updateSubCategoryAsync(id, data){
        return await this.putAsync(`sub-categories/${id}`, {}, data)
    }

    async deleteSubCategoryAsync(id){
        return await this.deleteAsync(`sub-categories/${id}`, {})
    }

}

const SubCategoryApi = new SubCategoryApiImpl();

export default SubCategoryApi;