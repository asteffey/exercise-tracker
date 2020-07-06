import User from '../models/User'
import { NextFunction, Response } from 'express'

const DUPLICATE_KEY_ERROR = 11000

interface NewUserRequest {
  body: {
    username: string
  }
}

export async function newUser ({ body: { username } }: NewUserRequest, response: Response, next: NextFunction) {
  try {
    const { _id } = await User.create({ username })
    response.json({
      _id: _id.toString(),
      username
    })
  } catch (err) {
    if (err.code === DUPLICATE_KEY_ERROR) {
      response.status(400)
      response.send(`username ${username} already exists`)
    } else {
      next(err)
    }
  }
}