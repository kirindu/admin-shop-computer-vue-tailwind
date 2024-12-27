<script setup>
import { defineProps} from "vue";

const props = defineProps({
  prefix: {
    type: String,
    default: null
  },
  suffix: {
    type: String,
    default: null
  },
  data: {
    type: String,
    default: null
  },
  textcolor: {
    type: String,
    default: null
  }
})

</script>

<template>
  
  <div>{{ prefix }}<span :class=textcolor>{{data}}</span> {{suffix }}</div>
</template>
