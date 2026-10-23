import Image from 'next/image';

const templates = [{
  id: 'classic',
  title: 'Classic one-page resume',
  description: 'A clear, single-column format with a profile, skills and languages, two education entries, three professional roles with three bullets each, and two activities with two bullets each.',
  preview: '/templates/classic-resume.png',
  pdf: '/templates/classic-resume.pdf',
  word: '/templates/classic-resume.docx',
}];

export function ResumeTemplates() {
  return <section className="templates-section" aria-labelledby="templates-heading">
    <p className="eyebrow">START WITH THE RIGHT STRUCTURE</p>
    <h1 id="templates-heading">Resume templates</h1>
    <p className="templates-intro">Preview the one-page layout, or download an editable Word document and make it yours.</p>
    <div className="template-gallery">
      {templates.map(template => <article className="template-card" key={template.id}>
        <a className="template-preview" href={template.pdf} target="_blank" rel="noopener noreferrer" aria-label={`Preview ${template.title} as PDF`}>
          <Image src={template.preview} alt="Blank one-page resume showing profile, two education entries, three professional roles and two extracurricular activities" width={990} height={1400} unoptimized />
        </a>
        <div className="template-info">
          <span className="status">1 page · A4 · Editable Word</span>
          <h2>{template.title}</h2>
          <p>{template.description}</p>
          <p className="template-guidance">Replace the bracketed prompts with your own facts. Keep the newest entries first. Remove unsupported entries rather than inventing content; check the page length after editing.</p>
          <a className="text-button" href={template.pdf} target="_blank" rel="noopener noreferrer">Preview PDF ↗</a>
          <div className="template-downloads">
            <a className="primary" href={template.word} download>Download Word (.docx)</a>
            <a className="secondary" href={template.pdf} download>Download PDF</a>
          </div>
          <p className="privacy">This is a one-page application layout. Your complete master resume can be longer so Tailor has more evidence to select from.</p>
        </div>
      </article>)}
    </div>
  </section>;
}
