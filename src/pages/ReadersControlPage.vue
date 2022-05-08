<template>
  <div>
    <ResponseMessage/>
    <ListOfReaders/>
  </div>
</template>

<script>
import ListOfReaders from "components/reader-ctrl/ListOfReaders";
import ResponseMessage from "components/ResponseMessage";

export default {
  name: "ReadersControlPage",
  components: {ListOfReaders, ResponseMessage},
}
</script>

<style scoped>
</style>
