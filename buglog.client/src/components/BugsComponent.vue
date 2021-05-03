<template>
  <tr class="bug">
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}">
      <td>{{ bugProp.title }}  </td>
    </router-link>
    <td>{{ bugProp.creator.name }} </td>
    <td>{{ bugProp.closed }} </td>
    <td> {{ bugProp.updatedAt }}</td>
  </tr>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Bug',
  props: {
    bugProp: {
      type: Object,
      required: true
    }

  },
  setup() {
    const state = reactive({
      bug: computed(() => AppState.boards)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
