import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { Response } from 'superagent';
import { teamsMock, oneTeamMock } from './mocks/teamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes do Endpoint /teams', () => {
  let chaiHttpResponse: Response;
  let findAllStub: sinon.SinonStub;
  let findOneStub: sinon.SinonStub;
  
  beforeEach(() => {
    findAllStub = sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[]);
    findOneStub = sinon.stub(TeamModel, 'findOne').resolves(oneTeamMock as TeamModel);
  });
  
  afterEach(() => {
    findAllStub.restore();
    findOneStub.restore();
  });

  it('Deve retornar uma lista com todos os times', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(16);
    expect(chaiHttpResponse.body[0]).to.deep.equal({ id: 1, teamName: 'Avaí/Kindermann' });
    expect(chaiHttpResponse.body[1]).to.deep.equal({ id: 2, teamName: 'Bahia' });
  });

  it('Deve retornar um time por ID', async () => {
    const teamId = 9;
    chaiHttpResponse = await chai.request(app).get(`/teams/${teamId}`);

    expect(chaiHttpResponse).to.have.status(200);
    expect(findOneStub.calledOnceWithExactly({ where: { id: teamId } })).to.be.true;
    expect(chaiHttpResponse.body).to.deep.equal(oneTeamMock);
  });
});

    /**
     * Exemplo do uso de stubs com tipos
     */
  
    // let chaiHttpResponse: Response;
  
    // before(async () => {
    //   sinon
    //     .stub(Example, "findOne")
    //     .resolves({
    //       ...<Seu mock>
    //     } as Example);
    // });
  
    // after(()=>{
    //   (Example.findOne as sinon.SinonStub).restore();
    // })
  
    // it('...', async () => {
    //   chaiHttpResponse = await chai
    //      .request(app)
    //      ...
  
    //   expect(...)
    // });