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
            class="text-left firstRow"
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
              <q-dialog v-model="popUpShow[headerTableEng]" persistent>
                <EditableDeviceTable
                  @pushButton="closePopup"
                  :headerTable="headerTable"
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
import { saveDevice } from "src/api";
// import LocationList from "./LocationList.vue";

let antennaShow = ref(false);

let checkReaderId = ref("");

const rowArray = ref([]);

export default defineComponent({
  name: "DeviceTable",

  components: { EditableDeviceTable },

  props: {
    headerTable: String,
    headerTableEng: String,
    rows: {
      name: String,
      buildingName: String,
      buildingId: String,
      floorName: String,
      floorId: String,
      premisesName: String,
      premisesId: String,
    },
  },

  emits: ["showAntenna"],

  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let tableRows = computed(() => props.rows);
    let editableName = "";
    let savedRow = "";
    let columns;
    let labelColumn = ref(false);

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
    let popUpShow = ref([]);
    popUpShow[props.headerTableEng] = false;
    if (props.headerTable === "Ридеры") {
      columns = [
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
          field: "buildingName",
          sortable: true,
        },
        { name: "Floor", label: "Этаж", align: "left", field: "floorName" },
        {
          name: "Premises",
          label: "Помещение",
          align: "left",
          field: "premisesName",
        },
        { name: "Buttons", label: "", align: "left", field: "buttons" },
      ];
    } else {
      columns = [
        {
          name: "name",
          required: true,
          label: "Имя антенны",
          align: "left",
          field: (row) => row.name,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "Building",
          label: "Здание",
          align: "left",
          field: "buildingName",
          sortable: true,
        },
        { name: "Floor", label: "Этаж", align: "left", field: "floorName" },
        {
          name: "Premises",
          label: "Помещение",
          align: "left",
          field: "premisesName",
        },
        { name: "Buttons", label: "", align: "left", field: "buttons" },
      ];
    }

    function openPopup(row) {
      clearArray();
      editableName = row.name;
      putToArray(row);
      popUpShow.value[props.headerTableEng] = true;
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

        saveDevice(newRow, props.headerTable).then(
          (result) => (savedRow = result)
        );
      }
      popUpShow.value[props.headerTableEng] = false;
    }

    return {
      columns,
      isShow,
      antennaShow,
      checkReaderId,
      rowArray,
      putToArray,
      closePopup,
      openPopup,
      popUpShow,
      tableRows,
      editableName,
    };
  },
});
</script>

<style scoped>
.firstRow {
  width: 30%;
}
</style>
