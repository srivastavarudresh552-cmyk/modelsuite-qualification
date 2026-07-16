// #3
const validateDueDate = (dueDate) => {
  if (!dueDate) return null;

  const selectedDate = new Date(`${dueDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return selectedDate.getTime() <= today.getTime()
    ? 'Due date must be in the future'
    : null;
};

module.exports = { validateDueDate };
