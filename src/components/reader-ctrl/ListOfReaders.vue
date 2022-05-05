<template>
  <div class="readers">
    <div class="readers__toolbar">
      <button class="readers__button">New Connect</button>
    </div>
    <div class="container">
      <div class="readers__list">
        <div class="table__header">name</div>
        <div class="table__header">api</div>
        <div class="table__header">port</div>
        <div class="table__header">status</div>
        <div class="table__header">Inventory</div>
        <div></div>
        <div></div>
        <Reader v-for="reader of readers"
                :key="reader.api"
                :reader="reader"
        />
      </div>
    </div>
  </div>

</template>

<script>
import Reader from "components/reader-ctrl/Reader";
import {reactive} from "vue";

export default {
  name: "${ COMPONENT_NAME }",
  components: {
    Reader
  },
  setup() {
    const readers = reactive([
      {
        api: 'someApi1',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name1",
      },
      {
        api: 'someApi2',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name2",
      },
      {
        api: 'someApi3',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name3",
      },
      {
        api: 'someApi4',
        port: 8080,
        status: "NOT_INVENTORY", //INVENTORY
        simpleFor: "name4",
      }
    ]);
    return {readers}
  }
}
</script>

<style lang="scss" scoped>
.container{
  display: flex;
  justify-content: center;
  margin: auto;
}
.readers {
  padding: 20px;
}

.readers__toolbar {
  display: flex;
  justify-content: center;
}

.readers__button {
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 6px;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.readers__list {
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(7, max-content);
  justify-items: center;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #1976d2;
}

.table__header {
  color: #1976d2;
}
</style>
