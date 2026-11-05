import React, { useState, useEffect, useId } from 'react';
import {
  User,
  Mail,
  Phone,
  Building,
  Briefcase,
  FileText,
  AlertCircle,
  CheckCircle2,
  Download,
  Copy,
  RotateCcw,
  Plus,
  Trash2,
  UploadCloud,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Check,
  Code2,
  FileCheck
} from 'lucide-react';

export interface UserInfoData {
  // Step 1: Personal Identification
  fullName: string;
  email: string;
  phone: string;
  pronouns: string;

  // Step 2: Role & Affiliation
  role: string;
  organization: string;
  department: string;
  experienceLevel: 'Novice' | 'Intermediate' | 'Advanced';

  // Step 3: Inquiry & Submission Details
  track: string;
  title: string;
  description: string;
  priority: 'Low' | 'Standard' | 'High' | 'Critical';
  collaborationModes: string[];

  // Step 4: Supporting Artifacts & Consent
  externalUrl: string;
  customFields: { id: string; key: string; value: string }[];
  acceptedTerms: boolean;
  attachedFileName?: string;
  attachedFileSize?: string;
}

const INITIAL_DATA: UserInfoData = {
  fullName: '',
  email: '',
  phone: '',
  pronouns: 'They/Them',
  role: 'Student',
  organization: '',
  department: '',
  experienceLevel: 'Intermediate',
  track: 'Digital Forensics',
  title: '',
  description: '',
  priority: 'Standard',
  collaborationModes: ['Async Email', 'Discord/Slack'],
  externalUrl: '',
  customFields: [],
  acceptedTerms: false,
};

const DEMO_PRESETS: { label: string; data: Partial<UserInfoData> }[] = [
  {
    label: 'Student Investigator',
    data: {
      fullName: 'Alex Vance',
      email: 'alex.vance@university.edu',
      phone: '+1 (555) 382-9912',
      pronouns: 'He/Him',
      role: 'Student',
      organization: 'Cyber Technology Institute',
      department: 'Computer Science & Forensics',
      experienceLevel: 'Intermediate',
      track: 'Digital Forensics',
      title: 'Automated Volatile Memory Triage via Volatility 3',
      description: 'Developing a containerized pipeline to extract process memory trees, detect unmapped executable pages (malfind), and extract suspicious network sockets automatically upon memory dump acquisition.',
      priority: 'High',
      collaborationModes: ['Discord/Slack', 'Live Video Session'],
      externalUrl: 'https://github.com/alexvance/mem-forensics-triage',
      customFields: [
        { id: '1', key: 'Team Name', value: 'ByteForensics Squad' },
        { id: '2', key: 'Target OS', value: 'Linux & Windows Server 2022' }
      ],
      acceptedTerms: true,
      attachedFileName: 'sample_mem_artifact.json',
      attachedFileSize: '42.8 KB'
    }
  },
  {
    label: 'Cyber Defense Analyst',
    data: {
      fullName: 'Elena Rostova',
      email: 'e.rostova@cyberdefense.org',
      phone: '+44 20 7946 0192',
      pronouns: 'She/Her',
      role: 'Cyber Researcher',
      organization: 'Global Threat Research Lab',
      department: 'Adversary Intelligence Unit',
      experienceLevel: 'Advanced',
      track: 'Network Defense',
      title: 'Real-Time C2 Beaconing Detection in Encrypted TLS Flows',
      description: 'Extracting client hello JA3 fingerprint sequences and packet inter-arrival jitter distributions to classify cobalt strike beaconing patterns without SSL interception.',
      priority: 'Critical',
      collaborationModes: ['Async Email', 'Live Video Session'],
      externalUrl: 'https://github.com/threat-lab/ja3-c2-beacon-analyzer',
      customFields: [
        { id: '1', key: 'Clearance', value: 'Tier 3 Incident Responder' },
        { id: '2', key: 'Framework', value: 'Zeek + Suricata + ELK' }
      ],
      acceptedTerms: true,
      attachedFileName: 'c2_beacon_trace.pcap',
      attachedFileSize: '2.4 MB'
    }
  }
];

