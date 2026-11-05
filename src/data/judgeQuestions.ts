import { JudgeQuestion } from '../types';

export const judgeQuestionsData: JudgeQuestion[] = [
  {
    id: 'jq-1',
    category: 'Problem & Value',
    question: 'What exact problem are you solving, and who is your primary user?',
    whyJudgesAsk: 'Judges want to see if you have identified a crisp, real-world pain point or if you are presenting a solution searching for a problem.',
    keyPoints: [
      'State the specific bottleneck (e.g., manual triage delays, unverified evidence, false positive overload).',
      'Name the concrete user persona (e.g., cyber forensic examiner, metropolitan police patrol coordinator, AML compliance officer).',
      'Quantify the cost of inaction (e.g., hours lost per case, financial fraud losses, judicial case dismissals).'
    ],
    sampleAnswer: 'We are solving the critical latency and false-positive bottleneck in real-time cyber financial fraud detection. Currently, by the time AML compliance analysts manually review suspicious transaction clusters, funds have traversed across 4 mule hops into unhosted crypto wallets. Our primary users are Tier-1 FinTech fraud analysts and law enforcement cyber cells. We reduce detection and intervention latency from 45 minutes to sub-100 milliseconds at the payment gateway level.',
    commonPitfalls: 'Giving a broad, generic answer like "We are solving crime using AI" without naming the specific user or quantifiable problem.'
  },
  {
    id: 'jq-2',
    category: 'Problem & Value',
    question: 'Why did you select this specific problem statement over other challenges?',
    whyJudgesAsk: 'Tests domain empathy, motivation, and whether your team understands why this issue is timely and impactful right now.',
    keyPoints: [
      'Highlight real-world market trends (e.g. explosive growth in UPI/instant payments, rise of diffusion deepfakes).',
      'Show alignment with law enforcement operational challenges.',
      'Demonstrate why existing legacy tools are currently failing to address this new attack vector.'
    ],
    sampleAnswer: 'We chose deepfake media forensics because generative video models have become democratized, enabling threat actors to execute real-time synthetic CEO wire scams and fabricate criminal evidence. Traditional forensic image tools rely on static metadata that is destroyed when media is compressed over WhatsApp or Telegram. There was an urgent, unmet gap for biological and frequency-domain detection that survives real-world network re-encoding.',
    commonPitfalls: 'Saying "Because it looked cool" or "Because we had a pre-trained model for it" rather than citing the urgency of the problem.'
  },
  {
    id: 'jq-3',
    category: 'Technical Architecture',
    question: 'How does your project work from end to end? Walk us through the technical workflow.',
    whyJudgesAsk: 'Verifies whether you built a coherent, functioning pipeline or just stitched together random libraries.',
    keyPoints: [
      'Ingestion: How data enters the system (RTSP feed, PCAP stream, API webhook, uploaded disk image).',
      'Processing: Feature extraction, normalization, and model inference.',
      'Output: Real-time analyst dashboard alert, forensic evidence report, or automated mitigation webhook.'
    ],
    sampleAnswer: 'Our system operates in three decoupled stages: First, Ingestion: A lightweight agent streams normalized event logs or video frames over WebSockets into a Redis buffer. Second, Processing: Our quantized YOLOv8 model runs on-premise inference, extracting spatial coordinates and calculating velocity vectors against defined polygonal geofences. Third, Actionable Output: When an anomaly crosses the 0.85 threshold, our backend dispatches an instant alert with bounding-box snapshots to the dispatch dashboard while logging cryptographic SHA-256 hashes of the video clip for courtroom chain-of-custody.',
    commonPitfalls: 'Diving straight into code details without first providing a bird’s-eye architectural summary.'
  },
  {
    id: 'jq-4',
    category: 'Technical Architecture',
    question: 'What makes your solution unique compared to existing commercial and open-source tools?',
    whyJudgesAsk: 'Checks competitive landscape awareness and whether you have a genuine innovation differentiator.',
    keyPoints: [
      'Cite existing tools (e.g., Autopsy, Splunk, Snort, Maltego) and identify what they lack.',
      'Highlight your unique technical novelty (e.g. multi-modal fusion, privacy-preserving vector search, air-gapped local LLM inference).',
      'Emphasize cost, accessibility, or latency advantages.'
    ],
    sampleAnswer: 'Existing tools like Maltego or Autopsy are powerful but operate in silos: Autopsy parses disk images after the fact, while Maltego maps OSINT separately. Our platform introduces unified cross-modal graph correlation: when an investigator imports a disk image, our engine automatically extracts network IOCs, queries passive DNS and certificate transparency streams, and plots the connected threat infrastructure on a single interactive canvas without manual tool hopping.',
    commonPitfalls: 'Claiming "No one else in the world does this" or disrespecting industry-standard established tools.'
  },
  {
    id: 'jq-5',
    category: 'Technical Architecture',
    question: 'Which technologies did you choose for your tech stack, and why did you select them?',
    whyJudgesAsk: 'Tests architectural maturity and whether you chose tools based on engineering requirements rather than random familiarity.',
    keyPoints: [
      'Frontend: React + Tailwind for high-density, responsive investigator HUD.',
      'Backend: Python / FastAPI or Node.js for high-throughput asynchronous request handling.',
      'Database / AI: Neo4j for graph relationships, PyTorch / ONNX for edge inference, Redis for velocity caching.'
    ],
    sampleAnswer: 'We selected FastAPI and Python for our core inference engine because of native PyTorch bindings and asynchronous ASGI concurrency. For data persistence, we deliberately paired PostgreSQL for ACID-compliant audit logs with Neo4j for transaction relationship traversal—because multi-hop laundering queries in SQL require 6 recursive JOINs, whereas Neo4j handles pointer-hopping in constant time. On the frontend, React and Tailwind deliver a responsive, low-latency analyst cockpit.',
    commonPitfalls: 'Listing technologies without justifying WHY they were chosen over alternatives.'
  },
  {
    id: 'jq-6',
    category: 'AI & Accuracy',
    question: 'How accurate is your AI model, and what benchmark metrics did you use to evaluate it?',
    whyJudgesAsk: 'Weeds out bluffers who claim "99.9% accuracy". Tests knowledge of precision, recall, and imbalanced datasets.',
    keyPoints: [
      'Acknowledge class imbalance: Explain why raw accuracy is deceptive.',
      'Quote Precision, Recall, and PR-AUC on a held-out test split.',
      'Disclose the specific dataset used (e.g., IEEE-CIS Fraud Dataset, FaceForensics++, Kaggle Cyber dataset).'
    ],
    sampleAnswer: 'Because fraud represents only 0.12% of transaction events in our IEEE-CIS benchmark dataset, raw accuracy is a meaningless vanity metric. Instead, we evaluated our LightGBM model on PR-AUC (Precision-Recall Area Under Curve), achieving a PR-AUC of 0.884 and an F1-Score of 0.86 at our operating threshold. Crucially, we tuned the classification threshold to maintain 92% Precision, ensuring investigators are not overwhelmed by thousands of false leads.',
    commonPitfalls: 'Saying "Our model is 100% accurate" or not knowing the difference between Precision and Recall.'
  },
  {
    id: 'jq-7',
    category: 'AI & Accuracy',
    question: 'How do you prevent and handle false positives in your detection pipeline?',
    whyJudgesAsk: 'In law enforcement and fraud operations, false positives cause severe alert fatigue and risk wrongful citizen harassment.',
    keyPoints: [
      'Two-stage cascade architecture: Fast lightweight screener + deep secondary validator.',
      'Human-in-the-Loop (HITL) review tier for intermediate confidence scores (e.g. 0.65 to 0.85).',
      'Explainable AI (SHAP / feature attribution) so human officers can see why the system flagged an alert.'
    ],
    sampleAnswer: 'We employ a two-tiered architecture. Anomalies scored between 0.60 and 0.84 are routed to a human-in-the-loop review queue with an interactive SHAP waterfall plot showing which features triggered the alert. Only scores above 0.85 with cross-corroborating behavioral signals trigger automated temporary gating. Furthermore, our system supports dynamic analyst whitelisting so recurring benign anomalies automatically recalibrate feature weights.',
    commonPitfalls: 'Claiming the system has zero false positives, or suggesting automated arrests/bans without human oversight.'
  },
  {
    id: 'jq-8',
    category: 'Security & Defense',
    question: 'How do you protect sensitive case files and citizen biometric data inside your platform?',
    whyJudgesAsk: 'Cybercrime tools are prime targets for adversaries. Judges want to see defense-in-depth and legal compliance.',
    keyPoints: [
      'Encryption at rest (AES-256) and in transit (TLS 1.3).',
      'Role-Based Access Control (RBAC) and least privilege.',
      'Cryptographic hash verification (SHA-256 / BLAKE3) for evidentiary chain of custody.',
      'Automatic data retention policies and privacy masking (e.g. face blurring of non-suspect bystanders).'
    ],
    sampleAnswer: 'We enforce defense-in-depth: All evidence files and vector embeddings are encrypted at rest using AES-256-GCM and stored in air-gapped partitions. We implement strict Role-Based Access Control (RBAC) where examiners only access cases explicitly assigned to their badge ID. Furthermore, for CCTV streams, our ingestion pipeline automatically applies real-time bounding-box Gaussian blurring to all non-flagged civilian faces to protect bystander privacy in compliance with data privacy mandates.',
    commonPitfalls: 'Treating security as an afterthought or claiming "We put it in a database so it is secure."'
  },
  {
    id: 'jq-9',
    category: 'Feasibility & Roadmaps',
    question: 'What are the current limitations of your project, and what failure modes have you identified?',
    whyJudgesAsk: 'Evaluates intellectual honesty, engineering self-awareness, and technical depth.',
    keyPoints: [
      'Identify concrete hardware or environmental boundaries (e.g., extreme low-light video, WhatsApp 360p compression, encrypted payload blindness).',
      'Demonstrate that you have tested your model to its breaking point.',
      'Explain your planned mitigations.'
    ],
    sampleAnswer: 'We identified two distinct limitations during stress testing: First, deepfake video detection accuracy degrades when video resolution drops below 480p with heavy compression artifacts (common in multi-forwarded messaging apps). Second, our CCTV anomaly model experiences tracking ID swaps during dense crowd occlusions lasting longer than 4 seconds. In our roadmap, we plan to integrate multi-frame super-resolution pre-processing and temporal graph trajectory smoothing to mitigate these edge cases.',
    commonPitfalls: 'Defensively claiming "There are no limitations" or getting flustered when an edge case is pointed out.'
  },
  {
    id: 'jq-10',
    category: 'Feasibility & Roadmaps',
    question: 'How can this project be deployed and integrated into a real-world police department or financial institution?',
    whyJudgesAsk: 'Separates academic toy projects from viable, deployable enterprise software.',
    keyPoints: [
      'Integration with existing standards (SIEM, Syslog, STIX/TAXII, REST APIs, RTSP cameras).',
      'Containerized deployment (Docker / Kubernetes) for air-gapped on-premise environments.',
      'Phased rollout strategy: Advisory/shadow mode first, full automation later.'
    ],
    sampleAnswer: 'We engineered the system for zero-friction integration with existing infrastructure. Rather than requiring police departments to replace their CCTV hardware, our edge service ingests standard RTSP camera streams over local ONVIF protocols. For financial institutions, we expose standard REST/gRPC endpoints compatible with ISO 20022 banking messages. We propose a 3-month phased deployment: Month 1 in passive shadow monitoring mode to establish baselines, Month 2 in human-assisted review, and Month 3 enabling automated real-time intervention.',
    commonPitfalls: 'Proposing an unrealistic overhaul that requires clients to throw away all existing enterprise software.'
  },
  {
    id: 'jq-11',
    category: 'Feasibility & Roadmaps',
    question: 'What is your future development roadmap beyond this hackathon?',
    whyJudgesAsk: 'Judges look for ambitious yet grounded visions that could turn into real startups or open-source initiatives.',
    keyPoints: [
      'Short-term (30–60 days): Field pilot with local university security or campus police.',
      'Medium-term (6 months): Edge hardware quantization (NVIDIA Jetson / Hailo-8) and multi-agency federated learning.',
      'Long-term (1 year): Formal ISO/IEC 27037 forensic certification and multi-jurisdictional compliance.'
    ],
    sampleAnswer: 'Our roadmap is focused on field deployment: In the next 60 days, we aim to pilot our CCTV loitering and unattended baggage module with our university campus safety department. In the medium term, we plan to quantize our models for direct deployment onto low-power edge accelerators like NVIDIA Jetson Orin Nano, cutting deployment costs by 70%. Long term, we will submit our evidentiary audit logging framework for formal ISO/IEC 27037 certification to ensure full courtroom admissibility.',
    commonPitfalls: 'Vague promises like "We will add blockchain and quantum computing" with no practical plan.'
  }
];

