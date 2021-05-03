<template>
  <div class="bugDetails">
    CHOSEN BUGS DETAILS AND COMMENTS
    <br />
    {{ state.bugs.title }}
    <br />
    {{ state.bugs.creator.name }}
    <br />
    {{ state.bugs.description }}
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'BugDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      bugs: computed(() => AppState.activeBug)
    })

    onMounted(async() => {
      try {
        await bugsService.getBug(route.params.id)
      } catch (error) {
        console.error('Can Not getBug')
      }
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
