const BASE_URL = "http://localhost:3000/goals";

// Get all goals
export async function getGoals() {
  const response = await fetch(BASE_URL);
  return await response.json();
}

// Create a new goal
export async function createGoal(goal) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...goal, savedAmount: 0 }),
  });
  return await response.json();
}

// Update an existing goal
export async function updateGoal(id, updatedGoal) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedGoal),
  });
  return await response.json();
}

// Delete a goal
export async function deleteGoal(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
