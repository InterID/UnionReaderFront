<template>
  <div class="background" @click="emitCloseForm">
    <div class="reader-form">
      <label>api</label><input :value="api || ''"
                         ref="apiInput"
                         type="text">
        <label>port</label><input :value="port || ''"
                          ref="portInput"
                          type="number"
                          min="0">
      <div class="reader-form__submit" >
        <button @click="submitHandler">{{ submit }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
  name: "${ COMPONENT_NAME }",
  props: {
    isNewConnect: Boolean,
    api: String,
    port: Number,
  },
  setup(props,{emit}) {
    const submit = computed(() => {
      return props.isNewConnect? "Create":"Save"
    })
    const apiInput = ref(null);
    const portInput = ref(null);
    const emitCloseForm = () => emit('closeForm');
    const submitHandler = () => {
      console.log(apiInput.value.value, portInput.value.value)
      emitCloseForm()
    }
    return { submit, submitHandler,apiInput,portInput,emitCloseForm }
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transform: translateY(-95px);
  z-index: 100;
  background: rgba(0,0,0,0.3);
  width: 100vw;
  height: 150vh;
}
.reader-form {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, max-content);
  margin-top: 150px;
  background: white;
  padding: 50px;
  border-radius: 20px;
  &__submit{
    padding: 5px;
    display: flex;
    width: 100%;
    justify-content: center;
    grid-column: 1/3;
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
   }
}
</style>
