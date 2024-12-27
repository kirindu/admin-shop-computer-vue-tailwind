<script setup>
import { computed, ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiAccountMultiple,
  mdiThermometerLines ,
  mdiChartTimelineVariant,
  mdiDoor ,
  mdiWaterPercent 
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


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiChartTimelineVariant" title="Dashboard" main>
      
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 mb-6">
        <CardBoxWidgetString
          color=text-violet-600
          :icon="mdiDoor"
          data="Locked"
          label="Door"
          textcolor="text-red-400"
        />
        <CardBoxWidget
          color=text-violet-600
          :icon="mdiThermometerLines "
          :number="22.32"
          suffix=" °F"
          label="Temperature"
        />
        <CardBoxWidget
          color=text-violet-600
          :icon="mdiWaterPercent "
          :number="30.20"
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



      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Summary" />


      <CardBox has-table>
        <TableSummary />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
