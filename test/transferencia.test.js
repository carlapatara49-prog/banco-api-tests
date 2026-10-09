const request = require('supertest');
const { expect } = require('chai')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao.js')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('transferencias', function () {
    let token;

    beforeEach(async () => {
        // 2. Corrigido escopo da variável token (removido o 'const')
        token = await obterToken('julio.lima', '123456');
    })

    describe('POST / transferencias', function () {
        it('Retornar 201 quando o valor da transferencia for igual ou acima de R$10,00', async function () {
            const bodyTransferencias = { ...postTransferencias };
            const respostaTransferencia = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)  
                .send(bodyTransferencias);

            expect(respostaTransferencia.status).to.equal(201);
            console.log(respostaTransferencia.body);
        });

        it('Retornar 402 quando o valor da transferencia for abaixo de R$10,00', async function () {
            const bodyTransferencias = { ...postTransferencias };
            bodyTransferencias.valor = 7;
            const respostaTransferencia = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)  
                .send(bodyTransferencias);

            expect(respostaTransferencia.status).to.equal(422);
            console.log(respostaTransferencia.body);
        });
    });

    describe('GET / transferencias', function () {
        it('Retornar sucesso com 200 e dados iguais ao registro de transferencia contido no banco de dados quando o id for valido', async function () {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/4')
                .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200)
            expect(resposta.body.id).to.equal(4)
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).to.equal(1)
            expect(resposta.body.conta_destino_id).to.equal(2)
            expect(resposta.body.conta_valor).to.equal(11.00)
        });
    });
    describe('GET / transferencias', function () {
        it('Retornar 10 elermentos na paginação quando informar limite de 10 registros', async function () {
            const resposta = await request(process.env.BASE_URL)
            .get('/transferencias?page=1&limit=9')
            .set('Authorization', `Bearer ${token}`);

            expect(resposta.status).to.equal(200)
            expect(resposta.body.limit).to.equal(9)
            expect(resposta.body.transferencias).to.have.lengthOf(9)
        });
    });

});