<template>
  <div class="q-pa-md">
    <q-table
      :title="headerTable"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
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
        </q-tr>
      </template>
    </q-table>

    <div class="q-pa-md q-gutter-sm">
      <q-btn
        v-on:click="saveRow(rows)"
        color="primary"
        label="Сохранить" />
      <q-btn
        v-on:click="cancelChange"
        color="white"
        text-color="black"
        label="Отмена" />
    </div>
  </div>
</template>

<script>

import { defineComponent } from "vue";

const columns = [
  {
    name: "name",
    required: true,
    label: "Имя ридера",
    align: "left",
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },

  { name: "Building", label: "Здание", field: "building", sortable: true },
  { name: "Floor", label: "Этаж", field: "floor" },
  { name: "Premises", label: "Помещение", field: "premises" },
  { name: "Buttons", label: "", field: "buttons" }
];


export default defineComponent({
  name: "EditableDeviceTable",

  props: {
    headerTable: String,
    rows: {
      name: String,
      building: String,
      floor: String,
      premises: String,
    }
  },

  emits: ["pushButton"],

  setup(props, { emit }) {

    function saveRow(row){
      emit("pushButton", row);
    }

    function cancelChange(){
      emit("pushButton");
      console.log()
    }

    return {
      columns,
      cancelChange,
      saveRow
    };
  }
});

</script>

<style scoped>

</style>
