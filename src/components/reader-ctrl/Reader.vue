<template>
  <div class="reader__option reader__name">{{ reader.simpleFor }}</div>
  <div class="reader__option reader__api">{{ reader.api }}</div>
  <div class="reader__option reader__port">{{ reader.port }}</div>
  <div class="reader__option reader__status">{{ reader.status }}</div>
  <div class="reader__edit">
    <button :style="actionInventory==='start'? 'background:green': 'background:yellow'">{{actionInventory}}</button>
  </div>
  <div class="reader__edit">
    <button class="reader__edit" @click="toggleIsShowForm">edit</button>
  </div>
  <div class="reader__delete">
    <button disabled class="reader__disconnect">disconnect</button>
  </div>
  <ReaderForm v-if="isShowForm"
              :api="reader.api"
              :port="reader.port"
              @close-form="toggleIsShowForm"
  />
</template>

<script>
import {computed, ref} from "vue";
import ReaderForm from "components/reader-ctrl/ReaderForm";

export default {
  name: "${ COMPONENT_NAME }",
  props: ['reader'],
  components: { ReaderForm },
  setup(props) {
    const actionInventory = computed(() => {
      return props.reader.status === "NOT_INVENTORY" ? "start" : "stop";
    })
    const isShowForm = ref(false);
    const toggleIsShowForm = ()=> {
      isShowForm.value = !isShowForm.value
    }
    return {actionInventory,isShowForm, toggleIsShowForm}
  },
}
</script>

<style lang="scss" scoped>
.reader {
  &__option {
    padding: 0 20px;
  }
}

button {
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
