<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">{{ listData }}
      <q-select
        filled
        v-model="modelObject"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="list"
        @filter="filterFn"
        @update:model-value="temp"
        hint="Введите условие для поиска"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section
              class="text-grey">
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";

const stringOptions = [
  "Google", "Facebook", "Twitter", "Apple", "Oracle"
];

let list = [
  {
    value: String,
    label: String
  }
];

let modelObject = ref([
  {
    value: String,
    label: String
  }
]);


export default defineComponent({

  props: {

    listData: [],
    initialValue: String
  },


  setup(props) {


    let model = computed(() => props.initialValue);

    console.log("88888888888888888",model.value)

    let options = computed(() => props.listData);



    // modelObject =  {  value: options.value.find(option => option.id === model.value).id,
    //                 label: options.value.find(option => option.id === model.value).name};

    console.log("MOOOOOOOO", props.listData);



    // modelObject = {value: options.value.find(option => option.id === model.value).id,
    //                label: options.value.find(option => option.id === model.value).name}

    // console.log("MOOOOOOOO",modelObject)

    list =  options.value.map((res) => {
      return { value: res.id, label: res.name };

    });

    console.log("List", list.value);

    // modelObject = {value: list.find((list) => list.id === model.value).value,
    //   label: list.find(list => list.id === model.value).label}

    // console.log("MOOOOOOOO",modelObject)

    function temp(model) {

      console.log(model.value);
    }

    console.log("2452524523452435", list);


    // eslint-disable-next-line vue/no-setup-props-destructure
    const filter = props.listData;


    return {
      model,
      options,
      list,
      temp,
      modelObject,

      filterFn(val, update, abort) {
        update(() => {
          const needle = val.toLowerCase();
          list.value = filter.filter(v => v.id.toLowerCase().indexOf(needle) > -1);
        });
      }
    };
  }
});
</script>