export const UserIntakeForm: React.FC = () => {
  const [formData, setFormData] = useState<UserInfoData>(() => {
    try {
      const saved = localStorage.getItem('crimeathon_user_intake_data');
      return saved ? JSON.parse(saved) : INITIAL_DATA;
    } catch {
      return INITIAL_DATA;
    }
  });

  const [activeStep, setActiveStep] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'wizard' | 'single'>('wizard');
  const [showJsonPreview, setShowJsonPreview] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceId: string;
    timestamp: string;
    data: UserInfoData;
  } | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  // Auto-save form draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('crimeathon_user_intake_data', JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const updateField = <K extends keyof UserInfoData>(field: K, value: UserInfoData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleCollaborationToggle = (mode: string) => {
    const current = formData.collaborationModes;
    if (current.includes(mode)) {
      updateField('collaborationModes', current.filter((m) => m !== mode));
    } else {
      updateField('collaborationModes', [...current, mode]);
    }
  };

  const addCustomField = () => {
    const newField = { id: Date.now().toString(), key: '', value: '' };
    updateField('customFields', [...formData.customFields, newField]);
  };

  const updateCustomField = (id: string, key: string, value: string) => {
    const updated = formData.customFields.map((f) => (f.id === id ? { ...f, key, value } : f));
    updateField('customFields', updated);
  };

  const removeCustomField = (id: string) => {
    const updated = formData.customFields.filter((f) => f.id !== id);
    updateField('customFields', updated);
  };

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1 || viewMode === 'single') {
      if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
        newErrors.fullName = 'Full name must be at least 2 characters.';
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = 'Please provide a valid email address.';
      }
    }

    if (stepNumber === 2 || viewMode === 'single') {
      if (!formData.organization.trim()) {
        newErrors.organization = 'Organization / Institution name is required.';
      }
    }

    if (stepNumber === 3 || viewMode === 'single') {
      if (!formData.title.trim() || formData.title.trim().length < 5) {
        newErrors.title = 'Title must be at least 5 characters.';
      }
      if (!formData.description.trim() || formData.description.trim().length < 20) {
        newErrors.description = 'Please provide a detailed description (minimum 20 characters).';
      }
    }

    if (stepNumber === 4 || viewMode === 'single') {
      if (!formData.acceptedTerms) {
        newErrors.acceptedTerms = 'You must review and accept the data verification terms.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(viewMode === 'wizard' ? 4 : 1)) {
      return;
    }

    const referenceId = `CRIME-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const receipt = {
      referenceId,
      timestamp: new Date().toISOString(),
      data: { ...formData },
    };

    setSubmissionReceipt(receipt);
  };

  const handleReset = () => {
    if (window.confirm('Reset this form and clear all inputs?')) {
      setFormData(INITIAL_DATA);
      setErrors({});
      setActiveStep(1);
      setSubmissionReceipt(null);
      try {
        localStorage.removeItem('crimeathon_user_intake_data');
      } catch {
        // ignore
      }
    }
  };

  const applyPreset = (preset: Partial<UserInfoData>) => {
    setFormData((prev) => ({ ...prev, ...preset }));
    setErrors({});
  };

  const handleCopyReceipt = () => {
    if (!submissionReceipt) return;
    navigator.clipboard.writeText(JSON.stringify(submissionReceipt, null, 2));
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  const handleDownloadReceipt = () => {
    if (!submissionReceipt) return;
    const blob = new Blob([JSON.stringify(submissionReceipt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${submissionReceipt.referenceId}-submission.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Simulated file drop
  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField('attachedFileName', file.name);
      const sizeKb = Math.round(file.size / 1024);
      updateField('attachedFileSize', sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`);
    }
  };

  // Steps configuration
  const steps = [
    { number: 1, title: 'Identity', subtitle: 'Personal Details' },
    { number: 2, title: 'Affiliation', subtitle: 'Role & Institution' },
    { number: 3, title: 'Submission', subtitle: 'Project & Inquiry' },
    { number: 4, title: 'Verification', subtitle: 'Artifacts & Consent' },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Banner & Control Strip */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">
                UI Specification · User Intake System
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Participant Information & Project Intake
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Streamlined, accessible interface to capture participant details, problem statements, and technical context.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('wizard')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  viewMode === 'wizard' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Wizard Mode
              </button>
              <button
                type="button"
                onClick={() => setViewMode('single')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  viewMode === 'single' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                All-in-One Form
              </button>
            </div>

            {/* Quick Presets Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 hidden sm:inline">Presets:</span>
              {DEMO_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(p.data)}
                  className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-xs text-slate-300 hover:text-white transition-colors"
                >
                  {p.label}
                </button>
              ))}
              <button
                type="button"
                onClick={handleReset}
                title="Reset form"
                className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Wizard Step Progression Bar */}
        {viewMode === 'wizard' && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {steps.map((s) => {
              const isCurrent = activeStep === s.number;
              const isDone = activeStep > s.number;
              return (
                <button
                  key={s.number}
                  type="button"
                  onClick={() => {
                    if (isDone || validateStep(activeStep)) {
                      setActiveStep(s.number);
                    }
                  }}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    isCurrent
                      ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : isDone
                      ? 'bg-slate-900/60 border-slate-700/60 text-slate-300'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">0{s.number}</span>
                    {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className={`text-sm font-semibold mt-1 ${isCurrent ? 'text-emerald-300' : 'text-slate-200'}`}>
                    {s.title}
                  </div>
                  <div className="text-xs text-slate-400 truncate">{s.subtitle}</div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Grid: Form Inputs + Live Preview Panel */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Area (7 cols on desktop) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: Personal Identification & Contact */}
            {(viewMode === 'single' || activeStep === 1) && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 sm:p-6 backdrop-blur">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Tier 1: Personal Identification & Contact</h2>
                    <p className="text-xs text-slate-400">Primary participant identity and communication channels.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.fullName
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-rose-400 mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="investigator@agency.org"
                          value={formData.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                            errors.email
                              ? 'border-rose-500 focus:border-rose-500'
                              : 'border-slate-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Phone / Urgent Contact <span className="text-slate-500 text-[11px]">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Preferred Pronouns */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Preferred Pronouns
                    </label>
                    <select
                      value={formData.pronouns}
                      onChange={(e) => updateField('pronouns', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
                    >
                      <option value="They/Them">They/Them</option>
                      <option value="She/Her">She/Her</option>
                      <option value="He/Him">He/Him</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Role & Institutional Affiliation */}
            {(viewMode === 'single' || activeStep === 2) && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 sm:p-6 backdrop-blur">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Tier 2: Role & Institutional Context</h2>
                    <p className="text-xs text-slate-400">Affiliation, domain background, and experience grade.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Primary Role Selector */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Primary Role / Designation
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Student', 'Forensic Analyst', 'Cyber Researcher', 'Software Engineer', 'Mentor', 'Other'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateField('role', r)}
                          className={`px-3 py-2 text-xs rounded-lg border text-left transition-all ${
                            formData.role === r
                              ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-200 font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Organization & Department Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Organization / University <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. National Cyber Academy"
                        value={formData.organization}
                        onChange={(e) => updateField('organization', e.target.value)}
                        className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.organization
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-800 focus:border-cyan-500'
                        }`}
                      />
                      {errors.organization && <p className="text-xs text-rose-400 mt-1">{errors.organization}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Department / Specialization
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Information Assurance"
                        value={formData.department}
                        onChange={(e) => updateField('department', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Domain Experience Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['Novice', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => updateField('experienceLevel', lvl)}
                          className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors ${
                            formData.experienceLevel === lvl
                              ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-200'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Inquiry & Problem Scope */}
            {(viewMode === 'single' || activeStep === 3) && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 sm:p-6 backdrop-blur">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Tier 3: Inquiry & Problem Scope</h2>
                    <p className="text-xs text-slate-400">Project track, detailed problem statement, and urgency triage.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Track Category & Priority */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Investigation Track / Subject
                      </label>
                      <select
                        value={formData.track}
                        onChange={(e) => updateField('track', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="Digital Forensics">Digital Forensics & Artifact Carving</option>
                        <option value="Network Defense">Network Intrusion & C2 Detection</option>
                        <option value="AI Crime Detection">AI-Based Anomaly & Crime Detection</option>
                        <option value="Financial Fraud">Financial Cybercrime & Money Laundering</option>
                        <option value="OSINT Investigation">OSINT & Threat Actor Intelligence</option>
                        <option value="General Submission">General Hackathon Submission</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Urgency / Triage Priority
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(['Low', 'Standard', 'High', 'Critical'] as const).map((p) => {
                          const active = formData.priority === p;
                          const color =
                            p === 'Critical'
                              ? 'border-rose-500/60 bg-rose-500/20 text-rose-300'
                              : p === 'High'
                              ? 'border-amber-500/60 bg-amber-500/20 text-amber-300'
                              : 'border-blue-500/60 bg-blue-500/20 text-blue-300';
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => updateField('priority', p)}
                              className={`py-2 text-[11px] rounded-lg border font-medium text-center transition-colors ${
                                active ? color : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {p}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Submission Title */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Submission Title / Case Headline <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Memory Anomaly Detection via Graph Convolutional Networks"
                      value={formData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.title
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
                  </div>

                  {/* Detailed Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-slate-300">
                        Detailed Description & Methodology <span className="text-rose-400">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        {formData.description.length} / 1000 chars
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      maxLength={1000}
                      placeholder="Explain your problem statement, hypotheses, data sources, toolchain, and intended deliverables..."
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.description
                          ? 'border-rose-500 focus:border-rose-500'
                          : 'border-slate-800 focus:border-blue-500'
                      }`}
                    />
                    {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description}</p>}
                  </div>

                  {/* Preferred Collaboration Modes */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-2">
                      Preferred Mode of Collaboration
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Async Email', 'Discord/Slack', 'Live Video Session', 'In-Person Review'].map((mode) => {
                        const checked = formData.collaborationModes.includes(mode);
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => handleCollaborationToggle(mode)}
                            className={`px-3 py-2 text-xs rounded-lg border text-center transition-all ${
                              checked
                                ? 'bg-blue-500/20 border-blue-500/60 text-blue-200 font-medium'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {mode}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Supporting Artifacts, Custom Fields & Consent */}
            {(viewMode === 'single' || activeStep === 4) && (
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 sm:p-6 backdrop-blur">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800/80 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">Tier 4: Artifacts, Custom Fields & Consent</h2>
                    <p className="text-xs text-slate-400">Attach supporting files, specify custom metadata, and acknowledge terms.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* External Repo / Drive URL */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      External Repository / Code URL <span className="text-slate-500 text-[11px]">(Optional)</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/organization/repo"
                      value={formData.externalUrl}
                      onChange={(e) => updateField('externalUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  {/* Simulated File Upload Area */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Supporting Evidence / Specifications File
                    </label>
                    <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950/60 rounded-xl p-4 text-center relative transition-colors">
                      <input
                        type="file"
                        onChange={handleSimulatedFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <UploadCloud className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                      {formData.attachedFileName ? (
                        <div className="text-xs text-emerald-300 font-mono">
                          Attached: <span className="font-bold">{formData.attachedFileName}</span> ({formData.attachedFileSize})
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-slate-300 font-medium">Click to upload or drag and drop</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">JSON, PCAP, PDF, or TXT (Max 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Custom Metadata Fields Builder */}
                  <div className="border-t border-slate-800/80 pt-4">
                    <div className="flex items-center justify-between mb-2.5">
                      <div>
                        <span className="text-xs font-medium text-slate-300">Custom Metadata Fields</span>
                        <p className="text-[11px] text-slate-500">Add dynamic key-value parameters to this submission.</p>
                      </div>
                      <button
                        type="button"
                        onClick={addCustomField}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-200 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Field</span>
                      </button>
                    </div>

                    {formData.customFields.length > 0 && (
                      <div className="space-y-2 mt-3">
                        {formData.customFields.map((field) => (
                          <div key={field.id} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Key (e.g. Target OS)"
                              value={field.key}
                              onChange={(e) => updateCustomField(field.id, e.target.value, field.value)}
                              className="w-1/3 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                            />
                            <input
                              type="text"
                              placeholder="Value (e.g. Linux Kernel 6.2)"
                              value={field.value}
                              onChange={(e) => updateCustomField(field.id, field.key, e.target.value)}
                              className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => removeCustomField(field.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Consent & Verification Checkbox */}
                  <div className="border-t border-slate-800/80 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.acceptedTerms}
                        onChange={(e) => updateField('acceptedTerms', e.target.checked)}
                        className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/20"
                      />
                      <span className="text-xs text-slate-300 leading-relaxed">
                        I certify that the information provided is accurate and complies with the ethical guidelines, data privacy standards, and hackathon rules. <span className="text-rose-400">*</span>
                      </span>
                    </label>
                    {errors.acceptedTerms && <p className="text-xs text-rose-400 mt-1">{errors.acceptedTerms}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation / Submit Controls */}
            <div className="flex items-center justify-between pt-2">
              {viewMode === 'wizard' ? (
                <>
                  <button
                    type="button"
                    disabled={activeStep === 1}
                    onClick={handlePrevStep}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      activeStep === 1
                        ? 'opacity-30 border-slate-800 text-slate-600 cursor-not-allowed'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  {activeStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Submit Information
                    </button>
                  )}
                </>
              ) : (
                <div className="w-full flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Complete & Submit Form
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Area: Live Real-Time Card & Payload Inspector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card Header with Inspector Toggle */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 sticky top-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  Live Preview & Payload
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowJsonPreview(!showJsonPreview)}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-cyan-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 transition-colors"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{showJsonPreview ? 'Card View' : 'JSON Schema'}</span>
              </button>
            </div>

            {showJsonPreview ? (
              /* Raw JSON Payload Inspector */
              <div className="relative">
                <div className="text-[11px] font-mono text-slate-500 mb-1.5 flex justify-between">
                  <span>POST /api/intake/submit</span>
                  <span>application/json</span>
                </div>
                <pre className="bg-[#05070a] border border-slate-800/80 rounded-lg p-3 text-[11px] font-mono text-emerald-400/90 overflow-x-auto max-h-[480px]">
                  {JSON.stringify(formData, null, 2)}
                </pre>
              </div>
            ) : (
              /* Live Card Preview */
              <div className="space-y-4">
                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {formData.fullName || 'Anonymous Participant'}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formData.role} · {formData.organization || 'No Organization Specified'}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {formData.experienceLevel}
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-slate-400 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{formData.email || 'no-email-specified'}</span>
                    </div>
                    {formData.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500" />
                        <span>{formData.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Case / Submission Summary */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Track:</span>
                    <span className="text-slate-300 font-medium">{formData.track}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Priority:</span>
                    <span
                      className={`font-semibold ${
                        formData.priority === 'Critical'
                          ? 'text-rose-400'
                          : formData.priority === 'High'
                          ? 'text-amber-400'
                          : 'text-blue-400'
                      }`}
                    >
                      {formData.priority}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-900">
                    <div className="text-xs font-semibold text-slate-200 truncate">
                      {formData.title || 'Untitled Submission'}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-3 mt-1 leading-relaxed">
                      {formData.description || 'No methodology description entered yet.'}
                    </p>
                  </div>

                  {formData.collaborationModes.length > 0 && (
                    <div className="pt-2 border-t border-slate-900">
                      <div className="text-[11px] text-slate-500 mb-1">Collaboration:</div>
                      <div className="flex flex-wrap gap-1">
                        {formData.collaborationModes.map((m) => (
                          <span
                            key={m}
                            className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.attachedFileName && (
                    <div className="pt-2 border-t border-slate-900 text-xs text-emerald-400 flex items-center gap-1.5 font-mono">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span className="truncate">{formData.attachedFileName}</span>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 text-center font-mono">
                  Real-time client synchronization active · ISO-8601 compliant
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission Success Modal Dialog */}
      {submissionReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0b0f17] border border-emerald-500/30 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">Intake Information Received</h3>
            <p className="text-xs text-slate-400 mt-1">
              Your profile and project specifications have been validated and saved to the registry.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 my-5 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Reference ID:</span>
                <span className="text-emerald-400 font-bold">{submissionReceipt.referenceId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Timestamp:</span>
                <span className="text-slate-300">{submissionReceipt.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Participant:</span>
                <span className="text-slate-300">{submissionReceipt.data.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Track:</span>
                <span className="text-slate-300">{submissionReceipt.data.track}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download JSON Receipt
              </button>
              <button
                type="button"
                onClick={handleCopyReceipt}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copiedStatus ? 'Copied!' : 'Copy Summary'}
              </button>
              <button
                type="button"
                onClick={() => setSubmissionReceipt(null)}
                className="w-full mt-1 px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors text-center"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
