<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import { mdiLaptop} from '@mdi/js'

const size = 24; // Tamaño del ícono en píxeles
const mdiIcon = mdiLaptop; // Este es el icono que estás mostrando


defineProps({
  checkable: Boolean
})

const mainStore = useMainStore()

const items = computed(() => mainStore.clients)

const perPage = ref(5)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(() =>
  items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === client.id)
  }
}
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
      <tr v-for="client in itemsPaginated" :key="client.id">
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
          {{ client.name }}
        </td>
        <td data-label="Company">
          {{ client.company }}
        </td>
        <td data-label="City">
          {{ client.city }}
        </td>
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="client.created">{{
            client.created
          }}</small>
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