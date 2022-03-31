<template>
  <DeviceTable
    :headerTable="'Ридеры'"
    :rows="readersList"
    @showAntenna="isShow"
  />
  <div v-if="antennaShow">
    <DeviceTable :headerTable="'Антенны ридера'" :rows="antennasList" />
  </div>
</template>

<script>
import { ref } from "vue";
import DeviceTable from "../components/DeviceTable.vue";
import { getReaders } from "../api/index.js";
import { getAntennas } from "src/api";

let antennaShow = ref(false);

export default {
  components: {
    DeviceTable,
  },
  setup() {

    let antennasList = ref([]);

    function isShow(value, readerName) {
      antennaShow.value = value;

      if (value) {
        getAntennas(readerName).then((result) => (antennasList.value = result))
        console.log(antennasList);
      }
    }

    let readersList = ref([]);

    getReaders().then((result) => (readersList.value = result));



    return {
      antennaShow,
      isShow,
      readersList,
      antennasList
    };
  },
};
</script>

<style scoped></style>
