<script setup>

import TableCheckboxCell from '@/components/TableCheckboxCell.vue';
import { mdiAccount, mdiPencil, mdiTrashCan} from '@mdi/js';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseButton from '@/components/BaseButton.vue';

import { openModal } from "@kolirt/vue-modal";
import { defineAsyncComponent } from "vue";


const size = 24; // Tamaño del ícono en píxeles
const mdiIcon = mdiAccount; // Este es el icono que estás mostrando



import {useUserShopStore} from "@/stores/users.js";
const userShop = useUserShopStore();

defineProps({
  checkable: Boolean
});

// Metodos
const openUserEditModal = async () => {

await openModal(
  defineAsyncComponent(() => import("@/components/modals/UserEditModal.vue")),
  {
    test: "some props",
  }
)
  // runs when modal is closed via confirmModal
  .then((data) => {
    console.log("success", data);
  })
  // runs when modal is closed via closeModal or esc
  .catch(() => {
    console.log("catch");
  });
};



  const estado = (param) => {
    if(param == '1') return 'Active'
    else return 'Inactive'
}


</script>

<template>

  <table>
      <thead>
        <tr>
          <th v-if="checkable" />
          <th />
          <th>Name</th>
          <th>Code</th>
          <th>State</th>
          <th>Notes</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userShop.users" :key="user._id">
          <TableCheckboxCell v-if="checkable" @checked="checked($event, client)" />
          <td class="border-b-0 lg:w-6 before:hidden">
  
  
  
            <div class="icon-container">
      <!-- Icono SVG utilizando MDI -->
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
        {{user.name}}
          </td>
          <td data-label="Code">
            {{user.ssn}}
          </td>
          <td data-label="State">
            {{estado(user.state)}}
          </td>
          <td data-label="Notes" class="lg:w-1 whitespace-nowrap">
            <span class="text-gray-500 dark:text-slate-400" > {{user.notes}}</span>
          </td>
          <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiPencil" small  @click="openUserEditModal"  />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              
            />
          </BaseButtons>
        </td>
        </tr>
      </tbody>
    </table>
    <ModalTarget />
  </template>
<style>
.icon-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>