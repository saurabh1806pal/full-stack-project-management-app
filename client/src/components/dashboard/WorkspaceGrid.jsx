import WorkspaceCard from "./WorkspaceCard";

const WorkspaceGrid = ({ workspaces }) => {
  if (workspaces.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-semibold">
          No Workspaces Yet
        </h2>

        <p className="text-gray-500 mt-2">
          Create your first workspace to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace._id}
          workspace={workspace}
        />
      ))}
    </div>
  );
};

export default WorkspaceGrid;