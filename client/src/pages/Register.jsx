import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/authCreateContext";

// ─── Slider content (shared with Login) ──────────────────────────────────────
const SLIDES = [
  {
    eyebrow: "Workspaces",
    headline: "Every team, one place.",
    body: "Bring projects, docs, and conversations together so nothing lives in someone's inbox.",
    accent: "#6366f1",
    bg: "#eef2ff",
  },
  {
    eyebrow: "Tasks",
    headline: "Work that moves forward.",
    body: "Assign, track, and close out tasks without switching between five different tools.",
    accent: "#0ea5e9",
    bg: "#f0f9ff",
  },
  {
    eyebrow: "Members",
    headline: "The right people, in the loop.",
    body: "Fine-grained roles mean everyone sees exactly what they need — no more, no less.",
    accent: "#10b981",
    bg: "#ecfdf5",
  },
];

const INTERVAL = 3800;

// ─── Auto-advancing slider ────────────────────────────────────────────────────
const Slider = () => {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % SLIDES.length);
        setAnimating(false);
      }, 320);
    }, INTERVAL);
    return () => clearInterval(id);
  }, []);

  const slide = SLIDES[active];

  return (
    <div
      className="w-full rounded-2xl p-8 transition-colors duration-700 mb-8 min-h-43 flex flex-col justify-between"
      style={{ background: slide.bg }}
    >
      {/* Eyebrow + dots */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{ color: slide.accent, background: `${slide.accent}18` }}
        >
          {slide.eyebrow}
        </span>

        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300 cursor-pointer border-0 p-0"
              style={{
                width: i === active ? 20 : 6,
                height: 6,
                background: i === active ? slide.accent : `${slide.accent}40`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Copy */}
      <div
        className="transition-all duration-300"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(6px)" : "translateY(0)",
        }}
      >
        <h3 className="text-xl font-bold leading-snug mb-2" style={{ color: "#111" }}>
          {slide.headline}
        </h3>
        <p className="text-sm leading-relaxed text-neutral-500">{slide.body}</p>
      </div>
    </div>
  );
};

// ─── Shared input class ───────────────────────────────────────────────────────
const inputCls =
  "w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-200 " +
  "bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 " +
  "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent " +
  "transition-all duration-150";

// ─── Register page ────────────────────────────────────────────────────────────
const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="light min-h-screen bg-neutral-50 flex items-center justify-center px-4"
      style={{ colorScheme: "light" }}
    >
      <div className="w-full max-w-md">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 mb-8 text-neutral-950 w-fit mx-auto select-none"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-7 h-7"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" />
            <path
              fill="#ffffff"
              d="M61.35.227L6.017 4.313C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l13.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113l64.257-3.89c5.433-.387 6.99-2.917 6.99-7.193V18.64c0-2.21-.847-2.847-3.267-4.733L74.167 3.143C69.893.037 68.147-.357 61.35.227zM25.92 19.523c-5.247.353-6.437.433-9.417-1.99L8.927 11.507c-.77-.78-.383-1.753.967-1.947l53.8-3.887c4.467-.383 6.793 1.167 8.54 2.527l9.123 6.61c.39.197 1.36 1.36.193 1.36l-54.83 3.353zM19.973 88.943V30.883c0-2.53.777-3.697 3.103-3.893L86 23.163c2.14-.193 3.107 1.167 3.107 3.69v57.667c0 2.53-.97 4.277-3.883 4.473l-60.66 3.5c-2.917.193-4.59-.97-4.59-3.55zm59.3-54.253c.387 1.75 0 3.5-1.75 3.7l-2.91.577v42.773c-2.527 1.36-4.853 2.137-6.797 2.137-3.107 0-3.883-.97-6.21-3.887l-19.03-29.94v28.967l6.02 1.363s0 3.5-4.857 3.5l-13.39.777c-.39-.777 0-2.72 1.357-3.11l3.497-.97V40.667L29.48 40.1c-.39-1.75.58-4.277 3.3-4.473l14.367-.967 19.8 30.327v-26.83l-5.047-.58c-.39-2.143 1.163-3.7 3.103-3.89l13.27-.793z"
            />
          </svg>
          <span className="font-bold text-lg tracking-tight">NOTION</span>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm shadow-neutral-100 p-8">

          {/* Auto-slider */}
          <Slider />

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-neutral-950 tracking-tight">Create an account</h2>
            <p className="text-sm text-neutral-400 mt-0.5">
              Join your team's workspace in seconds.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4m0 4h.01" />
              </svg>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700">
                Full name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Alex Johnson"
                required
                autoComplete="name"
                className={inputCls}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className={inputCls}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                autoComplete="new-password"
                className={inputCls}
              />
              <p className="text-xs text-neutral-400 mt-1">Use 8 or more characters.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 text-sm font-semibold rounded-lg
                         bg-neutral-950 text-white hover:bg-neutral-700
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-neutral-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-neutral-800 hover:text-neutral-950 transition-colors duration-150"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;