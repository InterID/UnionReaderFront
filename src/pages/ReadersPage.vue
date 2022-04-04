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
import { computed, ref } from "vue";
import DeviceTable from "../components/DeviceTable.vue";
import { getReaders } from "../api/index.js";
import { getAntennas } from "src/api";

let antennaShow = ref(false);

export default {
  components: {
    DeviceTable,
  },
  setup() {

    let antennasListTemp = ref([]);
    let antennasList = ref([]);
     // let antennasList = ref([{name: String,
     //                                buildingId: String,
     //                                floorId:String,
     //                                premisesId:String,
     //                                readerId:String}]);

    function isShow(value, readerName) {
      antennaShow.value = value;

      if (value) {

        // console.log("LABEL",label.value)


        // let tableRows = computed(() => props.rows);

        // getAntennas(readerName).then((result) => (antennasList.value = result))
        // eslint-disable-next-line vue/no-async-in-computed-properties

        getAntennas(readerName).then((result) => (antennasListTemp.value = result))
        console.log(antennasListTemp.value);

        let index;
        for (index = 0; index < antennasListTemp.value.length; ++index) {
          let item ={name : antennasListTemp.value[0].antennaPort,
            buildingId: antennasListTemp.value[0].buildingId,
            buildingName: antennasListTemp.value[0].buildingName,
            floorId: antennasListTemp.value[0].floorId,
            floorName: antennasListTemp.value[0].floorName,
            premisesId: antennasListTemp.value[0].premisesId,
            premisesName: antennasListTemp.value[0].premisesName,
            readerName: antennasListTemp.value[0].readerName}
          console.log("1",item);

          antennasList.value.push(item);

          // console.log(antennasListTemp.value.length);
        }
        // antennasListTemp.value.forEach(function(item, i, antennaListTemp) {
        //   console.log(item);
        //   console.log(item);
        // //   antennasList.value.push({name: item.antennaPort, buildingId: item.buildingId})
        // });






        // console.log(antennasListTemp);
      }
      else{
        // label.value = "Имя ридера"
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
