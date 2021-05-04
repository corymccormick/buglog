<template>
  <div class="bugs container-fluid">
    <h1>Current Bugs</h1>
    <button type="button" class="btn btn-primary m-2" data-toggle="modal" data-target="#createBug">
      REPORT A BUG
    </button>
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
    <div class="modal"
         id="createBug"
         tabindex="-1"
         role="dialog"
         aria-labelledby="reportabug"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Report a Bug
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="createBug">
            <div class="modal-body">
              <div class="form-group">
                <label for="title">title</label>
                <input type="text"
                       class="form-control"
                       id="title"
                       placeholder="Bug title..."
                       v-model="state.newBug.title"
                       required
                >
              </div>
              <div class="form-group">
                <label for="description">Bug Description</label>
                <input type="text"
                       class="form-control"
                       id="description"
                       placeholder="Bug Description..."
                       v-model="state.newBug.description"
                       required
                >
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">
                  Report Bug
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bugsService } from '../services/BugsService'
import { reactive, onMounted, computed } from 'vue'
import { AppState } from '../AppState'
import Notification from '../utils/Notification'
export default {
  name: 'Bugs',

  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      newBug: {}

    })

    onMounted(async() => {
      try {
        await bugsService.getBugs()
      } catch (error) {
        console.error('Can Not getBugs')
      }
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
          state.newBug = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}

</script>

<style scoped>

</style>
