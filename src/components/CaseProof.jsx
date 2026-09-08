import { projects } from '../data/projects.js';

export function CaseProof({ id }) {
  const project = projects.find(item => item.id === id);
  return <section className="case-proof" id="project-proof" aria-label="Project at a glance">
    <div><h2>The problem</h2><p>{project.context}</p></div>
    <div><h2>My contribution</h2><p>{project.ownership}</p></div>
    <div><h2>The outcome</h2><p>{project.result}</p></div>
  </section>;
}
