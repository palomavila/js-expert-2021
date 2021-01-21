const { describe, it, before, afterEach } = require('mocha');
const { expect } = require('chai');
const TodoRepository = require('../src/todoRepository');
const { createSandbox } = require('sinon');

describe('todoRepository', () => {
  let todoRepository;
  let sandBox;
  before(() => {
    todoRepository = new TodoRepository();
    sandBox = createSandbox();
  });

  afterEach(() => {
    sandBox.restore();
  });

  describe('methods signature', () => {
   it('should call inserOne from lokijs', () => {
       const mockDatabase = [
                {
                    name: 'LILO ',
                    age: 30,
                    meta: { revision: 0, created: 1611185653507, version: 0 },
                    '$loki': 1
                };
            ] 
          
      const functionName = 'find';
      const expectedReturn = mockDataBase;
      
        sandbox.stub(todoRepository.schedule, functionName)
        .returns(expectedReturn);

      const result = todoRepository.list();
      expect(result).to.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnce).to.be.ok;
    });

    it('should call insertOne from lokijs', () => {
      const functionName = 'insertOne';
      const expectedReturn = true;

      sandBox
        .stub(todoRepository.schedule, functionName)
        .returns(expectedReturn);

      const data = { name: 'Paloma' };
      const result = todoRepository.create(data);

      expect(result).to.be.deep.equal(expectedReturn);
      expect(todoRepository.schedule[functionName].calledOnceWithExactly(data)).to.be.ok;
    });
  });
