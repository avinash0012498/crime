import React, { useState } from 'react';
import { LearningResource } from '../types';
import { BookOpen, Search, Download, ExternalLink, Lightbulb, FileText, CheckCircle2, Bookmark, Terminal, Shield } from 'lucide-react';
import { downloadNotesAsFile } from '../utils/storage';

interface LearningResourcesSectionProps {
  resources: LearningResource[];
}

export const LearningResourcesSection: React.FC<LearningResourcesSectionProps> = ({ resources }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Cybersecurity', 'Digital Forensics', 'AI & Machine Learning', 'Ethical Hacking', 'OSINT', 'Hackathon Strategy'];

  const filteredResources = resources.filter((res) => {
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleDownloadFullCheatsheet = () => {
    let md = '# CRIMEATHON – INVESTIGATION & INNOVATION HUB\n';
    md += '## Master Hackathon Preparation Study Guide & Reference Cheatsheet\n\n';
    md += 'Generated offline directly from Crimeathon Knowledge Base.\n\n';

    resources.forEach((res, i) => {
      md += `### ${i + 1}. ${res.title} (${res.category} · ${res.docType})\n`;
      md += `${res.description}\n\n`;
      md += `**Key Topics Covered:**\n`;
      res.keyTopics.forEach((t) => (md += `- ${t}\n`));
      md += `\n**Investigative Actionable Tip:**\n> ${res.actionableTip}\n\n`;
      md += `**Tags:** ${res.tags.join(', ')}\n\n---\n\n`;
    });

    downloadNotesAsFile(md, 'crimeathon_master_study_guide.md');
  };

  return (
    <div className="py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Curated Syllabi · Industry Standards & Toolkits</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Learning Resources & Technical Cheatsheets
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Official DFIR artifact manuals, MITRE ATT&CK catalogs, ISO/IEC 27037 standards, and hackathon presentation templates for collegiate teams.
          </p>
        </div>

        {/* Download Cheatsheet CTA */}
        <button
          onClick={handleDownloadFullCheatsheet}
          className="px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-2 shrink-0 shadow-lg shadow-emerald-500/10"
        >
          <Download className="w-4 h-4" />
          <span>Download Offline Cheatsheet (.md)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, cheat sheets, or frameworks..."
            className="w-full pl-9 pr-4 py-2 text-xs text-white bg-slate-900 border border-slate-800 rounded-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-mono scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="p-6 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-bold">{res.category}</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px]">
                  {res.docType}
                </span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {res.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                {res.description}
              </p>

              {/* Key Topics Covered */}
              <div className="space-y-1.5 pt-2 border-t border-slate-850">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                  Core Competencies & Artifacts:
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs text-slate-300">
                  {res.keyTopics.map((top, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                      <span>{top}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actionable Tip Box */}
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-xs text-emerald-200 space-y-1 mt-2">
              <div className="font-mono font-bold text-emerald-400 text-[11px] flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Hackathon Tip:</span>
              </div>
              <p className="leading-relaxed">{res.actionableTip}</p>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
