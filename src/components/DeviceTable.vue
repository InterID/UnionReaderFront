<template>
  <div class="q-pa-md">
    <q-table
      :title="headerTable"
      :rows="tableRows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props" v-on:click="isShow(props.row.name)">
            {{ props.row.name }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.building }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.floor }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.premises }}
          </q-td>
          <q-td key="name" :props="props">
            <q-btn
              v-on:click.capture="openPopup(props.row)"
              color="primary"
              label="Редактировать"
            >
              <q-dialog v-model="popUpShow" persistent>
                <EditableDeviceTable
                  @pushButton="closePopup"
                  :headerTable="'Ридер'"
                  :rows="rowArray"
                />
              </q-dialog>
            </q-btn>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import EditableDeviceTable from "components/EditableDeviceTable.vue";
// import LocationList from "./LocationList.vue";

let antennaShow = ref(false);

let checkReaderId = ref("");

const rowArray = ref([]);

let popUpShow = ref(false);

const columns = [
  {
    name: "name",
    required: true,
    label: "Имя ридера",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  { name: "Building", label: "Здание", field: "building", sortable: true },
  { name: "Floor", label: "Этаж", field: "floor" },
  { name: "Premises", label: "Помещение", field: "premises" },
  { name: "Buttons", label: "", field: "buttons" },
];

export default defineComponent({
  name: "DeviceTable",

  components: { EditableDeviceTable },

  props: {
    headerTable: String,
    rows: {
      name: String,
      building: String,
      floor: String,
      premises: String,
    },
  },

  emits: ["showAntenna"],

  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let tableRows = props.rows;

    function isShow(reader) {
      antennaShow.value = true;
      if (checkReaderId.value === reader) {
        antennaShow.value = false;
        checkReaderId.value = "";
        emit("showAntenna", antennaShow.value);
        return;
      }
      checkReaderId.value = reader;
      emit("showAntenna", antennaShow.value);
    }

    function openPopup(row) {
      putToArray(row);
      console.log(popUpShow.value);
      popUpShow.value = true;
      console.log(popUpShow.value);
    }

    function putToArray(row) {
      rowArray.value.push(row);
    }

    function clearArray() {
      rowArray.value = [];
    }

    function closePopup(newRow) {
      console.log("newRow", newRow);

      clearArray();
      popUpShow.value = false;
    }

    // function

    return {
      columns,
      isShow,
      antennaShow,
      checkReaderId,
      rowArray,
      putToArray,
      clearArray,
      closePopup,
      openPopup,
      popUpShow,
      tableRows,
    };
  },
});
</script>

<style scoped></style>
