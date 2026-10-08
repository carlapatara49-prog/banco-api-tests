const request = require('supertest');
const { expect } = require('chai')
require ('dontenv').config()

describe('login',function (){
    describe ('POST / login', function(){
     it('Deve retornar 200 com um token em string quando usar credenciais validas', async function(){
            const resposta = await request(process.env.BASE_URL)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send({
                  'username': 'julio.lima',
                  'senha': '123456'
                })
        expect(resposta.status).to.equal(200);        
        expect(resposta.body.token).to.be.a('string');        
     })   
    })
})

