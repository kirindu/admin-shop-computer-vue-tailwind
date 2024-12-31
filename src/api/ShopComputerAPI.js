import api from "@/lib/axios.js";

export default {

    async getUserShopComputer(ssnCode) {

        return await api.get('/users/' + ssnCode);
    },

    async getAllUserShopComputer() {
        return await api.get('/users/all', {});
    },

    async getShopComputer(rfidCode) {
        return await api.get('/shop/' + rfidCode);
    },

    async getAllShopComputer() {
        return await api.get('/shop/all',{});
    },

    // async getShopMovement(rfidCode) {
    //     return await api.get('/movement/' + rfidCode);
    // },

    async getShopMovement() {
        return await api.get('/movement/',{});
    },

    async createShopMovement(values) {
        return await api.post('/movement/', values, {});
    },


}
