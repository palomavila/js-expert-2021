const assert = require('assert');
const Employee = require('./employee');
const Manager = require('./manager');
const Util = require('./util');

const GENDER = {
  male: 'male',
  female: 'female',
};

{
  const employee = new Employee({
    name: 'Ana',
    gender: GENDER.female,  
  });

  assert.throws(() => employee.birthYear, { message: 'You must define age first!' });
}

const CURRENT_YEAR = 2021;
Date.prototype.getFullYear = () => CURRENT_YEAR;

{
  const employee = new Employee({
    name: 'Lilo',
    age: 26,
    gender: GENDER.male
  });

  assert.deepStrictEqual(employee.name, 'Mr. Lilo');
  assert.deepStrictEqual(employee.age, undefined);
  assert.deepStrictEqual(employee.gender, undefined);
  assert.deepStrictEqual(employee.gender, undefined);
  assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40));
  assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32));

  const expectedBirthYear = 1994;
  assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

}

{
  const manager = new Manager({
    name: 'Maya',
    gender: GENDER.female,
    age: 25,
  });

  assert.deepStrictEqual(manager.name, 'Ms. Maya');
  assert.deepStrictEqual(manager.age, undefined);
  assert.deepStrictEqual(manager.gender, undefined);
  assert.deepStrictEqual(manager.birthYear, 1995);
  assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40));
  assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32));
  assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000));
}
