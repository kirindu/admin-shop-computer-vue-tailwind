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
import useToastNotification from '@/composables/useToast'
const { showToast } = useToastNotification()

import useSweetAlert2Notification from '@/composables/useSweetAlert2'
const { showSweetAlert, alertResult } = useSweetAlert2Notification()

const loading = ref(false)

// Librerias para validar Formularios
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const {
  defineField,
  errors,
  handleSubmit,
  isSubmitting,
  resetForm,
  setFieldValue,
  setValues,
  meta,
  value
} = useForm({
  validationSchema: yup.object({
    name: yup.string().required('The name is requiered'),
    rfid: yup.string().required('The rfid is requiered'),
    notes: yup.string()
  })
})

const [name, nameAttrs] = defineField('name', { validateOnModelUpdate: false })
const [rfid, rfidAttrs] = defineField('rfid', { validateOnModelUpdate: false })
const [notes, notesAttrs] = defineField('notes', { validateOnModelUpdate: false })

const formData = new FormData()

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  loading.value = true

  formData.append('name', values.name)
  formData.append('rfid', values.rfid)
  formData.append('notes', values.notes)

  try {
    const { data } = await ShopAPI.addShopComputer(formData)

    if (data.ok) {
      showSweetAlert({
        title: 'Shop Computer created successfully!',
        icon: 'success',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      }).then(() => {
        if (alertResult.value.isConfirmed) {
          closeModal().then(() => {
            router.go() // Recarga la pagina actual
          })
        }
      })
    } else {
      showSweetAlert({
        title: 'Shop Computer no se pudo crear!',
        text: data.msg,
        icon: 'warning',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        allowOutsideClick: false
      })
    }
  } catch (error) {
    const data = error.response.data

    showToast({
      message: data.msg,
      type: 'error',
      position: 'top',
      duration: 4000
    })
  } finally {
    loading.value = false
  }

  resetForm() // Limpiamos el formulario una ves realizado el submit
})
</script>

<template>
  <div class="vh-100" style="background-color: #1e293b">
    <SectionMain style="color: snow">
      <SectionTitleLineWithButton :icon="mdiBallotOutline" title="Add Laptop" main>
      </SectionTitleLineWithButton>

    <CardBox form autocomplete="off" @submit="onSubmit">

        <FormField label="">
          <FormControl v-model="name" v-bind="nameAttrs" type="text" placeholder="Computer Name" required="required" :icon="mdiAccount" />
          <FormControl v-model="rfid" v-bind="rfidAttrs" type="text" placeholder="RFID" required="required" :icon="mdiMail" />
        </FormField>

      <div style="width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #e41a01;">
        {{ errors.name }}
      </div>


        <BaseDivider />

        <FormField label="" help="Your notes. Max 255 characters">
          <FormControl v-model="notes" v-bind="notesAttrs" type="textarea" placeholder="Notes" />
        </FormField>


        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Submit" :disabled="loading" />
            <BaseButton type="reset" color="info" outline label="Close" @click.prevent="closeModal" />
          </BaseButtons>

          <Spinner v-if="loading" />

        </template>

      </CardBox>

<!--      <form autocomplete="off" @submit="onSubmit">-->
<!--        <div class="col-xl-12 col-lg-12">-->
<!--          <div class="card">-->

<!--            <div class="card-body">-->

<!--              <div class="basic-form">-->
<!--                <div class="row">-->

<!--                  <div class="mb-3 col-md-6">-->
<!--                    <label class="form-label" for="thename">RFID</label>-->
<!--                    <input-->
<!--                      id="thename"-->
<!--                      v-model="name"-->
<!--                      v-bind="nameAttrs"-->
<!--                      type="text"-->
<!--                      class="form-control"-->
<!--                      autocomplete="off"-->
<!--                    />-->
<!--                    <div-->
<!--                      style="width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #e41a01"-->
<!--                    >-->
<!--                      {{ errors.rfid }}-->
<!--                    </div>-->
<!--                  </div>-->

<!--                  <div class="mb-3 col-md-6">-->
<!--                    <label class="form-label" for="therfid">RFID</label>-->
<!--                    <input-->
<!--                     id="therfid"-->
<!--                      v-model="rfid"-->
<!--                      v-bind="rfidAttrs"-->
<!--                      type="text"-->
<!--                      class="form-control"-->
<!--                      autocomplete="off"-->
<!--                    />-->
<!--                    <div-->
<!--                      style="width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #e41a01"-->
<!--                    >-->
<!--                      {{ errors.rfid }}-->
<!--                    </div>-->
<!--                  </div>-->


<!--                  <div class="mb-12 col-md-12">-->
<!--                    <label class="form-label">Notes</label>-->
<!--                    <textarea-->
<!--                      v-model="notes"-->
<!--                      v-bind="notesAttrs"-->
<!--                      class="form-txtarea form-control"-->
<!--                      rows="4"-->
<!--                      id="comment"-->
<!--                      autocomplete="off"-->
<!--                    ></textarea>-->
<!--                    <div-->
<!--                      style="width: 100%; margin-top: 0.25rem; font-size: 0.875em; color: #e41a01"-->
<!--                    >-->
<!--                      {{ errors.notes }}-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->

<!--                <hr />-->

<!--                <button-->
<!--                  type="submit"-->
<!--                  class="btn btn-lg btn-primary w-100 mb-5"-->
<!--                  style="background-color: #e41a01 !important"-->
<!--                  :disabled="loading"-->
<!--                >-->
<!--                  Create Post-->
<!--                </button>-->

<!--                <Spinner v-if="loading" />-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </form>-->
    </SectionMain>
  </div>
</template>
