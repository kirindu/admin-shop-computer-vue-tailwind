<script setup>
import { onMounted} from 'vue';


import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import { mdiClipboardFlowOutline} from '@mdi/js'

import {useMovStore} from "@/stores/movements.js";
const storeMov = useMovStore();

import useFormatDate from "@/composables/useFormatDate.js";
const { formattingDate } = useFormatDate();

const size = 24; // Tamaño del ícono en píxeles
const mdiIcon = mdiClipboardFlowOutline ; // Este es el icono que estás mostrando


defineProps({
  checkable: Boolean
})



onMounted(() => {

 
})

 

</script>

<template>

<table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th />
        <th>Shop Computer</th>
        <th>User</th>
        <th>State</th>
        <th>Date</th>
        <th>Notes</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="mov in storeMov.movs" :key="mov._id">
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
        {{mov.shopComputer.name}}
        </td>
        <td data-label="Company">
          {{mov.user.name}}
        </td>
        <td data-label="City">
          {{mov.state}}
        </td>
        <td data-label="City">
          {{formattingDate(mov.dateCheckIn, "MMMM D, YYYY h:mm A")}}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <span class="text-gray-500 dark:text-slate-400" > {{mov.notes}}</span>
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