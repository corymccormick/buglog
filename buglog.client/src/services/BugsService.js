import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
// import router from '../router'

class BugsService {
  async getBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
      logger.log('bugs from api', res.data)
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

  // async getPostById(id) {
  //   try {
  //     const res = await api.get('api/posts/' + id)
  //     AppState.posts = res.data
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }

  // // search post (query)
  // //  api.get('posts?query='+query)
  // // router push to 'searchResults'

  // async createPost(data) {
  //   const res = await api.post('api/posts', data)
  //   const res2 = await api.get(`api/profiles/${res.data.creatorId}/posts`)
  //   AppState.posts = res2.data

  //   // router.push({ name: 'Profile', params: { id: res.data.id } })
  // }

  // // async getNextPage() {
  // //   try {
  // //     const res = await api.get('api/posts?page=)
  // //     AppState.posts = res.data
  // //   } catch (error) {
  // //     logger.error(error)
  // //   }
  // // }

  // async deletePost(id) {
  //   await api.delete('api/posts/' + id)
  //   AppState.posts = AppState.posts.posts.filter(post => post.id !== id)
  //   router.push({ name: 'Home' })
  // }

  // // NOTE this delete function works but only on manual page refresh or from the profile page routing you back to the homepage
  // async likePost(id) {
  //   await api.post(`api/posts/${id}/like`)
  // }
}
export const bugsService = new BugsService()
