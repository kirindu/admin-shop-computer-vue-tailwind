<script setup>

import {storeToRefs} from 'pinia';
import { onMounted, onBeforeUnmount, ref,onUnmounted, computed  } from 'vue';

import {useConnectionStore} from '@/stores/connection.js';

// Import composable
import useCurrentTime from "@/composables/useCurrentTime";
const {currentTime} = useCurrentTime();

import useSweetAlert2Notification from "@/composables/useSweetAlert2";
import useToastNotification from "@/composables/useToast.js";
const { showSweetAlert, alertResult } = useSweetAlert2Notification();
const {showToast} = useToastNotification();

// MQTT STORE
import {useSensorDHTStore} from "@/stores/sensorsMQTT.js";
const sensorDHT = useSensorDHTStore();
const {temperature, humidity, door, client, relay_status} = storeToRefs(sensorDHT);

if (client.value === null) {
  sensorDHT.connectToBroker();
}
//

// Cuando nos salimos del programa cerramos el cliente MQTT
onUnmounted(() => {
  if (client.value) {
    sensorDHT.disconnectMQTT();
  }
});


import {
  mdiButtonPointer,
  mdiThermometerLines ,
  mdiChartTimelineVariant,
  mdiDoor ,
  mdiWaterPercent,
  mdiMonitorDashboard
} from '@mdi/js'
import * as chartConfig from '@/components/Charts/chart.config.js'
import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import CardBoxWidgetString from '@/components/CardBoxWidgetString.vue'
import CardBox from '@/components/CardBox.vue'
import TableSummary from '@/components/TableSummary.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'

const chartData = ref(null)

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData()
}

onMounted(() => {
  fillChartData()
})

const doorState = computed(() => {
  if(door.value == 'on') {
    return 'Closed'
  }else {
    return 'Open'
  }
    });


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiMonitorDashboard" title="Dashboard" main>
      
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
        <CardBoxWidgetString
          color=text-violet-600
          :icon="mdiDoor"
          :data="doorState"
          label="Door"
          textcolor="text-red-400"
        />
        <CardBoxWidget
          color=text-violet-600
          :icon="mdiThermometerLines "
          :number="temperature"
          suffix=" °F"
          label="Temperature"
        />
        <CardBoxWidget
          color=text-violet-600
          :icon="mdiWaterPercent "
          :number="humidity"
          suffix="%"
          label="Humidity"
        />

        <CardBoxWidget
          trend="Overflow"
          trend-type="alert"
          color="text-red-500"
          :icon="mdiChartTimelineVariant"
          :number="256"
          suffix="%"
          label="Performance"
        />

      </div>



      <SectionTitleLineWithButton :icon="mdiButtonPointer" title="Summary" />


      <CardBox has-table>
        <TableSummary />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
