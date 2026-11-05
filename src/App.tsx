/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserIntakeForm } from './components/UserIntakeForm';
import { FileText, Sparkles, CheckCircle2, ShieldCheck, Terminal, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'spec'>('form');

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Global Minimalist Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono text-sm">
              UI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white">CRIMEATHON</span>
                <span className="text-slate-600">/</span>
                <span className="text-xs font-mono text-emerald-400">User Information Intake</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('form')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                activeTab === 'form'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Form
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('spec')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                activeTab === 'spec'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              UI Specification Doc
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'form' ? (
          <UserIntakeForm />
        ) : (
          <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur space-y-8">
              <div className="border-b border-slate-800 pb-5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>FORMAL SPECIFICATION · WCAG 2.1 AA COMPLIANT</span>
                </div>
                <h2 className="text-2xl font-bold text-white">UI Specification: User Information Intake System</h2>
                <p className="text-sm text-slate-400 mt-1">
                  Architecture, field taxonomy, layout hierarchy, and validation rules for gathering user information.
                </p>
              </div>

              {/* 4 Tiers Grid */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-emerald-300 flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-center font-mono">01</span>
                    Tier 1: Personal Identification & Contact
                  </h3>
                  <div className="overflow-x-auto border border-slate-800 rounded-lg">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-3">Field Name</th>
                          <th className="p-3">Input Type</th>
                          <th className="p-3">Validation Rule</th>
                          <th className="p-3">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr>
                          <td className="p-3 font-semibold text-white">Full Name</td>
                          <td className="p-3 font-mono text-slate-400">text</td>
                          <td className="p-3 text-rose-300">Required, min 2 chars</td>
                          <td className="p-3 text-slate-400">Primary participant display identity</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Email Address</td>
                          <td className="p-3 font-mono text-slate-400">email</td>
                          <td className="p-3 text-rose-300">Required, standard RFC format</td>
                          <td className="p-3 text-slate-400">Communication & account linkage</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Phone / SMS</td>
                          <td className="p-3 font-mono text-slate-400">tel</td>
                          <td className="p-3 text-slate-500">Optional</td>
                          <td className="p-3 text-slate-400">Urgent callback or notification</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Preferred Pronouns</td>
                          <td className="p-3 font-mono text-slate-400">select</td>
                          <td className="p-3 text-slate-500">Optional</td>
                          <td className="p-3 text-slate-400">Respectful correspondence</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-cyan-300 flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded bg-cyan-500/10 border border-cyan-500/20 text-xs flex items-center justify-center font-mono">02</span>
                    Tier 2: Role & Institutional Affiliation
                  </h3>
                  <div className="overflow-x-auto border border-slate-800 rounded-lg">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-3">Field Name</th>
                          <th className="p-3">Input Type</th>
                          <th className="p-3">Validation Rule</th>
                          <th className="p-3">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr>
                          <td className="p-3 font-semibold text-white">Primary Role</td>
                          <td className="p-3 font-mono text-slate-400">segmented-choice</td>
                          <td className="p-3 text-slate-400">6 preset options</td>
                          <td className="p-3 text-slate-400">Role-based routing & jury assessment</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Organization / University</td>
                          <td className="p-3 font-mono text-slate-400">text</td>
                          <td className="p-3 text-rose-300">Required</td>
                          <td className="p-3 text-slate-400">Institutional validation</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Domain Experience</td>
                          <td className="p-3 font-mono text-slate-400">radio pills</td>
                          <td className="p-3 text-slate-400">Novice / Intermediate / Advanced</td>
                          <td className="p-3 text-slate-400">Skill level categorization</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-blue-300 flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded bg-blue-500/10 border border-blue-500/20 text-xs flex items-center justify-center font-mono">03</span>
                    Tier 3: Inquiry & Problem Scope
                  </h3>
                  <div className="overflow-x-auto border border-slate-800 rounded-lg">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-3">Field Name</th>
                          <th className="p-3">Input Type</th>
                          <th className="p-3">Validation Rule</th>
                          <th className="p-3">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr>
                          <td className="p-3 font-semibold text-white">Investigation Track</td>
                          <td className="p-3 font-mono text-slate-400">select</td>
                          <td className="p-3 text-slate-400">6 challenge domains</td>
                          <td className="p-3 text-slate-400">Problem category assignment</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Submission Title</td>
                          <td className="p-3 font-mono text-slate-400">text</td>
                          <td className="p-3 text-rose-300">Required, min 5 chars</td>
                          <td className="p-3 text-slate-400">Scannable reference headline</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Detailed Description</td>
                          <td className="p-3 font-mono text-slate-400">textarea</td>
                          <td className="p-3 text-rose-300">Required, 20–1000 chars</td>
                          <td className="p-3 text-slate-400">Technical methodology & scope</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Urgency Priority</td>
                          <td className="p-3 font-mono text-slate-400">button group</td>
                          <td className="p-3 text-slate-400">Low, Standard, High, Critical</td>
                          <td className="p-3 text-slate-400">Triage prioritization</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-emerald-300 flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-center font-mono">04</span>
                    Tier 4: Artifacts, Custom Fields & Consent
                  </h3>
                  <div className="overflow-x-auto border border-slate-800 rounded-lg">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono">
                        <tr>
                          <th className="p-3">Field Name</th>
                          <th className="p-3">Input Type</th>
                          <th className="p-3">Validation Rule</th>
                          <th className="p-3">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr>
                          <td className="p-3 font-semibold text-white">Repository URL</td>
                          <td className="p-3 font-mono text-slate-400">url</td>
                          <td className="p-3 text-slate-500">Optional</td>
                          <td className="p-3 text-slate-400">External code repository verification</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Supporting Files</td>
                          <td className="p-3 font-mono text-slate-400">file-drop</td>
                          <td className="p-3 text-slate-500">Max 10MB (JSON, PCAP, PDF)</td>
                          <td className="p-3 text-slate-400">Sample evidence logs</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Dynamic Custom Fields</td>
                          <td className="p-3 font-mono text-slate-400">key-value list</td>
                          <td className="p-3 text-slate-500">Extensible</td>
                          <td className="p-3 text-slate-400">Ad-hoc metadata tags</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-white">Consent Acknowledgement</td>
                          <td className="p-3 font-mono text-slate-400">checkbox</td>
                          <td className="p-3 text-rose-300">Mandatory (true)</td>
                          <td className="p-3 text-slate-400">Ethical & data privacy compliance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('form')}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
                >
                  Test Interactive Intake Form &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
