<template>
  <DeviceTable
    :headerTable="'Ридеры'"
    :rows="readersList"
    @showAntenna="isShow"
  />
  <div v-if="antennaShow">
    <DeviceTable :headerTable="'Антенны ридера'" :rows="rowsAntenna" />
  </div>
</template>

<script>
import { ref } from "vue";
import DeviceTable from "../components/DeviceTable.vue";
import axios from "axios";
import { getReaders } from "../api/index.js";

let antennaShow = ref(false);

//Данные ридера

let rowsREader;

const rowsReader = [
  {
    name: "Frozen Yogurt",
    building: 159,
    floor: 6.0,
    buildingId: "16515",
    premises: 24,
    floorId: "16515",
  },
  {
    name: "Ice cream sandwich",
    building: 237,
    floor: 9.0,
    buildingId: "16515",
    premises: 37,
    floorId: "16515",
  },
];

//Данные антенны
const rowsAntenna = [
  {
    name: "Frozen Yogurt",
    building: 159,
    floor: 6.0,
    premises: 24,
  },
  {
    name: "Ice cream sandwich",
    building: 237,
    floor: 9.0,
    premises: 37,
  },
  {
    name: "Eclair",
    building: 262,
    floor: 16.0,
    premises: 23,
  },
];

export default {
  props: {},

  components: {
    DeviceTable,
  },
  setup(props) {
    function isShow(value) {
      antennaShow.value = value;
    }

    /*axios.get(`http://localhost:8764/api/readers/`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      readersList.value = response.data;
    })*/
    let readersList = ref([]);
    /*getReaders().then(() => {
      readersList.value = response.data;
      console.log(readersList);
    });*/
    axios
      .get(`http://192.168.1.178:8764/api/readers/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        readersList.value = response.data;
        console.log(readersList.value);
      });
    //Получение Ридеров
    // axios.get("http://127.0.0.1:7878/api/readers/", {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // })
    //   .then(response => {readers = response
    //   });
    //
    // axios.get("http://127.0.0.1:7878/api/buildings/", {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*"
    //   }
    // })
    //   .then(response => {buildings = response
    //   });

    return {
      antennaShow,
      isShow,
      rowsAntenna,
      rowsReader,
      readersList,
    };
  },
};
</script>

<style scoped></style>
