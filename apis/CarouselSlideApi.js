import BaseApi from "./BaseApi";

class CarouselSlideApiImpl extends BaseApi {

    async getCarouselSlidesAsync(params={}) {
        return await this.getAsync("carousel-slide", params);
    }

    async addCarouselSlideAsync(data) {
        return await this.postAsync("carousel-slide", {}, data);
    }

    async getCarouselSlideAsync(id) {
        return await this.getAsync(`carousel-slide/${id}`, {})
    }

    async updateCarouselSlideAsync(id, data) {
        return await this.putAsync(`carousel-slide/${id}`, {}, data)
    }

    async deleteCarouselSlideAsync(id) {
        return await this.deleteAsync(`carousel-slide/${id}`, {})
    }
}

const CarouselSlideApi = new CarouselSlideApiImpl();

export default CarouselSlideApi;