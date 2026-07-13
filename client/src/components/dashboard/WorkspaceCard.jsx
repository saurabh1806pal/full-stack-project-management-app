import { useNavigate } from "react-router-dom";
import { CheckSquare, Users } from "lucide-react";

// Deterministic accent per workspace so a grid of cards stays
// visually scannable — same workspace always gets the same color.
const ACCENTS = [
  { bar: "bg-violet-500", chip: "bg-violet-50 text-violet-700", ring: "ring-violet-100" },
  { bar: "bg-amber-500", chip: "bg-amber-50 text-amber-700", ring: "ring-amber-100" },
  { bar: "bg-teal-500", chip: "bg-teal-50 text-teal-700", ring: "ring-teal-100" },
  { bar: "bg-rose-500", chip: "bg-rose-50 text-rose-700", ring: "ring-rose-100" },
  { bar: "bg-sky-500", chip: "bg-sky-50 text-sky-700", ring: "ring-sky-100" },
];

const getAccent = (key) => {
  const hash = String(key ?? "")
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return ACCENTS[hash % ACCENTS.length];
};

const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";

const WorkspaceCard = ({ workspace }) => {
  const navigate = useNavigate();
  const accent = getAccent(workspace._id || workspace.name);
  const members = workspace.members ?? [];
  const visibleMembers = members.slice(0, 4);
  const overflowCount = members.length - visibleMembers.length;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/workspace/${workspace._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/workspace/${workspace._id}`);
        }
      }}
      className="group relative flex aspect-[4/3.4] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
    >
      {/* Accent bar */}
      <div className={`h-1.5 w-full ${accent.bar}`} />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title */}
        <div>
          <h2 className="line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-slate-900">
            {workspace.name}
          </h2>
          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
            {workspace.owner?.name || "Unknown"}
          </p>
        </div>

        {/* Member avatar stack */}
        <div className="flex items-center gap-2">
          {visibleMembers.length > 0 ? (
            <div className="flex -space-x-2">
              {visibleMembers.map((member, i) => (
                <div
                  key={member._id || i}
                  title={member.name}
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${accent.chip} ring-2 ring-white text-[10px] font-semibold`}
                >
                  {initials(member.name)}
                </div>
              ))}
              {overflowCount > 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-2 ring-white text-[10px] font-semibold">
                  +{overflowCount}
                </div>
              )}
            </div>
          ) : (
            <span className="text-xs text-slate-400">No members yet</span>
          )}
        </div>

        {/* Stats */}
        <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium text-slate-700">{members.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckSquare className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium text-slate-700">{workspace.taskCount ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;