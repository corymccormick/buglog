<template>
  <tr class="bug">
    <router-link :to="{name: 'BugDetailsPage', params: {id: bugProp.id}}">
      <td>{{ bugProp.title }}  </td>
    </router-link>
    <td>{{ bugProp.creator.name }} </td>
    <td :class="{'closed-color': bugProp.closed} ">
      {{ bugProp.closed ? 'closed': 'open' }}
    </td>
    <td> {{ dateString }}</td>
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
  computed: {
    dateString() {
      let [month, date, year] = new Date(this.bugProp.updatedAt).toLocaleDateString('en-US').split('/')
      if (month < 10) {
        month = '0' + month
      }
      if (date < 10) {
        date = '0' + date
      }
      return `${month}/${date}/${year}`
    }
  },
  setup() {
    const state = reactive({
      bug: computed(() => AppState.bugs)

    })
    return {
      state

    }
  }
}
</script>

<style>
.closed-color{
  color: red;

}

</style>
