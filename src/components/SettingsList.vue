<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-select
        filled
        v-model="modelValue"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="list"
        @filter="filterFn"
        @update:model-value="$emit('updateValue', modelValue)"
        hint="Введите условие для поиска"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch, reactive } from "vue";

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

let list = [
  {
    value: String,
    label: String,
  },
];

let modelObject = ref([
  {
    value: String,
    label: String,
  },
]);

export default defineComponent({
  props: {
    listData: [],
    initialValue: String,
  },

  emits: ["updateValue"],
  setup(props) {
    let options = computed(() => {
      return props.listData;
    });

    let modelObject = computed(() => {
      const option = props.listData.find(
        (option) => option.id == props.initialValue
      );
      if (option) return { value: props.initialValue, label: option.name };
      return props.initialValue;
    });

    let modelValue = ref({ value: "", label: "" });

    watch(
      () => props.listData,
      () => {
        const option = props.listData.find(
          (option) => option.id == props.initialValue
        );
        if (option) {
          modelValue.value = { value: props.initialValue, label: option.name };
        }
        /*const option = props.listData.find((option) => option.id == props.initialValue)
      if (option) {modelValue.value=props.initialValue
        modelValue.label= option.name
      }*/
      }
    );
    // watch(() => props.initialValue, ()=>{
    //   const option = props.listData.find((option) => option.id == props.initialValue)
    //   if(option) {
    //     modelValue.value = {value: props.initialValue, label: option.name}
    //   }
    //   /*const option = props.listData.find((option) => option.id == props.initialValue)
    //   if (option) {modelValue.value=props.initialValue
    //     modelValue.label= option.name
    //   }*/
    // })

    // modelObject =  {  value: options.value.find(option => option.id === model.value).id,
    //                 label: options.value.find(option => option.id === model.value).name};

    // modelObject = {value: options.value.find(option => option.id === model.value).id,
    //                label: options.value.find(option => option.id === model.value).name}

    // console.log("MOOOOOOOO",modelObject)

    list = computed(() =>
      options.value.map((res) => {
        return { value: res.id, label: res.name };
      })
    );

    // modelObject = {value: list.find((list) => list.id === model.value).value,
    //   label: list.find(list => list.id === model.value).label}

    // console.log("MOOOOOOOO",modelObject)

    function temp(model) {
      //console.log(model.value);
    }

    // eslint-disable-next-line vue/no-setup-props-destructure
    const filter = props.listData;

    return {
      options,
      list,
      temp,
      modelObject,
      modelValue,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          list.value = filter.filter(
            (v) => v.id.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
});
</script>
