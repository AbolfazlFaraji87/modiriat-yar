import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const technologies = project.technologies
    .split(",")
    .map((technology) => technology.trim())
    .filter(Boolean);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-900/5">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-100">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
            <span className="text-5xl font-black text-orange-400">
              {project.title.charAt(0)}
            </span>
          </div>
        )}

        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-slate-950/80 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
          {project.category}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-extrabold text-slate-900 transition group-hover:text-orange-600">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-500">
          {project.description}
        </p>

        {technologies.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-600"
              >
                {technology}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
