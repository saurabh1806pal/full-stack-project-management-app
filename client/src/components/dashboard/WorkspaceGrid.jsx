import { FolderPlus } from "lucide-react";
import WorkspaceCard from "./WorkspaceCard";

const WorkspaceGrid = ({ workspaces }) => {
  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 px-6 py-20 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <FolderPlus className="h-6 w-6 text-slate-400" />
        </div>
        <h2 className="mt-4 text-sm font-semibold text-slate-900">
          No workspaces yet
        </h2>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          Create a workspace to start organizing projects and inviting teammates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace._id} workspace={workspace} />
      ))}
    </div>
  );
};

export default WorkspaceGrid;