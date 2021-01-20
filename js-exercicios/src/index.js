const assert = require('assert');
const Employee = require('./employee');
const Manager = require('./manager');
const Util = require('./util');

const GENDER = {
  male: 'male',
  female: 'female',
}

{
  const employee = new Employee({
    name: 'Ana',
    gender: GENDER.female  
  })

  assert.throws(() => employee.birthYear, { message: 'You must define age first!' })
}

const CURRENT_YEAR = 2021;
Date.prototype.getFullYear = () => CURRENT_YEAR;

{
  const employee = new Employee({
    name: 'Lilo',
    age: 26,
    gender: GENDER.male
  })

  assert.deepStrictEqual(employee.name, 'Mr. Lilo');
  assert.deepStrictEqual(employee.age, undefined);
  assert.deepStrictEqual(employee.gender, undefined);
  assert.deepStrictEqual(employee.gender, undefined);
  assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.40));
  assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32));

  const expectedBirthYear = 1995;
  assert.deepStrictEqual(employee.birthYear, expectedBirthYear);
 
  /* tem set*/
  employee.age = 80;
  assert.deepStrictEqual(employee.birthYear, 1941);
    

    console.log('\n----employee----');
    console.log('employee.name', employee.name);
    console.log('employee.gender', employee.gender);
    console.log('employee.age', employee.age);
    console.log('employee.birthYear', employee.birthYear);
    console.log('employee.grossPay', employee.grossPay);
    console.log('employee.netPay', employee.netPay);

}

{
  const manager = new Manager({
    name: 'Maya',
    age: 25,
    gender: GENDER.female
  })

    assert.deepStrictEqual(manager.name, "Mr. Juninho");
    assert.deepStrictEqual(manager.gender, undefined);
    assert.deepStrictEqual(manager.age, undefined);
    assert.deepStrictEqual(manager.birthYear, 1996);
    assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.40));
    assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32));
    assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(6000.32);

    console.log('\n----manager----');
    console.log('manager.name', manager.name);
    console.log('manager.gender', manager.gender);
    console.log('manager.age', manager.age);
    console.log('manager.birthYear', manager.birthYear);
    console.log('manager.grossPay', manager.grossPay);
    console.log('manager.netPay', manager.netPay);
    console.log('manager.bonuses', manager.bonuses);
  }
