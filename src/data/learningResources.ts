import { LearningResource } from '../types';

export const learningResourcesData: LearningResource[] = [
  {
    id: 'res-1',
    category: 'Cybersecurity',
    title: 'MITRE ATT&CK Framework Enterprise Knowledge Base',
    description: 'The globally-accessible knowledge base of adversary tactics and techniques based on real-world cyber observations.',
    docType: 'Framework',
    tags: ['Adversary TTPs', 'Threat Intelligence', 'MITRE'],
    keyTopics: ['Reconnaissance (TA0043)', 'Initial Access (TA0001)', 'Privilege Escalation (TA0004)', 'Defense Evasion (TA0005)', 'Command & Control (TA0011)'],
    actionableTip: 'Map every detection rule in your hackathon project directly to a specific ATT&CK Technique ID (e.g., T1059 for PowerShell execution) to impress technical judges.'
  },
  {
    id: 'res-2',
    category: 'Cybersecurity',
    title: 'NIST Cybersecurity Framework (CSF 2.0)',
    description: 'The premier national standard providing guidelines and best practices to manage and reduce cybersecurity risks across organizations.',
    docType: 'Standard',
    tags: ['NIST', 'Risk Management', 'Governance'],
    keyTopics: ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
    actionableTip: 'Frame your project pitch around the "Detect" and "Respond" pillars of NIST CSF to demonstrate institutional compliance awareness.'
  },
  {
    id: 'res-3',
    category: 'Digital Forensics',
    title: 'ISO/IEC 27037: Digital Evidence Handling Standard',
    description: 'International forensic guidelines for the identification, collection, acquisition, and preservation of digital evidence in court.',
    docType: 'Standard',
    tags: ['Chain of Custody', 'ISO 27037', 'Legal Admissibility'],
    keyTopics: ['Order of Volatility', 'Cryptographic Hash Verification', 'Tamper-Evident Packaging', 'Examiner Contemporaneous Notes'],
    actionableTip: 'Always calculate and display dual cryptographic hashes (SHA-256 + BLAKE3) in your UI to prove strict evidence preservation compliance.'
  },
  {
    id: 'res-4',
    category: 'Digital Forensics',
    title: 'SANS Digital Forensics & Incident Response (DFIR) Poster Cheatsheet',
    description: 'Comprehensive forensic quick-reference covering Windows artifact analysis, memory extraction, and timeline reconstruction.',
    docType: 'Cheatsheet',
    tags: ['Windows Artifacts', 'Prefetch', 'Shimcache', 'Amcache', 'MFT'],
    keyTopics: ['Windows Prefetch (.pf) analysis', 'NTFS $MFT & $LogFile parsing', 'SRUM resource usage monitoring', 'Shellbags and LNK shortcuts'],
    actionableTip: 'When parsing user activity, look at Windows Prefetch and UserAssist registry hives to prove the suspect actually ran an executable.'
  },
  {
    id: 'res-5',
    category: 'AI & Machine Learning',
    title: 'Fairness, Accountability, and Transparency in Crime AI (FAT-ML)',
    description: 'Ethical frameworks and mathematical metrics for detecting and mitigating algorithmic bias in criminal justice prediction systems.',
    docType: 'Guide',
    tags: ['AI Ethics', 'Disparate Impact', 'Bias Mitigation', 'SHAP'],
    keyTopics: ['Demographic Parity', 'Equalized Odds', 'Feedback Loop Prevention', 'Explainable AI via SHAP and LIME'],
    actionableTip: 'Include a dedicated "Fairness & Bias Audit" tab in your AI crime prediction dashboard showing equal false positive rates across demographic areas.'
  },
  {
    id: 'res-6',
    category: 'AI & Machine Learning',
    title: 'Computer Vision & Deepfake Forensics Guide (FaceForensics++)',
    description: 'Benchmark methodologies for detecting manipulated faces, neural compression artifacts, and spatial-frequency synthetic anomalies.',
    docType: 'Guide',
    tags: ['Deepfakes', 'FFT Analysis', 'Media Forensics', 'rPPG'],
    keyTopics: ['2D Fast Fourier Transform (FFT) grid artifacts', 'Biological rPPG pulse extraction', 'Blink frequency metrics', 'Adversarial robustness'],
    actionableTip: 'Combine frequency-domain analysis (detecting GAN/diffusion upsampling grids) with biological signals (heart rate pulse) for bulletproof deepfake defense.'
  },
  {
    id: 'res-7',
    category: 'Ethical Hacking',
    title: 'OWASP Top 10 Web Application Security Vulnerabilities',
    description: 'The standard awareness document representing a broad consensus on the most critical security risks to web applications.',
    docType: 'Standard',
    tags: ['OWASP', 'WebSec', 'SQLi', 'SSRF', 'XSS'],
    keyTopics: ['Broken Access Control (A01)', 'Cryptographic Failures (A02)', 'Injection (A03)', 'Security Misconfiguration (A05)'],
    actionableTip: 'Demonstrate how your application defends against OWASP A01 (Broken Object Level Authorization / IDOR) when multi-agency users view sensitive case records.'
  },
  {
    id: 'res-8',
    category: 'OSINT',
    title: 'Bellingcat Online Investigation Toolkit & Methodology',
    description: 'Field-tested methodologies from world-renowned investigative journalists and digital sleuths for verifying open-source imagery and geolocation.',
    docType: 'Tooling',
    tags: ['OSINT', 'Geolocation', 'Satellite Verification', 'Bellingcat'],
    keyTopics: ['SunCalc shadow angle verification', 'Reverse image search engines', 'Public satellite imagery analysis', 'Flight and maritime tracking'],
    actionableTip: 'In OSINT cases, corroborate findings across at least three independent sources (e.g. satellite imagery + social post + weather records) before drawing conclusions.'
  },
  {
    id: 'res-9',
    category: 'Hackathon Strategy',
    title: 'The 24-Hour Crimeathon MVP Architecture Blueprint',
    description: 'Practical guide to structuring, prototyping, and executing a winning crime investigation tech project in under 24 hours.',
    docType: 'Guide',
    tags: ['Hackathon Architecture', 'MVP Roadmap', 'Rapid Prototyping'],
    keyTopics: ['Hour 0-4: Scope lockdown and schema design', 'Hour 5-16: Core pipeline and inference loop', 'Hour 17-20: Responsive UI cockpit', 'Hour 21-24: Rehearsal and slide deck'],
    actionableTip: 'Build the simplest end-to-end slice first (input -> processing -> output). Never spend the first 12 hours perfecting a login screen.'
  },
  {
    id: 'res-10',
    category: 'Hackathon Strategy',
    title: 'The 10-Slide Winning Hackathon Pitch Structure',
    description: 'The proven slide deck framework favored by engineering leaders, VC evaluators, and hackathon judges worldwide.',
    docType: 'Guide',
    tags: ['Pitch Deck', 'Presentation', 'Storytelling'],
    keyTopics: ['Slide 1: Visceral Problem Hook', 'Slide 2: Target User Persona', 'Slide 3: Proposed Solution', 'Slide 4-5: System Architecture & Live Demo', 'Slide 6: Tech Stack & Benchmarks', 'Slide 7: Limitations & Roadmaps'],
    actionableTip: 'Keep slides visual and minimal. The judges should be looking at you and your working product demo, not reading dense paragraphs off the projector.'
  }
];
