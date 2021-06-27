import app from '@/main/config/app'
import request from 'supertest'

describe('Http Routes', () => {
  describe('GET /pokemon', () => {
    test('Should return 200 on GET any API', async () => {
      await request(app)
        .get('/pokemon-api/v2/pokemon/ditto')
        .expect(200)
    })
  })
})
