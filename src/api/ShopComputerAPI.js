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


    async addShopComputer(values) {
        const data = await api.post('/shop/', values, {});
        return data;
      },

  async addUser(values) {
    const data = await api.post('/users/', values, {});
    return data;
  },


  async deleteShopComputer(idLaptop) {

    const data = await api.delete('/shop/' + idLaptop, {});
    return data;

  },

  async deleteUser(idUser) {

    const data = await api.delete('/users/' + idUser, {});
    return data;

  },

  async editShopComputer(idLaptop, values) {

    const data = await api.put('/shop/' + idLaptop, values, {});
    return data;

  },

  async editUser(idUser, values) {

    const data = await api.put('/users/' + idUser, values, {});
    return data;

  },


}
