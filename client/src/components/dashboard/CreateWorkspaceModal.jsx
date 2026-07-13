import { useContext, useState } from "react";
import { WorkspaceContext } from "../../context/workspaceCreateContext";

const CreateWorkspaceModal = ({ open, onClose }) => {
  const { createWorkspace, loading } = useContext(WorkspaceContext);

  const [name, setName] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Workspace name is required");
      return;
    }

    try {
      await createWorkspace({
        name: name.trim(),
      });

      setName("");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to create workspace");
    }
  };

  return (
    <div>
      <h2>Create Workspace</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Workspace Name</label>

          <input
            type="text"
            placeholder="Enter workspace name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <button
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Workspace"}
        </button>
      </form>
    </div>
  );
};

export default CreateWorkspaceModal;