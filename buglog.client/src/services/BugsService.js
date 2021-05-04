import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Notification from '../utils/Notification'
// import router from '../router'

class BugsService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getBug(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      AppState.activeBug = res.data
    } catch (error) {

    }
  }

  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs/', newBug)
      AppState.bugs.push(res.data)
      // router.push({ name: 'BugDetailsPage', params: { id: res.data.id } })
      Notification.toast('Bug Created', 'success')
    } catch (error) {
      Notification.toast('Error', 'error')
    }
  }

  // async createPost(data) {
  //   const res = await api.post('api/posts', data)
  //   const res2 = await api.get(`api/profiles/${res.data.creatorId}/posts`)
  //   AppState.posts = res2.data

  //   // router.push({ name: 'Profile', params: { id: res.data.id } })
  // }
}
export const bugsService = new BugsService()
