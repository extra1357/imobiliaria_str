import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export class AuthService {
  async hashPassword(pwd: string) {
    return await bcrypt.hash(pwd, 10)
  }

  async verifyPassword(pwd: string, hash: string) {
    return await bcrypt.compare(pwd, hash)
  }

  generateToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!)
    } catch {
      return null
    }
  }
}

export default new AuthService()