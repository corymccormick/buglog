<template>
  <div class="bugs container-fluid">
    <h1>Current Bugs</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">
            title
          </th>
          <th scope="col">
            reported by
          </th>
          <th scope="col">
            status
          </th>
          <th scope="col">
            last modified
          </th>
        </tr>
      </thead>
      <tbody>
        <Bug v-for="bug in state.bugs" :key="bug.id" :bug-prop="bug" />
      </tbody>
    </table>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'

import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'Bugs',

  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)

    })

    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        console.error('Can Not getBugs')
      }
    })
    return {
      state
    }
  }
}

</script>

<style scoped>

</style>
