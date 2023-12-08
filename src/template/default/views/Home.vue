<template>
    <div>defaultHome</div>
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    onMounted,
    reactive,
    ref,
    toRefs,
    watch,
    getCurrentInstance,
  } from "vue";
  
  export default defineComponent({
    name: "Home",
    components: {},
    props: {
      value: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    setup(props) {
      const state = reactive({});
      const formData = reactive({});
  
      return {
        state,
        formData,
      };
    },
  });
  </script>
  