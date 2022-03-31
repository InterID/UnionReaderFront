<template>
  <div class="wrapper">
    <div class="settings">
      <q-list link>
        <q-list-header>User controls</q-list-header>
        <div
          v-for="(field, index) in leftFields"
          :key="index"
          class="rowInputs"
        >
          <q-item>
            <q-input
              v-if="
                leftFields[index].type == 'input' ||
                leftFields[index].type == 'number'
              "
              filled
              v-model="settingsData[leftFields[index].name]"
              :type="leftFields[index].type == 'number' ? 'number' : 'any'"
              :label="leftFields[index]['name']"
            />
          </q-item>
          <q-item>
            <q-input
              v-if="
                leftFields[index].type == 'input' ||
                leftFields[index].type == 'number'
              "
              filled
              v-model="settingsData[rightFields[index].name]"
              :type="rightFields[index].type == 'number' ? 'number' : 'string'"
              :label="rightFields[index].name"
            />
          </q-item>
        </div>
      </q-list>
      <div class="buttons">
        <q-btn color="primary" size="md" label="Сохранить" @click="save" />
        <q-btn outline color="primary" label="Отменить" @click="reset" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSettings } from "../api/index.js";
import { postSettings } from "../api/index.js";

const data = {
  systemLogin: "login",
  completeActionStatus: "completeActionStatus",
  systemPassword: "dsv",
};
export default {
  name: "Settings",
  setup() {
    let dataCopy = {};

    const data = {
      systemLogin: "login",
      completeActionStatus: "completeActionStatus",
      systemPassword: "dsv",
    };
    const leftFields = [
      { name: "onPlaceStatus", type: "input" },
      { name: "systemLogin", type: "input" },
      { name: "baseUrl", type: "input" },
      { name: "uncoordinatedMovementStatusId", type: "input" },
      { name: "inPlaceStatusId", type: "input" },
      { name: "systemOrganizationId", type: "input" },
    ];
    const rightFields = [
      { name: "delayMinutes", type: "number" },
      { name: "systemPassword", type: "input" },
      { name: "completeActionStatus", type: "input" },
      { name: "lostStatusId", type: "input" },
      { name: "relocationType", type: "input" },
      { name: "systemResponibleId", type: "input" },
    ];
    dataCopy = data;
    const newDataCopy = data;
    let settingsData = ref({ ...newDataCopy });

    // getSettings(data=>settingsData)
    getSettings().then((result) =>
      {console.log(result)
      settingsData.value = result});

    console.log(settingsData.value);

    function reset() {
      settingsData.value = { ...dataCopy };
    }
    function save() {
      console.log("save");
      postSettings(settingsData.value);
    }
    return {
      separator: ref("vertical"),
      settingsData,
      rightFields,
      leftFields,
      reset,
      data,
      save,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
}
.settings {
  display: inline-block;
  margin: auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  .rowInputs {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
.q-input {
  margin: 0 20px 0 20px;
}
.buttons {
  display: flex;
  justify-content: space-around;
}
</style>
