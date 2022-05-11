<template>
  <div class="readers">
    <div class="readers__toolbar">
      <button class="readers__button" @click="toggleIsShowForm">New Connect</button>
      <button class="readers__button refresh"
              :class="{active: isRefreshAnimation}"
      @click="refreshHandler"></button>
    </div>
    <div class="container">
      <div class="readers__list" v-if="readers.length > 0">
        <div class="table__header">api</div>
        <div class="table__header">port</div>
        <div class="table__header">status</div>
        <div class="table__header">Inventory</div>
        <div class="table__header"></div>
        <div class="table__header"></div>
        <Reader v-for="reader of readers"
                :key="reader.api"
                :reader="reader"
        />
        <ReaderForm
          v-if="isShowForm"
          :is-new-connect="true"
          @close-form=toggleIsShowForm
        />
      </div>
      <div class="loader" v-else>Loading...</div>
    </div>
  </div>

</template>

<script>
import Reader from "components/reader-ctrl/Reader";
import ReaderForm from "components/reader-ctrl/ReaderForm";
import {computed, ref, watch} from "vue";
import {getStore} from "src/store";


export default {
  name: "ListOfReaders",
  components: {
    Reader,
    ReaderForm
  },
  setup() {
    const isRefreshAnimation = ref(false);
    const isShowForm = ref(false);
    const readers = computed(() => getStore().getters["readers/getReaders"]);

    const toggleIsShowForm = () => {
      isShowForm.value = !isShowForm.value;
    }
    const refreshHandler = () => {
      isRefreshAnimation.value = true;
      getStore().dispatch("readers/fetchReaders")
    }
    watch(isRefreshAnimation, (val) => {
      if (val) {
        setTimeout(()=>{
          isRefreshAnimation.value = false
        },500)
      }
    })
    getStore().dispatch("readers/fetchReaders")
    return {
      readers,
      toggleIsShowForm,
      isShowForm,
      refreshHandler,
      isRefreshAnimation
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  margin: auto;
}

.readers {
  padding-top: 100px;

}

.readers__toolbar {
  display: flex;
  padding: 20px 0 40px 0;
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
  grid-template-columns: repeat(6, max-content);
  justify-items: center;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #1976d2;
  box-shadow: 0 3px 7px rgba(25, 118, 210, 0.3);
  background-clip: padding-box;
  font-size: 1.2rem;
}

.table__header {
  color: #1976d2;
  border-bottom: 1px solid #1976d2;
}

.refresh {
  margin: 0 0 0 80px;
  border-radius: 100%;
  background-image: url("../../assets/icons/spinner.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px 20px;
  width: 40px;
  height: 40px;

  &.active {
    animation: rotate 600ms ease;
  }
}

.loader {
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}

@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.5), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.5), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.5), 2.5em 0em 0 0em rgba(25, 118, 210, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.5), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.5), 0em 2.5em 0 0em rgba(25, 118, 210, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.5), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.5), -2.6em 0em 0 0em rgba(25, 118, 210, 0.7), -1.8em -1.8em 0 0em #ffffff;
  }
}

@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.5), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.5), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.5), 2.5em 0em 0 0em rgba(25, 118, 210, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.5), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.2), -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.5), 0em 2.5em 0 0em rgba(25, 118, 210, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(25, 118, 210, 0.2), -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.5), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(25, 118, 210, 0.2), 1.8em -1.8em 0 0em rgba(25, 118, 210, 0.2), 2.5em 0em 0 0em rgba(25, 118, 210, 0.2), 1.75em 1.75em 0 0em rgba(25, 118, 210, 0.2), 0em 2.5em 0 0em rgba(25, 118, 210, 0.2), -1.8em 1.8em 0 0em rgba(25, 118, 210, 0.5), -2.6em 0em 0 0em rgba(25, 118, 210, 0.7), -1.8em -1.8em 0 0em #ffffff;
  }
}

@keyframes rotate {
  from {

  }
  to {
    transform: rotateZ(360deg);
  }
}
</style>
