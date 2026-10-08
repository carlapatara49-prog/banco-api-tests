const request = require('supertest');
const { expect } = require('chai')
require ('dontenv').config()
const { obterToken } = require ('../helpers/autenticacao.js')

describe('transferencias',function (){

           let token   
   //Capturar o token
            beforeEach(async () => {
            const token =  await obterToken ('julio.lima', '123456')
            })


     describe ('POST / transferencias', function(){
        it('Retornar 201 quando o valor da transferencia for igual ou acima de R$10,00', async function(){
         
           const respostaTransferencia = await request(process.env.BASE_URL) // caminho do servidor
                 .post('/transferencias')
                  .set('Content-Type', 'application/json')
                  .set('Authorization', ` Bearer ${token}`)
                  .send({
                         'contaOrigem': 1,
                         'contaDestino': 2,
                         'valor': 11,
                         'token': ""
                         })
            expect(respostaTransferencia.status).to.equal(201);   
            
            console.log (respostaTransferencia.body)

        })
         it('Retornar 402 quando o valor da transferencia for abaixo de R$10,00', async function(){
       
            const respostaTransferencia = await request('http://localhost:3000') // caminho do servidor
                 .post('/transferencias')
                  .set('Content-Type', 'application/json')
                  .set('Authorization', ` Bearer ${token}`)
                  .send({
                         'contaOrigem': 1,
                         'contaDestino': 2,
                         'valor': 7,
                         'token': ""
                         })
            expect(respostaTransferencia.status).to.equal(422);   
            
            console.log (respostaTransferencia.body)
         })

     })

})