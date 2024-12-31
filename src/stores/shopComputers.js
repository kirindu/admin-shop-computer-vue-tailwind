import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import ShopCompuerAPI from "@/api/ShopComputerAPI.js"

export const useShopStore = defineStore("laptops", () => {
  const laptops = ref([]);
  const loading = ref(false);
  const error = ref("");

  onMounted(async () => {
    loading.value = true;

    try {
      const { data } = await ShopCompuerAPI.getAllShopComputer();
      laptops.value = data.shopComputer; // Recuerda que data es el wrap de axios

    } catch (err) {
      error.value = `Ocurrio el siguiente error al intentar llamar al servicio de usuarios: ${err}`;
    } finally {
      loading.value = false;
    }
  });

  return {
    laptops,
    loading,
    error,
  };
});
