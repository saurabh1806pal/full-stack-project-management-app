import { useNavigate } from "react-router-dom";

const WorkspaceCard = ({ workspace }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/workspace/${workspace._id}`)
      }
    >
      <h2>{workspace.name}</h2>

      <p>
        Owner:{" "}
        {workspace.owner?.name || "Unknown"}
      </p>

      <p>
        Members:{" "}
        {workspace.members?.length || 0}
      </p>

      <p>
        Tasks: {workspace.taskCount ?? 0}
      </p>
    </div>
  );
};

export default WorkspaceCard;