import { useState, useEffect } from "react";

function GoalForm({ onSave, editingGoal, onDelete }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        name: editingGoal.name || "",
        targetAmount: editingGoal.targetAmount || "",
        category: editingGoal.category || "",
        deadline: editingGoal.deadline || "",
      });
    } else {
      setFormData({ name: "", targetAmount: "", category: "", deadline: "" });
    }
  }, [editingGoal]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData); // Delegate to parent
    setFormData({ name: "", targetAmount: "", category: "", deadline: "" }); // Reset form
  }

  function handleDelete() {
    if (editingGoal) {
      onDelete(editingGoal.id); // Let parent delete
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingGoal ? "Edit Goal" : "Add New Goal"}</h2>
      <input
        type="text"
        name="name"
        placeholder="Goal Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="targetAmount"
        placeholder="Target Amount"
        value={formData.targetAmount}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        type="date"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
      />
      <button type="submit">{editingGoal ? "Update Goal" : "Add Goal"}</button>
      {editingGoal && (
        <button type="button" onClick={handleDelete}>
          Delete
        </button>
      )}
    </form>
  );
}

export default GoalForm;
