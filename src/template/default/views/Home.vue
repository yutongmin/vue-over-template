<template>
  <div class="home_container">defaultHome</div>
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
import API from '@/api'

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

    onMounted(() => {
      API.area.getAreaById('341500').then(res => {
        console.log(res)
      })
    })

    return {
      state,
      formData,
    };
  },
});
</script>
