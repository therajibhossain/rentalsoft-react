import http from "../http-common";

const endpoint = "/products";

class ProductDataService {    
    async getAll() {        
        return http.get(endpoint);
    }

    get(id) {
        return http.get(endpoint + `/${id}`);
    }

    create(data) {
        return http.post(endpoint, data);
    }

    update(id, data) {
        return http.put(endpoint + `/${id}`, data);
    }

    delete(id) {
        return http.delete(endpoint + `/${id}`);
    }

    findByTitle(title) {
        return http.get(endpoint + `?title=${title}`);
    }
}

export default new ProductDataService();