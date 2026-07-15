// RDS

const test = require('node:test'); 
const assert = require('node:assert/strict');
const { validateDueDate } = require('../utils/taskValidation');

test('rejects due dates in the past', () => {
  assert.equal(validateDueDate('2020-01-01'), 'Due date must be in the future');
});

test('rejects today\'s date because it is not in the future', () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  assert.equal(validateDueDate(`${yyyy}-${mm}-${dd}`), 'Due date must be in the future');
});

test('accepts future due dates', () => {
  assert.equal(validateDueDate('2099-01-01'), null);
});

test('allows empty due dates', () => {
  assert.equal(validateDueDate(''), null);
});
