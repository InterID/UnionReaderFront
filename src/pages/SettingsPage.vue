<template>
  <div class="wrapper">
    <div class="settings">
      <q-list link>
        <q-item-label header>Настройки</q-item-label>
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
            <SettingsList
              :initial-value="settingsData[leftFields[index].name]"
              :list-data="organizationsData"
              v-if="
                leftFields[index].type == 'select' ||
                leftFields[index].type == 'number'
              "
              @updateValue="updateOrganizationValue"
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
            <SettingsList
              v-model="settingsData[rightFields[index].name]"
              :initial-value="settingsData[rightFields[index].name]"
              :list-data="responsibleDataChangeArray"
              v-if="
                leftFields[index].type == 'select' ||
                leftFields[index].type == 'number'
              "
              @updateValue="updateResponsibleValue"
            />
          </q-item>
        </div>
      </q-list>
      <div class="buttons">
        <q-btn color="primary" size="md" label="Сохранить" @click="save" />
        <q-btn outline color="primary" label="Отменить" @click="reset" />
      </div>
    </div>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Внимание</div>
        </q-card-section>

        <q-card-section class="q-pt-none"> Введите BaseUrl </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";
import { getSettings } from "../api/index.js";
import { postSettings } from "../api/index.js";
import SettingsList from "components/SettingsList";
import { getOrganizations, getResponsible } from "src/api";
import { getStore } from "../store";

const data = {
  // systemLogin: "login",
  // completeActionStatus: "completeActionStatus",
  // systemPassword: "dsv"
};

let organizationsData = ref([]);
// let responsibleData = ref ([]);
let responsibleDataChangeArray = ref([]);

export default {
  name: "Settings",
  components: { SettingsList },

  setup() {
    let dataCopy = {};

    // const data = {
    //   systemLogin: "login",
    //   completeActionStatus: "completeActionStatus",
    //   systemPassword: "dsv"
    // };
    const leftFields = [
      { name: "onPlaceStatus", type: "input" },
      { name: "systemLogin", type: "input" },
      { name: "baseUrl", type: "input" },
      { name: "uncoordinatedMovementStatusId", type: "input" },
      { name: "inPlaceStatusId", type: "input" },
      { name: "systemOrganizationId", type: "select" },
    ];
    const rightFields = [
      { name: "delayMinutes", type: "number" },
      { name: "systemPassword", type: "input" },
      { name: "completeActionStatus", type: "input" },
      { name: "lostStatusId", type: "input" },
      { name: "relocationType", type: "input" },
      { name: "systemResponsibleId", type: "select" },
    ];
    dataCopy = data;
    const newDataCopy = data;
    let settingsData = ref({ ...newDataCopy });
    let baseUrlState = computed(
      () => getStore().getters["settings/getBaseUrlState"]
    );
    let alert = ref(false);

    if (baseUrlState.value) {
      alert.value = true;
    }
    watch(
      () => baseUrlState,
      (newVal, oldVal) => {
        if (newVal) alert.value = true;
      }
    );
    // getSettings(data=>settingsData)
    getSettings().then((result) => {
      settingsData.value = result;
      // console.log('result', result)
      // console.log('settingsDATA', settingsData.value)
    });

    getOrganizations().then((result) => {
      organizationsData.value = result;
      // console.log("111111111",organizationsData.value);
    });

    getResponsible().then((result) => {
      // responsibleData.value = result;
      responsibleDataChangeArray.value = result.map((res) => {
        return { id: res.id, name: `${res.firstname} ${res.lastname}` };
      });
      // console.log("RRRRRRRRR",responsibleDataChangeArray.value)
    });

    function reset() {
      settingsData.value = { ...dataCopy };
    }

    function save() {
      postSettings(settingsData.value);
    }
    function updateResponsibleValue(value) {
      settingsData.value.systemResponsibleId = value.value;
    }
    function updateOrganizationValue(value) {
      settingsData.value.systemOrganizationId = value.value;
    }
    return {
      separator: ref("vertical"),
      settingsData,
      rightFields,
      leftFields,
      reset,
      // data,
      save,
      organizationsData,
      // responsibleData,
      responsibleDataChangeArray,
      updateOrganizationValue,
      updateResponsibleValue,
      baseUrlState,
      alert,
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
  width: 250px;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

.q-item__label--header {
  color: $primary;
  font-size: 24px;
}
</style>
