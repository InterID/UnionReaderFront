<template>
  <div class="background" @click.self="emitCloseForm">
    <div class="reader-form"
         :class="{'reader-form_invalid': isInvalidInput }"
    >
      <label>api</label><input :value="api || ''"
                               ref="apiInput"
                               type="text"
                               @focus="toggleIsInvalidInput">
      <label>port</label><input :value="port || ''"
                                ref="portInput"
                                type="number"
                                @focus="toggleIsInvalidInput"
                                min="1">
      <div class="reader-form__submit">
        <button @click="submitHandler">{{ submitButton }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from "vue";
import {getStore} from "src/store";

export default {
  name: "ReaderForm",
  props: {
    isNewConnect: Boolean,
    api: String,
    port: Number,
  },
  setup(props, {emit}) {
    const submitButton = computed(() => {
      return props.isNewConnect ? "Create" : "Save"
    })
    const isInvalidInput = ref(false);
    const apiInput = ref(null);
    const portInput = ref(null);
    const emitCloseForm = () => emit('closeForm');
    const toggleIsInvalidInput = () => isInvalidInput.value = false;
    const submitHandler = async () => {
      const [api, port] = [apiInput.value.value, portInput.value.value];
      if (api.trim() === '' || port==='' || port<1) {
        isInvalidInput.value = true;
        return
      }
      console.log(api, port);
      await getStore().dispatch("readers/connectNewReader", {api, port})
      emitCloseForm()
    }
    return {
      submitButton,
      submitHandler,
      apiInput,
      portInput,
      emitCloseForm,
      isInvalidInput,
      toggleIsInvalidInput
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
}

.reader-form {
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(2, max-content);
  margin: auto;
  background: white;
  padding: 30px 50px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  background-clip: padding-box;

  &__submit {
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

  input {
    border: 1px solid #1976d2;
  }

  &_invalid {
    input {
      border: 1px solid red;
    }
  }
}
</style>
