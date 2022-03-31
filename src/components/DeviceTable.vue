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
          <q-td
            key="name"
            :props="props"
            v-on:click="isShow(props.row.name)"
            class="text-left"
          >
            {{ props.row.name }}
          </q-td>
          <q-td key="name" :props="props" class="text-left">
            {{ props.row.buildingName }}
          </q-td>
          <q-td key="name" :props="props" class="text-left">
            {{ props.row.floorName }}
          </q-td>
          <q-td key="name" :props="props" class="text-left">
            {{ props.row.premisesName }}
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
import { defineComponent, ref, computed } from "vue";
import EditableDeviceTable from "components/EditableDeviceTable.vue";
import axios from "axios";
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

  {
    name: "Building",
    label: "Здание",
    align: "left",
    field: "building",
    sortable: true,
  },
  { name: "Floor", label: "Этаж", align: "left", field: "floor" },
  { name: "Premises", label: "Помещение", align: "left", field: "premises" },
  { name: "Buttons", label: "", align: "left", field: "buttons" },
];

export default defineComponent({
  name: "DeviceTable",

  components: { EditableDeviceTable },

  props: {
    headerTable: String,
    rows: {
      name: String,
      buildingId: String,
      floor: String,
      premises: String,
    },
  },

  emits: ["showAntenna"],

  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let tableRows = computed(() => props.rows);
    let editableName = "";
    let savedRow = "";
    function isShow(reader) {
      antennaShow.value = true;
      if (checkReaderId.value === reader) {
        antennaShow.value = false;
        checkReaderId.value = "";
        emit("showAntenna", antennaShow.value);
        return;
      }
      checkReaderId.value = reader;
      emit("showAntenna", antennaShow.value, reader);
    }

    function openPopup(row) {
      clearArray();
      console.log("row to edit", row);
      editableName = row.name;
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
      if (newRow) {
        const index = tableRows.value.findIndex((x) => x.name === editableName);
        tableRows.value[index] = newRow;
        editableName = "";
        clearArray();

        console.log("POST", JSON.stringify(newRow));

        axios
          .post("http://localhost:8764/api/save-reader", newRow, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => (savedRow = response.data.name));
      }
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
      editableName
    };
  },
});
</script>

<style scoped></style>
