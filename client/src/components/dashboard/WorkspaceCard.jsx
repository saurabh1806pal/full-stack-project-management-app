import { useNavigate } from "react-router-dom";

const WorkspaceCard = ({ workspace }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/workspace/${workspace._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md border border-gray-200 p-5 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      {/* Workspace Name */}
      <h2 className="text-xl font-semibold text-gray-800">
        {workspace.name}
      </h2>

      {/* Owner */}
      <p className="text-sm text-gray-500 mt-2">
        Owner:{" "}
        <span className="font-medium text-gray-700">
          {workspace.owner?.name || "You"}
        </span>
      </p>

      {/* Members */}
      <p className="text-sm text-gray-500 mt-1">
        Members:{" "}
        <span className="font-medium text-gray-700">
          {workspace.members?.length || 1}
        </span>
      </p>

      {/* Tasks */}
      <p className="text-sm text-gray-500 mt-1">
        Tasks:{" "}
        <span className="font-medium text-gray-700">
          {workspace.taskCount ?? 0}
        </span>
      </p>
    </div>
  );
};

export default WorkspaceCard;