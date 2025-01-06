<script setup>
import { onMounted} from 'vue';


import TableCheckboxCell from '@/components/TableCheckboxCell.vue';
import { mdiClipboardFlowOutline, mdiPencil, mdiTrashCan} from '@mdi/js';
import BaseButtons from '@/components/BaseButtons.vue';
import BaseButton from '@/components/BaseButton.vue';

import { openModal } from "@kolirt/vue-modal";
import { defineAsyncComponent } from "vue";




import {useShopStore} from "@/stores/shopComputers.js";
const storeShop = useShopStore();

const size = 24; // Tamaño del ícono en píxeles
const mdiIcon = mdiClipboardFlowOutline ; // Este es el icono que estás mostrando

import useSweetAlert2Notification from "@/composables/useSweetAlert2";
const { showSweetAlert, alertResult } = useSweetAlert2Notification();

import useToastNotification from "@/composables/useToast";
const { showToast } = useToastNotification();

import { useRouter } from 'vue-router'
const router = useRouter()

// Importamos el api
import ShopAPI from '@/api/ShopComputerAPI'


defineProps({
  checkable: Boolean
})

// Metodos
const openLaptopEditModal = async (laptop) => {

await openModal(
  defineAsyncComponent(() => import("@/components/modals/LaptopEditModal.vue")),
  {
    laptop: laptop,
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



onMounted(() => {


  // setTimeout(() => {

  // }, 25)

})

const estado = (param) => {
    if(param == '1') return 'Active'
    else return 'Inactive'
}

const deleteLaptop = async (laptop) => {

    showSweetAlert({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      allowOutsideClick: false,
    }).then(async () => {
      if (alertResult.value.isConfirmed) {

        try {
          const { data } = await ShopAPI.deleteShopComputer(laptop._id);
          if (data.ok) {
            showSweetAlert({
              title: "Deleted!",
              text: "Shop Computer has been deleted.",
              icon: "success",
              showCloseButton: true,
              allowOutsideClick: false
            }).then(() => {
              router.go();
            });
          } else {
            await showSweetAlert({
              title: "Shop Computer hasn't been deleted!",
              text: data.msg,
              icon: "warning",
              showCloseButton: true,
              allowOutsideClick: false
            }).then(() => {
              router.go();
            });
          }
        } catch (error) {
          const data = error.response.data;
          showToast({
            message: data.msg,
            type: "error",
            position: "top",
            duration: 4000,
          });
        } finally {
          // loading.value = false;
        }
      }
    });

};


</script>

<template>

<table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Shop Computer</th>
        <th>RFID</th>
        <th>State</th>
        <th>Notes</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="laptop in storeShop.laptops" :key="laptop._id">
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
        <td data-label="Shop Computer">
     {{ laptop.name}}
        </td>
        <td data-label="RFID">
          {{ laptop.RFID}}
        </td>
        <td data-label="State">
          {{estado(laptop.state)}}
        </td>
        <td data-label="Notes" class="lg:w-1 whitespace-nowrap">
          <span class="text-gray-500 dark:text-slate-400" > {{laptop.notes}}</span>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiPencil" small  @click="openLaptopEditModal(laptop)"  />
            <BaseButton
              color="danger"
              :icon="mdiTrashCan"
              small
              @click="deleteLaptop(laptop)"

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
