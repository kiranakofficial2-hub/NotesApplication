import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X, FileText } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

function Edit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/notes/${id}`);

        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setSaving(true);

      await api.put(`/notes/${id}`, {
        title,
        content,
      });

      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
        <p className="mt-4 text-gray-500">Loading note...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-3xl px-6 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
            <FileText size={28} />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-800">
            Edit Note
          </h1>

          <p className="mt-2 text-lg text-gray-500">
            Update your note and save your changes
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-white/70 bg-white p-7 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Title
              </label>

              <input
                type="text"
                placeholder="Enter your note title"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={saving}
              />
            </div>

            {/* Content */}
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Content
              </label>

              <textarea
                placeholder="Write your note here..."
                className="h-52 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={saving}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-200"
                disabled={saving}
              >
                <X size={18} />
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                disabled={saving}
              >
                <Save size={18} />
                {saving ? "Updating..." : "Update Note"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;