
<script setup>

import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { closeModal, confirmModal } from "@kolirt/vue-modal";


// Props
const props = defineProps({
  titulo: {
    type: String,
  },
});

</script>

<template>
EDIT USER
</template>