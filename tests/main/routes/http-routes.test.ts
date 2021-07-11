import app from '@/main/config/app'
import request from 'supertest'

describe('Http Routes', () => {
  describe('GET /posts', () => {
    test('Should return 200 on GET any API', async () => {
      await request(app)
        .get('/fake-api/v1/posts')
        .expect(200)
    })
  })

  describe('POST /posts', () => {
    test('Should return 200 on POST any API', async () => {
      await request(app)
        .post('/fake-api/v1/posts')
        .send({
          title: 'any_title',
          description: 'any_description'
        })
        .expect(200)
    })
  })

  describe('PUT /posts/1', () => {
    test('Should return 200 on POST any API', async () => {
      await request(app)
        .put('/fake-api/v1/posts/1')
        .send({
          title: 'any_title',
          description: 'any_description'
        })
        .expect(200)
    })
  })

  describe('PATCH /posts/1', () => {
    test('Should return 200 on POST any API', async () => {
      await request(app)
        .patch('/fake-api/v1/posts/1')
        .send({
          title: 'any_title',
          description: 'any_description'
        })
        .expect(200)
    })
  })

  describe('DELETE /posts/1', () => {
    test('Should return 200 on POST any API', async () => {
      await request(app)
        .delete('/fake-api/v1/posts/1')
        .expect(200)
    })
  })
})
