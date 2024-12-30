<script setup>
import { mdiLaptop } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import TableLaptops from '@/components/TableLaptops.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiLaptop" title="Laptops" main>
      </SectionTitleLineWithButton>


      <CardBox class="mb-6" has-table>
        <TableLaptops />
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
</template>
