import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getToken,
  addProject,
  updateProject,
  deleteProject,
} from "services/siteData";
import { useSiteData } from "context/SiteDataContext";
import Modal from "../components/Modal";
import {
  cardClass,
  inputClass,
  labelClass,
  btnPrimary,
  btnOutline,
} from "../components/ui";
import AdminPageHeader from "../components/AdminPageHeader";

const emptyForm = {
  title: "",
  projectLink: "",
  projectDesc: "",
  projectCategory: "",
  technologies: "",
};

const Projects = () => {
  const token = getToken();
  const { siteData, refresh } = useSiteData();

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [projStatus, setProjStatus] = useState(true);

  const resetForm = () => {
    setForm(emptyForm);
    setProjStatus(true);
  };

  const openEdit = (index: number) => {
    const project = siteData?.projects?.[index];
    if (!project) return;
    setEditIndex(index);
    setForm({
      title: project.title,
      projectLink: project.projectLink || "",
      projectDesc: project.projectDesc || "",
      projectCategory: (project.projectCategory || []).join(", "),
      technologies: (project.technologies || []).join(", "),
    });
    setProjStatus(project.projStatus);
    setShowEdit(true);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    setAdding(true);
    try {
      await addProject(token, {
        title: form.title,
        projectCategory: form.projectCategory
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        technologies: form.technologies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        projectDesc: form.projectDesc,
        projectLink: form.projectLink,
        projStatus,
      });

      await refresh();
      toast.success("Project added");
      setShowAdd(false);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add project");
    } finally {
      setAdding(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || editIndex === null) return;

    if (!form.title) {
      toast.error("Title is required");
      return;
    }

    setUpdating(true);
    try {
      await updateProject(token, editIndex, {
        title: form.title,
        projectCategory: form.projectCategory
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        technologies: form.technologies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        projectDesc: form.projectDesc,
        projectLink: form.projectLink,
        projStatus,
      });

      await refresh();
      toast.success("Project updated");
      setShowEdit(false);
      setEditIndex(null);
      resetForm();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update project");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (index: number) => {
    if (!token) return;
    if (!window.confirm("Delete this project? This cannot be undone.")) return;

    setDeletingIndex(index);
    try {
      await deleteProject(token, index);
      await refresh();
      toast.success("Project deleted");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete project");
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col mobile:flex-row flex-wrap items-start mobile:items-center justify-between gap-3">
        <AdminPageHeader
          title="Projects"
          description="Manage the projects shown on your portfolio."
        />
        <button onClick={() => setShowAdd(true)} className={`${btnPrimary} mobile:w-full`}>
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <section className={cardClass}>
        {siteData?.projects?.length ? (
          <div className="w-full overflow-x-auto -mx-6 px-6">
            <table className="w-full text-left text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-Secondary/20 text-GrayCustom">
                  <th className="py-3 pr-4 font-medium">Project</th>
                  <th className="py-3 pr-4 font-medium hidden tablet:table-cell">Category</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium hidden tablet:table-cell">Link</th>
                  <th className="py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-Secondary/10">
                {siteData.projects.map((p, i) => (
                  <tr key={p.title}>
                    <td className="py-3 pr-4">
                      <span className="font-medium text-Background truncate max-w-[220px] block">
                        {p.title}
                      </span>
                      <span className="text-xs text-GrayCustom truncate block tablet:hidden max-w-[220px]">
                        {p.projectCategory?.join(", ") || ""}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-GrayCustom max-w-[200px] truncate hidden tablet:table-cell">
                      {p.projectCategory?.join(", ") || "—"}
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full ${
                          p.projStatus
                            ? "bg-green-500/10 text-green-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {p.projStatus ? "Live" : "Unavailable"}
                      </span>
                    </td>
                    <td className="py-3 pr-4 hidden tablet:table-cell">
                      {p.projectLink ? (
                        <a
                          href={p.projectLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-Primary hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Visit
                        </a>
                      ) : (
                        <span className="text-GrayCustom">—</span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(i)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-Primary border border-Primary/30 hover:bg-Primary_Accents_2xs transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                          <span className="hidden tablet:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          disabled={deletingIndex === i}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-red-400 border border-red-400/30 hover:bg-red-500/10 disabled:opacity-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden mobile:inline">{deletingIndex === i ? "..." : "Delete"}</span>
                          <span className="mobile:hidden">{deletingIndex === i ? "Deleting..." : "Delete"}</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <FolderKanban className="w-10 h-10 text-GrayCustom/50" />
            <p className="text-sm text-GrayCustom">
              No projects yet. Add your first project to get started.
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className={`${btnOutline} mt-2`}
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>
        )}
      </section>

      {showAdd && (
        <Modal title="Add Project" onClose={() => setShowAdd(false)}>
          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className={labelClass}>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Project title"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Project Link</label>
                <input
                  type="text"
                  value={form.projectLink}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      projectLink: e.target.value,
                    }))
                  }
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Category (comma separated)</label>
                <input
                  type="text"
                  value={form.projectCategory}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      projectCategory: e.target.value,
                    }))
                  }
                  placeholder="Fullstack - MERN application"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      technologies: e.target.value,
                    }))
                  }
                  placeholder="React, Node Js, Mongo DB"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Description</label>
              <textarea
                value={form.projectDesc}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, projectDesc: e.target.value }))
                }
                rows={3}
                placeholder="Short project description"
                className={`${inputClass} resize-none`}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-Background">
              <input
                type="checkbox"
                checked={projStatus}
                onChange={(e) => setProjStatus(e.target.checked)}
                className="w-4 h-4 accent-Primary"
              />
              Project is live (visible with link)
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className={btnOutline}
              >
                Cancel
              </button>
              <button type="submit" disabled={adding} className={btnPrimary}>
                <Plus className="w-4 h-4" />
                {adding ? "Adding..." : "Add Project"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showEdit && editIndex !== null && (
        <Modal title="Edit Project" onClose={() => { setShowEdit(false); setEditIndex(null); resetForm(); }}>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className={labelClass}>Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Project title"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Project Link</label>
                <input
                  type="text"
                  value={form.projectLink}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      projectLink: e.target.value,
                    }))
                  }
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>Category (comma separated)</label>
                <input
                  type="text"
                  value={form.projectCategory}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      projectCategory: e.target.value,
                    }))
                  }
                  placeholder="Fullstack - MERN application"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col">
                <label className={labelClass}>
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={form.technologies}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      technologies: e.target.value,
                    }))
                  }
                  placeholder="React, Node Js, Mongo DB"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className={labelClass}>Description</label>
              <textarea
                value={form.projectDesc}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, projectDesc: e.target.value }))
                }
                rows={3}
                placeholder="Short project description"
                className={`${inputClass} resize-none`}
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-Background">
              <input
                type="checkbox"
                checked={projStatus}
                onChange={(e) => setProjStatus(e.target.checked)}
                className="w-4 h-4 accent-Primary"
              />
              Project is live (visible with link)
            </label>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setShowEdit(false); setEditIndex(null); resetForm(); }}
                className={btnOutline}
              >
                Cancel
              </button>
              <button type="submit" disabled={updating} className={btnPrimary}>
                <Pencil className="w-4 h-4" />
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Projects;
