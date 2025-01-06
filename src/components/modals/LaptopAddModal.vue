<script setup>
import { reactive, ref } from 'vue'
import { mdiBallotOutline, mdiAccount, mdiMail, mdiGithub } from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadioGroup from '@/components/FormCheckRadioGroup.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

import Spinner from '@/components/LoadingSpinner.vue'

import { closeModal, confirmModal } from '@kolirt/vue-modal'

// Importamos el api
import ShopAPI from '@/api/ShopComputerAPI'

import { useRouter } from 'vue-router'
const router = useRouter()

// Import composables

import useSweetAlert2Notification from '@/composables/useSweetAlert2'
const { showSweetAlert, alertResult } = useSweetAlert2Notification()

const loading = ref(false)

// Librerias para validar Formularios

// Estado reactivo del formulario
const form = reactive({
  name: "",
  RFID: "",
  notes: "",
  BeaconUID:"none"
});

// Estado reactivo para errores
const errors = reactive({
  name: null,
  RFID: null,
});

// Función para validar los campos
const validateForm = () => {
  let isValid = true;

  // Validar campo Name
  if (!form.name.trim()) {
    errors.name = "El campo Name es requerido.";
    isValid = false;
  } else {
    errors.name = null;
  }

  // Validar campo RFID
  if (!form.RFID.trim()) {
    errors.RFID = "El campo RFID es requerido.";
    isValid = false;
  } else {
    errors.RFID = null;
  }

  return isValid;
};


const handleSubmit = async () => {

  const jsonPayload = { ...form };

  if (validateForm()) {
    loading.value = true;
    try {
      const { data } = await ShopAPI.addShopComputer(jsonPayload);

      if (data.ok) {
        showSweetAlert({
          title: 'Shop Computer created successfully!',
          icon: 'success',
          showCloseButton: true,
          allowOutsideClick: false
        }).then(() => {
            closeModal().then(() => {
              router.go() // Recarga la pagina actual
            })
        })
      } else {

         await showSweetAlert({
           title: 'Shop Computer no se pudo crear!',
           text: data.msg,
           icon: 'warning',
           showCloseButton: true,
           allowOutsideClick: false
         }).then(() => {
           closeModal().then(() => {
             router.go() // Recarga la pagina actual
           })
         })
      }
    } catch (error) {
      const data = error.response.data;

      await showSweetAlert({
        title: 'Shop Computer no se pudo crear!',
        text: data.msg,
        icon: 'error',
        showCloseButton: true,
        allowOutsideClick: false
      }).then(() => {
        closeModal().then(() => {
          router.go() // Recarga la pagina actual
        })
      })


    } finally {
      loading.value = false
    }

  } else {

    // TODO
  }

};

</script>

<template>
  <div class="vh-100" style="background-color: #1e293b">
    <SectionMain style="color: snow">
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Add Laptop" main>
      </SectionTitleLineWithButton>

    <CardBox form @submit="handleSubmit">

        <FormField label="">
          <FormControl v-model="form.name" :class="{ 'is-invalid': errors.name }"  type="text" placeholder="Computer Name" required="required" :icon="mdiAccount" />
          <FormControl v-model="form.RFID" :class="{ 'is-invalid': errors.RFID }"  type="text" placeholder="RFID" required="required" :icon="mdiMail" />
        </FormField>


      <FormField label="" style="margin-top: -15px">
        <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
        <p v-if="errors.RFID" class="error-message">{{ errors.RFID }}</p>
      </FormField>




        <BaseDivider />

        <FormField label="" help="Your notes. Max 255 characters">
          <FormControl v-model="form.notes"  type="textarea" placeholder="Notes" />
        </FormField>


        <template #footer>
          <BaseButtons>
<!--            <BaseButton type="submit" color="info" label="Submit" :disabled="loading" />-->
            <BaseButton color="info" label="Submit" :disabled="loading" @click="handleSubmit"  />
            <BaseButton type="reset" color="info" outline label="Close" @click.prevent="closeModal" />
          </BaseButtons>

          <Spinner v-if="loading" />

        </template>

      </CardBox>

    </SectionMain>
  </div>
</template>


<style>
.is-invalid {
  border: 1px solid #956666;
}

.error-message {
  color: #e41a01;
  font-size: 0.7em;
}
</style>
