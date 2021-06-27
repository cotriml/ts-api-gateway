declare module Express {
  interface Request {
    tokenUserId?: string
    fullPath: string
  }
}
