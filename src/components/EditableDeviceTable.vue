<template>
  <div class="q-pa-md">
    <q-table
      :title="headerTable"
      :rows="editableRows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props" class="text-left">
            {{ props.row.name }}
          </q-td>
          <q-td key="name" :props="props" @click="isShow(columns[1].label)" class="text-left">
            {{ props.row.buildingName }}
            <q-dialog
              v-model="buildingShow"
              transition-show="scale"
              transition-hide="scale"
              position="right"
            >
              <LocationList
                :locationLabel="columns[1].label"
                :locationName="columns[1].name"
                :column-number="'1'"
                @locationChange="changeLocation"
              />
              <q-btn flat label="OK" v-close-popup />
            </q-dialog>
          </q-td>
          <q-td key="name" :props="props" @click="isShow(columns[2].label)" class="text-left">
            {{ props.row.floorName }}
            <q-dialog
              v-model="floorShow"
              transition-show="scale"
              transition-hide="scale"
              position="right"
            >
              <LocationList
                :locationLabel="columns[2].label"
                :locationName="columns[2].name"
                :locationId="props.row.buildingId"
                :column-number="'2'"
                @locationChange="changeLocation"
              />
              <q-btn flat label="OK" v-close-popup />
            </q-dialog>
          </q-td>
          <q-td key="name" :props="props" @click="isShow(columns[3].label)" class="text-left">
            {{ props.row.premisesName }}
            <q-dialog
              v-model="premisesShow"
              transition-show="scale"
              transition-hide="scale"
              position="right"
            >
              <LocationList
                :locationLabel="columns[3].label"
                :locationName="columns[3].name"
                :column-number="'3'"
                :locationId="props.row.floorId"
                @locationChange="changeLocation"
              />
              <q-btn flat label="OK" v-close-popup />
            </q-dialog>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div class="q-pa-md q-gutter-sm">
      <q-btn
        v-on:click="saveRow(editableRows[0])"
        color="primary"
        label="Сохранить"
      />
      <q-btn
        v-on:click="cancelChange"
        color="white"
        text-color="black"
        label="Отмена"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import LocationList from "components/LocationList.vue";

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

  { name: "Building", label: "Здание", align: "left", field: "buildingName" },
  { name: "Floor", label: "Этаж", align: "left", field: "floor" },
  { name: "Premises", label: "Помещение", align: "left", field: "premises" },
  //{ name: "Buttons", label: "", field: "buttons" },
];

let buildingShow = ref(false);
let floorShow = ref(false);
let premisesShow = ref(false);

let buildingIdTemp = "";
let buildingNameTemp = "";
let floorIdTemp = "";
let floorNameTemp = "";
let premisesIdTemp = "";
let premisesNameTemp = "";

export default defineComponent({
  name: "EditableDeviceTable",
  components: { LocationList },

  props: {
    headerTable: String,
    rows: {
      name: String,
      buildingName: String,
      buildingId: String,
      floorId: String,
      floorName: String,
      premisesId: String,
      premisesName: String,
    },
    rowId: String,
  },

  emits: ["pushButton"],

  setup(props, { emit }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    let editableRows = props.rows;

    buildingIdTemp = editableRows[0].buildingId;
    buildingNameTemp = editableRows[0].buildingName;

    floorNameTemp = editableRows[0].floorName;
    floorIdTemp = editableRows[0].floorId;

    premisesIdTemp = editableRows[0].premisesId;
    premisesNameTemp = editableRows[0].premisesName;

    function saveRow(row) {
      console.log("saveRow building = ", row);

      emit("pushButton", row);
    }

    function cancelChange() {
      editableRows[0].buildingId = buildingIdTemp;
      editableRows[0].buildingName = buildingNameTemp;

      editableRows[0].floorId = floorIdTemp;
      editableRows[0].floorName = floorNameTemp;

      editableRows[0].premisesId = premisesIdTemp;
      editableRows[0].premisesName = premisesNameTemp;

      emit("pushButton");
    }

    function isShow(location) {
      if (location === columns[1].label) {
        buildingShow.value = true;
      }
      if (location === columns[2].label) {
        floorShow.value = true;
      }
      if (location === columns[3].label) {
        premisesShow.value = true;
      }
    }

    function changeLocation(location, columnNumber) {
      if (columnNumber === "1") {
        editableRows[0].floorId = "";

        editableRows[0].floorName = "";

        editableRows[0].premisesId = "";

        editableRows[0].premisesName = "";

        editableRows[0].buildingName = location.name;
        editableRows[0].buildingId = location.id;

        buildingShow.value = false;
      }
      if (columnNumber === "2") {

        editableRows[0].premisesId = "";

        editableRows[0].premisesName = "";

        editableRows[0].floorName = location.name;
        editableRows[0].floorId = location.id;

        floorShow.value = false;
      }
      if (columnNumber === "3") {
        buildingIdTemp = editableRows[0].buildingId;
        buildingNameTemp = editableRows[0].buildingName;

        floorNameTemp = editableRows[0].floorName;
        floorIdTemp = editableRows[0].floorId;

        premisesIdTemp = editableRows[0].premisesId;
        premisesNameTemp = editableRows[0].premisesName;

        editableRows[0].premisesName = location.name;
        editableRows[0].premisesId = location.id;

        premisesShow.value = false;
      }
    }

    return {
      columns,
      cancelChange,
      saveRow,
      persistent: ref(false),
      buildingShow,
      floorShow,
      premisesShow,
      isShow,
      changeLocation,
      editableRows,
    };
  },
});
</script>

<style lang="scss" scoped>
.q-dialog {
  .q-pa-md {
    background: white;
  }
}
</style>
