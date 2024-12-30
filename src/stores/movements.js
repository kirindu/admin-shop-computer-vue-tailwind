import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import UserShopCompuerAPI from "@/api/UserShopComputerAPI.js"

export const useMovStore = defineStore("movs", () => {
  const movs = ref([]);
  const loading = ref(false);
  const error = ref("");

  onMounted(async () => {
    loading.value = true;

    try {
      const { data } = await UserShopCompuerAPI.getShopMovement();
      movs.value = data.shopMovements; // Recuerda que data es el wrap de axios

    } catch (err) {
      error.value = `Ocurrio el siguiente error al intentar llamar al servicio de usuarios: ${err}`;
    } finally {
      loading.value = false;
    }
  });

  return {
    movs,
    loading,
    error,
  };
});