export const presentationPitchTips = [
  {
    title: 'The 30-Second Rule',
    desc: 'Grab the judges immediately. Start with a real, visceral incident or statistic rather than introducing your names. Hook them with the pain point before introducing your solution.'
  },
  {
    title: 'Show, Don’t Tell',
    desc: 'Spend at least 40% of your presentation time on a live, interactive product demo. Judges remember intuitive working UI and real data flows far better than slides full of bullet points.'
  },
  {
    title: 'Own Your Metrics',
    desc: 'Never claim 100% accuracy. Judges respect teams that articulate their Precision, Recall, and specific failure modes with technical humility and explainable mitigation strategies.'
  },
  {
    title: 'Have an Offline Backup',
    desc: 'Hackathon Wi-Fi always gets congested during final demos. Keep a local offline version running and have a 60-second screen-recording backup video ready in your slide deck.'
  },
  {
    title: 'Dress the Part & Divide Roles',
    desc: 'Assign clear roles: 1 presenter on problem and impact, 1 engineer driving the live demo, and 1 specialist handling deep technical/AI questions during Q&A.'
  }
];

export const judgingRubricCriteria = [
  {
    criterion: 'Innovation & Originality',
    weight: '25%',
    description: 'How unique is the technical approach compared to existing market solutions? Does it tackle the problem from an inventive angle?'
  },
  {
    criterion: 'Technical Execution & Depth',
    weight: '30%',
    description: 'Is the code working end-to-end? How solid is the architecture, data pipeline, model selection, and error handling?'
  },
  {
    criterion: 'Practical Impact & Feasibility',
    weight: '25%',
    description: 'Can this actually be implemented by law enforcement or enterprises? Does it solve a genuine real-world bottleneck?'
  },
  {
    criterion: 'Presentation & Q&A Defense',
    weight: '20%',
    description: 'Clarity of the pitch, mastery of the problem domain, honesty about limitations, and composure during judge cross-examination.'
  }
];
