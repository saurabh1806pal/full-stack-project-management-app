import { useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { WorkspaceContext } from "../../context/workspaceCreateContext";

const CreateWorkspaceModal = ({ open, onClose }) => {
  const { createWorkspace, loading } = useContext(WorkspaceContext);

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  // Drive the enter/exit transition and lock page scroll while open.
  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
      return () => {
        cancelAnimationFrame(frame);
        document.body.style.overflow = "";
      };
    }
    setVisible(false);
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleClose = () => {
    setName("");
    setError("");
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Workspace name is required");
      return;
    }

    try {
      await createWorkspace({ name: name.trim() });
      setName("");
      onClose();
    } catch (err) {
      console.error(err);
      setError("Couldn't create the workspace. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-200 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-workspace-title"
        className={`relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl shadow-slate-900/20 transition-all duration-200 ${
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 id="create-workspace-title" className="text-lg font-semibold tracking-tight text-slate-900">
          Create workspace
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Give your workspace a name to get started.
        </p>

        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="workspace-name" className="block text-sm font-medium text-slate-700">
            Workspace name
          </label>
          <input
            id="workspace-name"
            ref={inputRef}
            type="text"
            placeholder="e.g. Dev Team 2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            className={`mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
              error
                ? "border-rose-300 focus:ring-rose-200"
                : "border-slate-200 focus:ring-slate-300"
            }`}
          />
          {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating…" : "Create workspace"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;