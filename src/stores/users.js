import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import UserShopCompuerAPI from "@/api/ShopComputerAPI.js"

export const useUserShopStore = defineStore("users", () => {
  const users = ref([]);
  const loading = ref(false);
  const error = ref("");

  onMounted(async () => {
    loading.value = true;

    try {
      const { data } = await UserShopCompuerAPI.getAllUserShopComputer();
      users.value = data.user; // Recuerda que data es el wrap de axios

    } catch (err) {
      error.value = `Ocurrio el siguiente error al intentar llamar al servicio de usuarios: ${err}`;
    } finally {
      loading.value = false;
    }
  });

  return {
    users,
    loading,
    error,
  };
});
