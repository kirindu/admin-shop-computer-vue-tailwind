<script setup>
import { computed, ref } from 'vue'
//import { useMainStore } from '@/stores/main'
import {mdiClipboardFlowOutline} from '@mdi/js'

import UserShopCompuerAPI from "@/api/UserShopComputerAPI.js"


const mov = ref([]);

const size = 24; // Tamaño del ícono en píxeles
const mdiIcon = mdiClipboardFlowOutline; // Este es el icono que estás mostrando



defineProps({
  checkable: Boolean
})

try {

  const { data } = await UserShopCompuerAPI.getShopMovement();

  mov.value = data;
  
} catch (error) {
  error.value = `Ocurrio el siguiente error al intentar llamar al servicio de post: ${error}`;
  
}


</script>

<template>




  <table>
    <thead>
      <tr>
        <th/>
        <th />
        <th>Shop Computer</th>
        <th>User</th>
        <th>State</th>
        <th>Date</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="movement in mov.shopMovement" :key="movement.id">
        <TableCheckboxCell" />
        <td class="border-b-0 lg:w-6 before:hidden">


          <div class="icon-container">

    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      role="img"
      aria-label="Example Icon"
    >
      <path :d="mdiIcon" />
    </svg>
  </div>
  

        </td>
        <td data-label="Name">
          {{ movement.state }}
        </td>
        <td data-label="Company">
          {{  }}
        </td>
        <td data-label="City">
          {{ }}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
       
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          
        </td>
      </tr>
    </tbody>
  </table>

</template>


<style>
.icon-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>