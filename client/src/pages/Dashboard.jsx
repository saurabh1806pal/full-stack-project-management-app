import { useContext, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { WorkspaceContext } from "../context/workspaceCreateContext";

import WorkspaceGrid from "../components/dashboard/WorkspaceGrid";
import CreateWorkspaceModal from "../components/dashboard/CreateWorkspaceModal";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { workspaces, fetchWorkspaces } = useContext(WorkspaceContext);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 py-10 sm:px-8 lg:px-10">
        {/* Page header */}
        <div className="mb-8 w-full">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Workspaces
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {workspaces?.length
              ? `${workspaces.length} workspace${workspaces.length === 1 ? "" : "s"} in your account`
              : "Everything you're working on, in one place"}
          </p>
        </div>

        {/* Centered workspace grid */}
        <div className="w-full">
          <WorkspaceGrid workspaces={workspaces} />
        </div>
      </main>

      {/* Floating Create Workspace button */}
      <button
        onClick={() => setShowModal(true)}
        className="group fixed bottom-8 right-8 z-40 flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3.5 text-sm font-medium text-white shadow-lg shadow-slate-900/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/30 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
        <span>Create Workspace</span>
      </button>

      <CreateWorkspaceModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Dashboard;