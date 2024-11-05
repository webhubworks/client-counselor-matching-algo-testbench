<script setup>
import {useStore} from "./store.js";
import {BarChart} from "vue-chart-3";
const store = useStore();
import { Chart, registerables } from "chart.js";
import {computed} from "vue";

Chart.register(...registerables);

const chartData = computed(() => ({
  labels: store.sortedCounselors.map((counselor) => `C${counselor.id}, cap_max: ${counselor.maxCapacity}, prio: ${counselor.priority.name}, prio_rel: ${counselor.relativePriorityRounded}`),
  datasets: [
    {
      data: store.sortedCounselors.map((counselor) => counselor.clientCount),
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}))
const options = {
  indexAxis: 'y',
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      suggestedMax: 30,
      suggestedMin: 0,
    }
  }
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-center my-8 text-xl">Client Counselor Matching Algo Testbench 🎲</h1>
    <BarChart :chartData="chartData" :options="options"></BarChart>
    <div class="flex space-x-2 items-center">
      <button class="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" @click.prevent="store.generateClient">Create new client</button>
      <p class="text-sm">Num of clients: {{ store.clients.length }}</p>
    </div>
    <h2 class="mt-4 mb-2 font-bold">Priorities</h2>
    <ul>
      <li v-for="priority in store.priorities">{{ priority.name }}: {{ priority.value }}</li>
    </ul>
  </div>
</template>

<style scoped>

</style>
