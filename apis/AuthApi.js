import BaseApi from "./BaseApi";

class AuthApiImpl extends BaseApi {

    async user() {
        return await this.getAsync("auth/user", {})
    }

    async login(data) {
        return await this.postAsync("auth/login", {}, data)
    }

    async register(data) {
        return await this.postAsync("auth/register", {}, data)
    }

}

const AuthApi = new AuthApiImpl();

export default AuthApi;