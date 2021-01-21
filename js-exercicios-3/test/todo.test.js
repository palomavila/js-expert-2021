const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const { createSandbox } = require('sinon');
const Todo = require('../src/todo');

describe('todo', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = createSandbox();
  });

  afterEach(() => sandBox.restore());

  describe('#isValid', () => {
    it ('should return invalid when created an object without text', () => {
      const data = {
        text: '',
        when: new Date('2020-12-01'),
      };
      const todo = new Todo(data);
      const result = todo.isValid();

      expect(result).to.be.not.ok;
    });
    it('should return invalid while created an object using "when" property by mistake', () => {
      const data = {
        text: 'Hello World',
        when: new Date('20-12-01'),
      };
      const todo = new Todo(data);
      const result = todo.isValid();

      expect(result).to.be.not.ok;
    });
    it('missing "id", "text", "when" and "status" properties after created the object', () => {
      const data = {
        text: 'Hello World',
        when: new Date('2020-12-01'),
      };
      const expectedId = '000001';

      const uuid = require('uuid');
      const fakeUUID = sandBox.fake.returns(expectedId);
      sandBox.replace(uuid, 'v4', fakeUUID);

      const todo = new Todo(data);
      const expectedItem = {
        text: data.text,
        when: data.when,
        status: '',
        id: expectedId,
      };

      const result = todo.isValid();
      expect(result).to.be.ok;
      expect(uuid.v4.calledOnce).to.be.ok;
      expect(todo).to.be.deep.equal(expectedItem);
    });
  });
});
