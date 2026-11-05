import { ProblemStatement } from '../types';

export const problemStatements: ProblemStatement[] = [
  {
    id: 'prob-1',
    number: 1,
    title: 'AI-Based Crime Prediction and Detection',
    shortSummary: 'Spatiotemporal crime pattern forecasting using historical incident records and environmental risk indicators.',
    difficulty: 'Advanced',
    domain: 'Predictive Analytics & Spatial AI',
    description: 'Design and prototype an intelligent system that analyzes historical crime incident feeds, geospatial telemetry, local demographic density, and temporal weather indicators to forecast geographic hotspot clusters and assist law enforcement in proactive patrol allocation without introducing demographic bias.',
    realWorldScenario: 'Metropolitan police departments receive thousands of emergency dispatch calls daily. Traditional reactive policing responds after incidents transpire. During festival seasons or major urban events, street crimes and vehicle thefts surge in specific corridors based on lighting, transit schedules, and footfall bottlenecks.',
    whyItMatters: 'Predictive situational awareness enables law enforcement agencies to optimize limited patrol personnel, deter violent and property crimes proactively, and decrease emergency response times while maintaining strict algorithmic auditability.',
    proposedTechnicalApproach: [
      'Data Ingestion: Harmonize multi-year spatial incident logs (FIRs, CAD call logs) with GeoJSON city boundary partitions.',
      'Feature Engineering: Construct spatiotemporal grid cells (H3 or S2 hexagonal bins) with temporal lags, holiday markers, and POI proximity features.',
      'Model Architecture: Employ Spatiotemporal Graph Neural Networks (ST-GNN) or Spatial Temporal Convolutional Networks combined with XGBoost ensemble baseline.',
      'Fairness & Bias Mitigation: Implement Disparate Impact and Equalized Odds validation to prevent over-policing historically marginalized zones.',
      'Interactive Dashboard: Web-based interactive Leaflet/MapLibre UI displaying dynamic risk heatmaps and patrol route recommendation cards.'
    ],
    technologies: ['Python', 'PyTorch / PyTorch Geometric', 'Uber H3 Hexagonal Grid', 'PostGIS', 'XGBoost', 'Leaflet.js', 'FastAPI'],
    expectedOutcome: 'A functional geospatial dashboard demonstrating hot-spot risk projections, confidence intervals, model explainability (SHAP values), and ethical fairness audit metrics across simulated district sectors.',
    participantQuestions: [
      'How does your model distinguish between true crime incidence and reporting density bias?',
      'What spatial indexing system do you use to ensure low-latency geospatial queries under high concurrency?',
      'How do you measure and prove algorithmic fairness to community review boards?',
      'What fallback mechanism ensures operational continuity if satellite or telemetry feeds drop?'
    ],
    evaluationCriteria: [
      'Accuracy of spatial-temporal forecast (RMSE / F1-Score on test intervals)',
      'Clarity and transparency of bias-auditing metrics',
      'System responsiveness and interactive map performance',
      'Feasibility of field deployment on edge police dispatch terminals'
    ]
  },
  {
    id: 'prob-2',
    number: 2,
    title: 'Cybercrime Detection and Prevention',
    shortSummary: 'Real-time telemetry defense identifying distributed brute-force, credential stuffing, and APT lateral movements.',
    difficulty: 'Advanced',
    domain: 'Network Defense & SOC Automation',
    description: 'Develop an automated cyber defense platform capable of streaming PCAP network flows, host authentication logs, and DNS query volumes to flag anomalous credential stuffing, fast-flux domains, and command-and-control (C2) beaconing in near real-time.',
    realWorldScenario: 'An e-commerce and banking infrastructure encounters a coordinated distributed credential stuffing attack originating from 12,000 compromised residential IP proxies, attempting 300,000 login attempts per minute while rotating user-agent strings to evade traditional WAF rate limits.',
    whyItMatters: 'Account takeovers (ATO) and ransomware initial access vectors inflict billions of dollars in enterprise damages and compromise citizen credentials. Automated correlation reduces mean-time-to-detect (MTTD) from weeks to seconds.',
    proposedTechnicalApproach: [
      'Log Parsing & Streaming: Normalize Apache, Zeek/Bro, and Windows Event ID 4625 logs using Vector or FluentBit.',
      'Anomaly Detection: Train Isolation Forests and Autoencoder neural networks on baseline flow entropy and request burstiness.',
      'Threat Intelligence Correlation: Cross-reference inbound IP addresses with real-time STIX/TAXII threat feeds and AlienVault OTX.',
      'Active Remediation Engine: Trigger automated IPTables or Cloudflare WAF challenge rules upon anomaly confidence thresholds > 0.85.',
      'SOC Analyst HUD: Timeline visualization of attacker progression mapped to MITRE ATT&CK framework tactics (TA0001 - TA0011).'
    ],
    technologies: ['Zeek / Bro', 'Elasticsearch / OpenSearch', 'Kafka', 'Scikit-learn', 'Snort / Suricata', 'Python', 'React HUD'],
    expectedOutcome: 'A high-throughput monitoring dashboard that ingests simulated PCAP/JSON traffic streams, maps active intrusions to MITRE ATT&CK techniques, and generates verifiable SIEM mitigation rules.',
    participantQuestions: [
      'How does your system minimize false positives during legitimate traffic spikes such as flash sales?',
      'Which MITRE ATT&CK techniques does your detection engine currently cover out of the box?',
      'How do you handle encrypted TLS 1.3 traffic where packet payloads cannot be directly inspected?',
      'What is your system benchmark for latency between packet capture and alert dispatch?'
    ],
    evaluationCriteria: [
      'Detection recall on covert C2 beaconing and distributed low-and-slow brute force',
      'Integration fidelity with standard SIEM/SOAR data formats',
      'Clarity of analyst alert triage hierarchy',
      'Effectiveness of automated IP ban / rate-limit triggers'
    ]
  },
  {
    id: 'prob-3',
    number: 3,
    title: 'Digital Evidence Collection and Analysis',
    shortSummary: 'Cryptographic chain-of-custody verification and automated disk/memory triage for digital forensics.',
    difficulty: 'Intermediate',
    domain: 'Digital Forensics & Incident Response',
    description: 'Construct a forensically sound evidentiary ingestion tool that computes cryptographic hashes (SHA-256, BLAKE3), extracts registry/prefetch timeline artifacts, analyzes volatile memory structures, and builds an immutable tamper-evident chain of custody audit trail.',
    realWorldScenario: 'A seized suspect laptop contains deleted encrypted volumes, suspicious USB drive insertion artifacts, and anti-forensics timestamp manipulation (timestomping). Digital forensic investigators must prove in court that no files were altered or contaminated after evidence confiscation.',
    whyItMatters: 'Unverified digital evidence is routinely suppressed or dismissed in judicial trials due to improper handling, lack of verified hashing, or incomplete chain-of-custody documentation.',
    proposedTechnicalApproach: [
      'Forensic Image Verification: Ingest RAW/DD and E01 forensic images, calculating dual SHA-256 and BLAKE3 verification checksums.',
      'Artifact Extraction: Automate parsing of Windows $MFT, Prefetch (.pf), Shimcache, and browser SQLite history databases.',
      'Timeline Reconstruction: Aggregate disparate file creation, modification, and access timestamps into a chronological Super-Timeline.',
      'Immutable Ledger: Hash each evidence state and append entry into an append-only cryptographic Merkle tree or verifiable audit record.',
      'Automated Court Report: Export ISO/IEC 27037 compliant forensic documentation detailing forensic examiner signatures and artifact provenance.'
    ],
    technologies: ['Autopsy API', 'Sleuth Kit (TSK)', 'Volatility 3', 'Python SQLite3', 'BLAKE3', 'ReportLab PDF Generator'],
    expectedOutcome: 'A functional forensic triage tool that parses sample disk images, extracts USB insertion logs, highlights timestomped files, and outputs a courtroom-ready evidence verification report.',
    participantQuestions: [
      'How does your tool guarantee that volatile memory is preserved without corrupting kernel state?',
      'What validation method proves that your timeline reconstruction detects deliberate timestomping?',
      'How does your cryptographic chain-of-custody comply with ISO/IEC 27037 standards?',
      'What safeguards prevent accidental write operations during physical device acquisition?'
    ],
    evaluationCriteria: [
      'Strict adherence to forensic imaging non-alteration standards',
      'Depth of extracted timeline artifacts (USB, execution, browser, shellbags)',
      'Completeness of generated forensic verification documentation',
      'Speed of parsing multi-gigabyte disk artifact logs'
    ]
  },
  {
    id: 'prob-4',
    number: 4,
    title: 'Fake Social Media Account Detection',
    shortSummary: 'Graph network clustering and NLP linguistic analysis to unmask botnets and coordinated disinformation rings.',
    difficulty: 'Intermediate',
    domain: 'OSINT & Social Network Forensics',
    description: 'Build an OSINT social graph analysis engine that combines profile metadata heuristics, posting temporal rhythms, and natural language linguistic stylometry to identify coordinated inauthentic behavior, sockpuppets, and automated propaganda networks.',
    realWorldScenario: 'During an election cycle or financial market squeeze, thousands of newly created Twitter/X and Telegram accounts synchronously amplify fraudulent stock tips and fabricated community grievances using identical repost cadences and synthetic AI profile photos.',
    whyItMatters: 'Social media botnets manipulate public sentiment, perpetrate large-scale crypto pump-and-dump scams, and sow civic discord while operating behind automated API rotating networks.',
    proposedTechnicalApproach: [
      'Account Telemetry Harvesting: Collect account creation date, follower-following ratio, tweet intervals, and default avatar hashes.',
      'Temporal Rhythm Analysis: Compute entropy of posting timestamps to detect non-human, rigid periodic publication patterns.',
      'Graph Clustering: Construct an interactive bipartite interaction graph (retweets, mentions, co-shares) using Louvain community detection.',
      'Stylometry & Semantic Embeddings: Measure text similarity using sentence transformers (all-MiniLM-L6-v2) to flag coordinated copy-paste messaging.',
      'Bot Probability Scorecard: Output transparent factor weights explaining why a specific cluster was tagged as inauthentic.'
    ],
    technologies: ['NetworkX', 'Sentence-Transformers', 'spaCy', 'Neo4j / Graphology', 'FastAPI', 'D3.js Force Directed Graph'],
    expectedOutcome: 'An investigative tool that takes simulated social export archives, detects coordinated bot rings with >85% precision, and visualizes the propagation network clusters with risk scores.',
    participantQuestions: [
      'How does your model distinguish between legitimate high-frequency news feeds and malicious bot accounts?',
      'How do you detect AI-generated profile pictures (StyleGAN artifacts, eye-centering markers)?',
      'What graph algorithmic metrics (betweenness centrality, modularity) best reveal botnet command nodes?',
      'How do you protect privacy and avoid false flagging of active human power-users?'
    ],
    evaluationCriteria: [
      'Precision and recall on benchmark bot detection datasets',
      'Clarity of community graph visualization and cluster isolation',
      'Explainability of individual account bot scores',
      'Scalability when ingesting social archives with 50,000+ interactions'
    ]
  },
  {
    id: 'prob-5',
    number: 5,
    title: 'Online Financial Fraud Detection',
    shortSummary: 'Real-time payment transaction scoring and money mule graph traversal across banking networks.',
    difficulty: 'Advanced',
    domain: 'FinTech Forensics & Fraud Prevention',
    description: 'Design an enterprise fraud monitoring engine that evaluates transaction velocity, device fingerprinting, geolocation anomalies, and money-mule laundering loops to block fraudulent UPI/card transactions within a 100ms processing window.',
    realWorldScenario: 'A victim clicks a deceptive bank KYC SMS link, installing an SMS-stealing APK. The fraudster performs an unauthorized $2,500 withdrawal, immediately splitting the sum across 8 micro-mule accounts and 3 digital wallets within 90 seconds to evade banking freezes.',
    whyItMatters: 'Digital payments and UPI fraud have grown exponentially. Once stolen funds traverse beyond the second mule hop, recovery rates drop below 5%, requiring millisecond-level preventive scoring.',
    proposedTechnicalApproach: [
      'Streaming Ingestion: Evaluate transaction tuples (Amount, Merchant Category, Device Hash, Geo-IP, Velocity) via real-time pipeline.',
      'Feature Store: Maintain sliding 5-minute, 1-hour, and 24-hour aggregate transaction counts and historical sender/receiver baselines.',
      'Graph Traversal: Identify circular transaction rings and rapid fund-dispersion patterns using Cypher queries on Graph DBs.',
      'Machine Learning Classifier: LightGBM / CatBoost model trained on imbalanced fraud datasets utilizing SMOTE and focal loss.',
      'Rule Engine Fallback: Hard velocity tripwires (e.g. 5 transactions in <60 seconds from new device location) triggering immediate step-up 2FA.'
    ],
    technologies: ['LightGBM', 'Redis (Sliding Window Velocity)', 'Neo4j Graph Database', 'Apache Kafka', 'Python', 'Tailwind Dashboard'],
    expectedOutcome: 'A real-time financial transaction simulator with sub-100ms classification latency, mule network visualizer, and customizable risk threshold sliders for fraud compliance officers.',
    participantQuestions: [
      'How do you handle severe class imbalance where fraud accounts for less than 0.1% of transactions?',
      'How does your system detect rapid money laundering fan-out across multiple intermediate accounts?',
      'What latency benchmarks do you achieve for real-time payment authorization gating?',
      'How does the system prevent legitimate overseas traveler payments from getting falsely declined?'
    ],
    evaluationCriteria: [
      'AUC-ROC and PR-AUC performance on test transaction datasets',
      'Inference latency under simulated transaction load (<150ms)',
      'Effectiveness of circular laundering / mule network detection',
      'Investigator workflow UI for auditing flagged transaction batches'
    ]
  },
  {
    id: 'prob-6',
    number: 6,
    title: 'Deepfake and Manipulated Media Detection',
    shortSummary: 'Multimodal spatial-frequency and biometric inconsistency analysis to expose synthetic audio and video.',
    difficulty: 'Advanced',
    domain: 'Computer Vision & Multimedia Forensics',
    description: 'Create an automated media forensic suite that analyzes suspect video clips, profile images, and audio voice notes to detect deepfake synthesis artifacts, facial boundary blending anomalies, optical flow inconsistencies, and synthetic voice spectral patterns.',
    realWorldScenario: 'A company finance manager receives a video call and voice message appearing to be their CEO authorizing an emergency wire transfer to an overseas acquisition partner. The video exhibits subtle lip-sync misalignment and ear boundary warping characteristic of diffusion deepfakes.',
    whyItMatters: 'Deepfakes threaten judicial video evidence credibility, executive corporate identity, and democratic electoral integrity. High-accuracy automated detection tools are vital for media authentication.',
    proposedTechnicalApproach: [
      'Frame Extraction & Face Alignment: Detect facial landmarks and align crops across sequential video frames using MediaPipe / MTCNN.',
      'Frequency Domain Analysis: Compute 2D Fast Fourier Transform (FFT) and Discrete Cosine Transform (DCT) to expose upsampling grid artifacts.',
      'Biometric Consistency: Measure biological signal indicators such as remote photoplethysmography (rPPG pulse variation) and spontaneous eye blink rates.',
      'Audio Spectral Forensics: Inspect Mel-spectrograms for synthetic vocoder audio clipping and pitch discontinuity.',
      'Forensic Attribution Report: Output frame-by-frame confidence plots highlighting regions of high manipulation likelihood.'
    ],
    technologies: ['OpenCV', 'PyTorch (EfficientNet / MesoNet)', 'MediaPipe', 'Librosa (Audio)', 'NumPy / SciPy (FFT)', 'Streamlit / Web UI'],
    expectedOutcome: 'A forensic media inspector that accepts video/audio uploads, generates heatmaps of synthetic blending boundaries, plots frame-by-frame manipulation confidence, and explains the detection criteria.',
    participantQuestions: [
      'How does your model perform when videos are heavily compressed by WhatsApp or Twitter re-encoding?',
      'What acoustic artifacts distinguish voice-cloned speech from genuine human vocal tract harmonics?',
      'How do you prevent adversarial perturbation attacks designed to fool CNN deepfake detectors?',
      'What explainable visual evidence does your tool provide for court admissibility?'
    ],
    evaluationCriteria: [
      'Robustness against compression, noise addition, and resolution downscaling',
      'Clear visualization of spatial and frequency domain manipulation artifacts',
      'Dual capability handling both audio synthetic speech and video facial manipulation',
      'Execution speed per minute of ingested video'
    ]
  },
  {
    id: 'prob-7',
    number: 7,
    title: 'CCTV-Based Suspicious Activity Detection',
    shortSummary: 'Edge computer vision tracking loitering, unattended baggage, perimeter intrusion, and aggressive physical confrontations.',
    difficulty: 'Intermediate',
    domain: 'Computer Vision & Public Safety',
    description: 'Develop an intelligent edge video analytics system that processes multi-camera RTSP video feeds to recognize defined suspicious anomalies: loitering in restricted zones, abandoned luggage, perimeter trespassing, and sudden physical scuffles, triggering immediate zone dispatch alerts.',
    realWorldScenario: 'At a crowded metro station, a backpack is placed near an electrical substation and left unattended for over 8 minutes while the carrier departs. Concurrently, a restricted access gate experiences unauthorized perimeter traversal.',
    whyItMatters: 'Human CCTV operators experience severe cognitive fatigue after monitoring multiple screens for over 20 minutes. Automated visual triggers ensure zero critical physical security events go unnoticed.',
    proposedTechnicalApproach: [
      'Object Detection & Tracking: Deploy YOLOv8 / YOLOv11 for human and luggage detection paired with ByteTrack for persistent ID tracking across frames.',
      'Virtual Polygonal Geofencing: Enable security admins to draw custom polygonal restricted perimeters and sensitive asset bounding boxes.',
      'Temporal Behavioral Rules: Calculate individual stationary dwell time to trigger loitering warnings when dwell exceeds custom thresholds (e.g. >180s).',
      'Pose Estimation & Fight Recognition: Utilize MediaPipe Pose or ST-GCN to identify rapid limb acceleration and collision vectors indicating physical fights.',
      'Lightweight Edge Optimization: Quantize models to ONNX / TensorRT for deployment on low-cost edge accelerators (NVIDIA Jetson / Raspberry Pi 5).'
    ],
    technologies: ['YOLOv8', 'OpenCV', 'ByteTrack', 'ONNX Runtime', 'WebSockets', 'HTML5 Canvas Overlay'],
    expectedOutcome: 'An interactive multi-camera CCTV monitoring console simulating live security feeds, drawing real-time bounding boxes with trajectory histories, and sounding alerts upon rule violations.',
    participantQuestions: [
      'How do you maintain object tracking persistence through temporary occlusions (e.g. passing crowds)?',
      'How does your system filter out environmental noise like moving tree shadows, rain, or wandering animals?',
      'What privacy preservation techniques (such as automatic face and license plate blurring) are integrated?',
      'What FPS throughput does your pipeline sustain on edge hardware without discrete GPUs?'
    ],
    evaluationCriteria: [
      'Tracking continuity through severe occlusions and camera angle shifts',
      'Accuracy of loitering and abandoned item temporal logic',
      'Real-time processing capability (minimum 20 FPS on standard test video)',
      'Security operator interface ergonomics and zone configuration simplicity'
    ]
  },
  {
    id: 'prob-8',
    number: 8,
    title: 'OSINT-Based Investigation System',
    shortSummary: 'Automated digital footprint reconnaissance, entity correlation, and threat actor infrastructure mapping.',
    difficulty: 'Intermediate',
    domain: 'Open Source Intelligence (OSINT)',
    description: 'Build an ethical, automated OSINT reconnaissance suite that correlates public internet indicators (email addresses, phone numbers, domain names, IP addresses, cryptocurrency wallets, and leaked credential databases) into an interactive relational intelligence graph.',
    realWorldScenario: 'An anonymous scam syndicate runs a fraudulent investment portal. An investigator starts with only a contact email and crypto wallet address. The OSINT system must uncover linked domains, historical DNS records, associated social media handles, and hosting IP geographic clusters.',
    whyItMatters: 'Cybercriminals leave subtle digital breadcrumbs across registrars, code repositories, and public forums. Manual correlation across dozens of tools takes days, allowing criminals time to dismantle servers and liquidate assets.',
    proposedTechnicalApproach: [
      'Modular Collector Framework: Modular scrapers querying public APIs (WHOIS, crt.sh SSL certificates, DNS passive records, GitHub, Keybase).',
      'Cryptocurrency Wallet Tracker: Trace public blockchain transactions (Bitcoin, Ethereum, USDT) across Etherscan / Blockstream API endpoints.',
      'Entity Extraction & Disambiguation: Parse raw text for IOCs (Indicators of Compromise) using specialized regex and Named Entity Recognition (NER).',
      'Interactive Knowledge Graph: Store correlated nodes and edges in an interactive graph visualizer enabling investigators to expand hops.',
      'Strict Ethical Guardrails: Restrict lookups strictly to passive public data sources with comprehensive investigator action logging.'
    ],
    technologies: ['Python / TypeScript', 'Cytoscape.js / D3.js', 'PassiveTotal / Shodan APIs', 'Blockchain Explorers', 'Regex IOC Parsers'],
    expectedOutcome: 'A unified OSINT workbench where entering a seed indicator (email, domain, wallet) automatically builds an expandable investigation graph with confidence scores and exportable dossiers.',
    participantQuestions: [
      'How does your tool protect investigator operational security (OPSEC) from leaking search intent to targets?',
      'How do you score the reliability and freshness of disparate OSINT data sources?',
      'What legal and ethical boundaries separate legitimate open-source intelligence from unlawful surveillance or hacking?',
      'How do you resolve entity ambiguity when multiple individuals share similar names or handles?'
    ],
    evaluationCriteria: [
      'Breadth of correlated data pivots (Domain -> IP -> SSL -> Email -> Social)',
      'Clarity, responsiveness, and usability of the interactive graph visualizer',
      'Strict adherence to passive OSINT ethical guidelines and OPSEC considerations',
      'Exportable intelligence report quality (PDF / JSON STIX-2 format)'
    ]
  },
  {
    id: 'prob-9',
    number: 9,
    title: 'Missing Person Identification Assistance',
    shortSummary: 'Biometric face matching, clothing attribute filtering, and multi-agency lead coordination for search operations.',
    difficulty: 'Intermediate',
    domain: 'Humanitarian AI & Public Safety',
    description: 'Design a rapid biometric search and lead coordination portal that matches reported missing person photographs and demographic descriptions against public surveillance captures, hospital intake logs, and shelter registry photos while respecting civil liberties and privacy standards.',
    realWorldScenario: 'A vulnerable elderly person with Alzheimer’s wanders away from their residential care facility in a sprawling city. Search teams have one photo taken two years prior and a description of recent clothing (navy jacket, brown shoes).',
    whyItMatters: 'The first 48 hours in missing person cases are statistically critical. Fast matching across multi-agency feeds dramatically increases safe recovery rates while minimizing redundant manual searching.',
    proposedTechnicalApproach: [
      'Deep Face Embedding: Extract 512-dimensional facial feature vectors using ArcFace / FaceNet robust to aging, lighting, and angles.',
      'Vector Similarity Search: Store embeddings in high-speed vector index (FAISS or ChromaDB) for millisecond cosine distance queries.',
      'Soft Biometrics & Clothing Filter: Integrate CLIP (Contrastive Language-Image Pre-training) to query surveillance frames by natural language attributes ("person in dark blue jacket and brown footwear").',
      'Lead Verification Workflow: Provide secondary human-in-the-loop verification before triggering field search team alerts to prevent misidentification.',
      'Data Privacy Architecture: Encrypt sensitive biometric vectors and enforce automatic data retention purges 30 days after case resolution.'
    ],
    technologies: ['ArcFace / InsightFace', 'FAISS Vector Index', 'OpenAI CLIP', 'Python', 'Tailwind Search UI', 'PostgreSQL'],
    expectedOutcome: 'A search coordination interface enabling officers to upload reference photos or clothing queries, displaying ranked candidate matches with similarity confidence scores and verification stamps.',
    participantQuestions: [
      'How does your model handle facial aging when the reference photo is several years older than recent captures?',
      'How do you mitigate racial and gender demographic disparity in facial recognition models?',
      'What human-in-the-loop verification safeguards prevent false arrests or harassment from faulty matches?',
      'How is sensitive citizen biometric data encrypted and audited under privacy legislation?'
    ],
    evaluationCriteria: [
      'Top-1 and Top-5 search accuracy on challenging benchmark face databases',
      'Ability to filter candidates using soft attributes (clothing color, approximate age)',
      'Human-in-the-loop review interface clarity',
      'Strong privacy safeguards, access logs, and data retention compliance'
    ]
  },
  {
    id: 'prob-10',
    number: 10,
    title: 'AI-Powered Crime Investigation Assistant',
    shortSummary: 'Local LLM cognitive copilot summarizing witness depositions, cross-referencing contradictions, and querying legal statutes.',
    difficulty: 'Advanced',
    domain: 'Generative AI & Legal Tech',
    description: 'Construct a secure, hallucination-resistant investigative copilot that ingests massive case files (FIRs, autopsy reports, witness statements, ballistic records) via Retrieval-Augmented Generation (RAG) to uncover timeline contradictions, query criminal law statutes, and draft structured charge-sheet summaries.',
    realWorldScenario: 'A complex corporate homicide investigation involves 45 witness interviews, 800 pages of bank statements, 3 forensic lab reports, and competing alibis. The lead detective needs to instantly locate conflicting testimonies regarding suspect whereabouts between 10:00 PM and 11:30 PM.',
    whyItMatters: 'Investigators spend up to 40% of their operational time reading repetitive documentation, cross-referencing timestamps, and formatting legal paperwork. AI assistance uncovers hidden discrepancies and accelerates justice.',
    proposedTechnicalApproach: [
      'Secure Document Ingestion: Chunk and vectorize OCR-parsed PDF case files into local vector storage with strict metadata tagging (speaker, date, document type).',
      'Hierarchical RAG Architecture: Implement hybrid search (BM25 keyword search + Dense Vector retrieval) with Cross-Encoder reranking for precision.',
      'Contradiction Extraction Engine: Specialized prompting and semantic entailment models (NLI) to flag conflicting alibi statements across different interviewees.',
      'Grounding & Source Citation: Every copilot response must cite exact page and line numbers from verified evidentiary files with zero external hallucinations.',
      'Offline/Air-Gapped Operation: Support localized inference using quantized open-weights models (Llama 3 8B / Mistral 7B via Ollama) to keep confidential police data completely private.'
    ],
    technologies: ['LangChain / LlamaIndex', 'ChromaDB / Qdrant', 'Ollama (Local LLMs)', 'BM25 + BGE Embeddings', 'React Markdown Viewer'],
    expectedOutcome: 'A forensic case assistant UI where detectives query complex multi-document case bundles, view interactive timeline contradictions, and inspect verified source citations with side-by-side document previews.',
    participantQuestions: [
      'How do you guarantee 100% zero-hallucination compliance when summarizing sworn legal depositions?',
      'How does your system enforce strict air-gapped data sovereignty without leaking case files to external cloud APIs?',
      'How does the model detect subtle semantic contradictions (e.g. conflicting clothing descriptions or timing gaps) between two witness accounts?',
      'What audit log records every query made by detectives to ensure courtroom evidentiary integrity?'
    ],
    evaluationCriteria: [
      'Accuracy of citation grounding and retrieval precision (nDCG / Hit Rate)',
      'Effectiveness at flagging factual and temporal contradictions across documents',
      'Commitment to data privacy and air-gapped deployment architecture',
      'Analyst UX for verifying cited document evidence side-by-side'
    ]
  }
];
