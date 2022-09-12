import BaseApi from "./BaseApi";

class UserApiImpl extends BaseApi {

    async getUsersAsync(params) {
        return await this.getAsync("users", params);
    }

    async addUserAsync(data){
        return await this.postAsync("users", {}, data)
    }

    async getUserAsync(id){
        return await this.getAsync(`users/${id}`)
    }

    async updateUserAsync(id, data){
        return await this.putAsync(`users/${id}`, {}, data)
    }

    async deleteUserAsync(id){
        return await this.deleteAsync(`users/${id}`)
    }
}

const UserApi = new UserApiImpl();

export default UserApi;