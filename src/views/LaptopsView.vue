<script setup>
import { mdiLaptop, mdiPlus} from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import TableLaptops from '@/components/TableLaptops.vue';
import CardBox from '@/components/CardBox.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';

import { openModal } from "@kolirt/vue-modal";
import { defineAsyncComponent } from "vue";




// Metodos
const openLaptopAddModal = async () => {

  await openModal(
    defineAsyncComponent(() => import("@/components/modals/LaptopAddModal.vue")),
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


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiLaptop" title="Laptops" main>

        <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="white" :icon="mdiPlus" small @click="openLaptopAddModal"  />
          </BaseButtons>
        


      </SectionTitleLineWithButton>


      <CardBox class="mb-6" has-table>
        <TableLaptops />
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
  <ModalTarget />
</template>
