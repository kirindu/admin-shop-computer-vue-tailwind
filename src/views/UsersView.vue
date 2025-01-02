<script setup>
import { mdiAccountMultiple, mdiPlus } from '@mdi/js';
import SectionMain from '@/components/SectionMain.vue';
import TableUsers from '@/components/TableUsers.vue';
import CardBox from '@/components/CardBox.vue';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseButtons from '@/components/BaseButtons.vue';

import { openModal } from "@kolirt/vue-modal";
import { defineAsyncComponent } from "vue";


// Metodos

const openUserAddModal = async () => {

await openModal(
  defineAsyncComponent(() => import("@/components/modals/UserAddModal.vue")),
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
      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Users" main>


        <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="white" :icon="mdiPlus" small @click="openUserAddModal"  />
          </BaseButtons>
        


      </SectionTitleLineWithButton>


      <CardBox class="mb-6" has-table>
        <TableUsers />
      </CardBox>

    </SectionMain>
  </LayoutAuthenticated>
  <ModalTarget />
</template>
