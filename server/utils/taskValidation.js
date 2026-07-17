const validateDueDate = (dueDate) => {   // #3
  if (!dueDate) return null;

  const selectedDate = new Date(`${dueDate}T00:00:00`);

  // Invalid date format
  if (isNaN(selectedDate.getTime())) {
    return "Invalid due date.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate.getTime() <= today.getTime()) {
    return "Due date must be in the future.";
  }

  return null;
};

module.exports = { validateDueDate };