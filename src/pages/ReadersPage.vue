<template>
  <DeviceTable
    :headerTable="'Ридеры'"
    :headerTableEng="'Readers'"
    :rows="readersList"
    @showAntenna="isShow"
  />
  <div v-if="antennaShow">
    <DeviceTable
      :headerTableEng="'Antennas'"
      :headerTable="'Антенны ридера'"
      :rows="antennasList"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import DeviceTable from "../components/DeviceTable.vue";
import { getReaders } from "../api/index.js";
import { getAntennas } from "src/api";

let antennaShow = ref(false);
let antennasList = ref([]);

export default {
  components: {
    DeviceTable,
  },
  setup() {
    let antennasListTemp = ref([]);

    function isShow(value, readerName) {
      antennaShow.value = value;

      if (value) {
        getAntennas(readerName).then((result) => (antennasList.value = result));
        let index;
      } else {
        antennasList.value = [];
      }
    }

    let readersList = ref([]);

    getReaders().then((result) => (readersList.value = result));

    return {
      antennaShow,
      isShow,
      readersList,
      antennasList,
      antennasListTemp,
    };
  },
};
</script>

<style scoped></style>
