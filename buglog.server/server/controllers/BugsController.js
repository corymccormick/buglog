import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.findBugById)
      .post('', this.createBug)
      .get('/:id/notes', this.getAllNotesByBugId)
      .put('/:id', this.editBug)
      .delete('/:id', this.closeBug)
  }

  async createBug(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const data = await bugsService.createBug(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const data = await bugsService.getAll(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async findBugById(req, res, next) {
    try {
      const data = await bugsService.findBugById({ _id: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getAllNotesByBugId(req, res, next) {
    try {
      const data = await bugsService.getAllNotesByBugId(req.params.id)
      logger.log(data)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await bugsService.editBug(req.body)
      return res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async closeBug(req, res, next) {
    try {
      req.body.id = req.params.id
    } catch (error) {
      next(error)
    }
  }
}
