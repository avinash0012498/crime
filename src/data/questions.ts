import { Question } from '../types';

export const questionsData: Question[] = [
  // ==========================================
  // 1. CYBERSECURITY (10 Questions)
  // ==========================================
  {
    id: 'q-cs-1',
    category: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'What is the primary operational objective of a Security Operations Center (SOC)?',
    options: [
      'To build production features and deploy software releases',
      'To continuously monitor, detect, analyze, and respond to cybersecurity incidents',
      'To audit financial payroll accounts for corporate fraud',
      'To manufacture physical access security cards for building doors'
    ],
    correctAnswer: 1,
    explanation: 'A Security Operations Center (SOC) is an organization’s centralized cybersecurity command unit tasked with 24/7 monitoring, anomaly triage, active threat detection, and rapid incident response.',
    tags: ['SOC', 'Incident Response', 'Defense']
  },
  {
    id: 'q-cs-2',
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'In public-key cryptography (asymmetric encryption), which key is used to sign a digital certificate to verify its authenticity?',
    options: [
      'The client’s public key',
      'The sender’s symmetric session key',
      'The Certificate Authority’s (CA) private key',
      'The receiver’s shared secret key'
    ],
    correctAnswer: 2,
    explanation: 'A Certificate Authority (CA) signs digital certificates using its own private key. Anyone with the CA’s well-known public key can verify the mathematical signature to prove the certificate is untampered and authentic.',
    tags: ['Cryptography', 'PKI', 'Certificates']
  },
  {
    id: 'q-cs-3',
    category: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'Which attack vector involves hijacking a legitimate domain’s DNS traffic by compromising DNS registrar credentials or authoritative nameservers without touching the victim’s server?',
    options: [
      'Cross-Site Request Forgery (CSRF)',
      'DNS Hijacking / Domain Redirection',
      'SQL Injection Error-Based Exfiltration',
      'Buffer Overflow ROP Chaining'
    ],
    correctAnswer: 1,
    explanation: 'DNS Hijacking redirects legitimate user queries at the registrar or authoritative DNS level to malicious attacker-controlled servers, often masquerading as banking or login portals.',
    tags: ['DNS', 'Network Security', 'Threats']
  },
  {
    id: 'q-cs-4',
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'What is the principal operational purpose of the MITRE ATT&CK framework?',
    options: [
      'To provide a standardized taxonomy and knowledge base of real-world adversary tactics, techniques, and procedures (TTPs)',
      'To encrypt military communication channels with zero-latency hardware ciphers',
      'To automate credit card chargeback disputes in banking software',
      'To license penetration testers under international maritime law'
    ],
    correctAnswer: 0,
    explanation: 'The MITRE ATT&CK framework documents adversary behaviors, tactics (the "why"), and techniques (the "how") observed in real-world cyberattacks to help defenders model threat posture and calibrate detections.',
    tags: ['MITRE ATT&CK', 'Threat Intelligence', 'TTP']
  },
  {
    id: 'q-cs-5',
    category: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'Which security principle dictates that a user or system process must only be granted access to the specific resources essential for its legitimate task?',
    options: [
      'Principle of Least Privilege (PoLP)',
      'Security through Obscurity',
      'Open Access Topology',
      'Defense in Inversion'
    ],
    correctAnswer: 0,
    explanation: 'The Principle of Least Privilege ensures that every entity (user, service, API) operates with the absolute minimum rights and clearances needed to perform its duty, mitigating blast radius upon compromise.',
    tags: ['IAM', 'Access Control', 'Hardening']
  },
  {
    id: 'q-cs-6',
    category: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'What is the key defensive characteristic of a "Fast-Flux" DNS technique frequently deployed by sophisticated botnets?',
    options: [
      'Encrypting DNS queries using custom post-quantum ciphers',
      'Rapidly swapping the IP addresses assigned to a fully qualified domain name (FQDN) using extremely low TTL values',
      'Disabling DNS caching on all client operating systems worldwide',
      'Flooding the root DNS servers with SYN packets to cause a global network blackout'
    ],
    correctAnswer: 1,
    explanation: 'Fast-Flux DNS uses very low TTLs (often 60–300 seconds) and continuously rotates the A records of a domain across a distributed pool of compromised compromised proxy bots, making IP-based takedown futile.',
    tags: ['Botnets', 'DNS', 'C2']
  },
  {
    id: 'q-cs-7',
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'Which type of cryptographic salt is required to effectively defend stored passwords against precomputed rainbow table attacks?',
    options: [
      'A globally shared static salt hardcoded into the web server binary',
      'A cryptographically random, unique salt generated per user account and stored alongside the hashed password',
      'A salt derived solely from the user’s date of birth and username',
      'An unhashed plaintext representation of the user’s email address'
    ],
    correctAnswer: 1,
    explanation: 'Unique, cryptographically secure per-user salts force attackers to compute dedicated dictionary searches for each individual credential, rendering shared precomputed rainbow tables completely ineffective.',
    tags: ['Authentication', 'Hashing', 'Passwords']
  },
  {
    id: 'q-cs-8',
    category: 'Cybersecurity',
    difficulty: 'Easy',
    question: 'What does a Denial-of-Service (DoS) attack seek to compromise in the classic CIA security triad?',
    options: [
      'Confidentiality',
      'Integrity',
      'Availability',
      'Non-Repudiation'
    ],
    correctAnswer: 2,
    explanation: 'The CIA triad stands for Confidentiality, Integrity, and Availability. DoS attacks flood or crash systems specifically to exhaust compute, memory, or bandwidth, thereby degrading or destroying Availability.',
    tags: ['CIA Triad', 'Fundamentals', 'Network Security']
  },
  {
    id: 'q-cs-9',
    category: 'Cybersecurity',
    difficulty: 'Medium',
    question: 'In Zero Trust architecture, what is the core philosophy governing network traffic and entity access?',
    options: [
      'Trust everything inside the corporate firewall perimeter and verify only incoming external packets',
      'Never trust, always verify—treat all requests as originating from an untrusted network regardless of physical location',
      'Authenticate users once at start of day and bypass all subsequent authorization checks',
      'Rely exclusively on IP whitelisting to validate identity without session tokens'
    ],
    correctAnswer: 1,
    explanation: 'Zero Trust eliminates implicit trust. Every access attempt—internal or external—must be explicitly authenticated, authorized based on context, and continuously validated under least-privilege principles.',
    tags: ['Zero Trust', 'Architecture', 'Network Defense']
  },
  {
    id: 'q-cs-10',
    category: 'Cybersecurity',
    difficulty: 'Hard',
    question: 'What is the primary indicator of Command and Control (C2) beaconing in netflow analysis?',
    options: [
      'A single burst of 10 gigabytes transmitted in under 2 seconds to a known CDN',
      'Periodic, low-jitter outbound outbound communication packets sent to an external IP at regular or pseudo-random intervals',
      'High packet loss on internal UDP broadcast ports',
      'An instantaneous surge in ICMP Echo requests between local workstations'
    ],
    correctAnswer: 1,
    explanation: 'Malware implants regularly "beacon" back to their C2 server to receive taskings. Forensic analysts detect this via regularity, periodic delta timestamps, and low-variance payload sizes in egress telemetry.',
    tags: ['NetFlow', 'Malware', 'Detection']
  },

  // ==========================================
  // 2. ARTIFICIAL INTELLIGENCE & MACHINE LEARNING (10 Questions)
  // ==========================================
  {
    id: 'q-ai-1',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Easy',
    question: 'In supervised machine learning for fraud detection, what does severe "class imbalance" refer to?',
    options: [
      'Having too many features compared to the number of rows in the training dataset',
      'The target class (fraudulent transactions) occurring far less frequently than the negative class (legitimate transactions)',
      'The learning rate oscillating unstably between positive and negative gradients',
      'Using both categorical and numerical features in the same decision tree'
    ],
    correctAnswer: 1,
    explanation: 'Fraud datasets typically have less than 0.1% positive (fraud) cases. Standard classifiers maximizing raw accuracy might predict 100% negative and achieve 99.9% accuracy while catching zero fraudulent transactions.',
    tags: ['Machine Learning', 'Data Preprocessing', 'Fraud']
  },
  {
    id: 'q-ai-2',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Medium',
    question: 'Which sampling technique generates synthetic examples along feature-space line segments between minority class instances to combat class imbalance?',
    options: [
      'Random Under-sampling',
      'Synthetic Minority Over-sampling Technique (SMOTE)',
      'Principal Component Analysis (PCA)',
      'K-Means Clustering'
    ],
    correctAnswer: 1,
    explanation: 'SMOTE generates synthetic examples rather than simply duplicating minority class points. It selects k-nearest neighbors in the feature space and creates new points along the vector connecting them.',
    tags: ['SMOTE', 'Model Training', 'Imbalanced Data']
  },
  {
    id: 'q-ai-3',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Hard',
    question: 'When deploying a facial recognition model for criminal identification, what evaluation metric penalizes false positives most heavily when avoiding wrongful arrests?',
    options: [
      'High Recall at 50% threshold',
      'High Precision / Low False Positive Rate (FPR)',
      'Mean Squared Error (MSE)',
      'R-squared Correlation'
    ],
    correctAnswer: 1,
    explanation: 'High Precision ensures that when the model asserts a person is a suspect, that prediction has near-certain veracity. In judicial/forensic contexts, false positives (innocent persons flagged) cause irreparable harm.',
    tags: ['Metrics', 'Ethics', 'Computer Vision']
  },
  {
    id: 'q-ai-4',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Medium',
    question: 'In Retrieval-Augmented Generation (RAG) for legal crime investigation, what is the role of the Vector Database?',
    options: [
      'To compile Python scripts into binary assembly code for runtime acceleration',
      'To index and retrieve semantically relevant document chunks using high-dimensional cosine similarity embeddings',
      'To directly render HTML and CSS components to the investigator dashboard',
      'To replace relational ACID transactions in core banking ledgers'
    ],
    correctAnswer: 1,
    explanation: 'A vector database stores text embeddings (numerical vectors capturing semantic meaning). When an investigator queries the system, the vector database finds the closest matching case file chunks to ground the LLM.',
    tags: ['RAG', 'Vector DB', 'NLP']
  },
  {
    id: 'q-ai-5',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Medium',
    question: 'Why are Spatiotemporal Graph Neural Networks (ST-GNNs) preferred over simple Feed-Forward MLPs for crime forecasting?',
    options: [
      'They do not require any training data and execute in zero milliseconds',
      'They model both spatial topology (inter-neighborhood connectivity) and time-series dynamic lags simultaneously',
      'They convert all crime reports into JPEG images for standard OCR processing',
      'They bypass all ethical bias audit regulations automatically'
    ],
    correctAnswer: 1,
    explanation: 'Crime does not occur in isolated silos; it spreads across urban transit corridors and road networks over time. ST-GNNs capture physical graph adjacency alongside temporal periodicity (day/week lags).',
    tags: ['GNN', 'Deep Learning', 'Spatial AI']
  },
  {
    id: 'q-ai-6',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Hard',
    question: 'What is an "adversarial perturbation" in the context of computer vision and deepfake detection?',
    options: [
      'A physical camera lens crack that distorts optical refraction',
      'Subtle, human-imperceptible pixel noise calculated via gradient descent that causes a deep neural network to misclassify an image with high confidence',
      'A hardware GPU overheating failure during model inferencing',
      'An accidental change in image file extension from .PNG to .GIF'
    ],
    correctAnswer: 1,
    explanation: 'Adversarial attacks (like FGSM or PGD) add imperceptible mathematical noise to images that shift activations past decision boundaries, deceiving neural nets into misclassifying deepfakes as genuine.',
    tags: ['Adversarial ML', 'Computer Vision', 'Model Security']
  },
  {
    id: 'q-ai-7',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Easy',
    question: 'Which neural network architecture revolutionized natural language processing by introducing the self-attention mechanism?',
    options: [
      'Multi-Layer Perceptron (MLP)',
      'Transformer architecture',
      'Hopfield Network',
      'Radial Basis Function (RBF)'
    ],
    correctAnswer: 1,
    explanation: 'Introduced in "Attention Is All You Need" (Vaswani et al., 2017), the Transformer architecture replaced recurrent architectures by computing self-attention weights across all tokens in parallel.',
    tags: ['Transformers', 'LLM', 'Deep Learning']
  },
  {
    id: 'q-ai-8',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Medium',
    question: 'In object detection for CCTV surveillance (e.g. YOLO), what does Non-Maximum Suppression (NMS) accomplish?',
    options: [
      'It speeds up the camera frame rate by dropping low-light video feeds',
      'It eliminates redundant overlapping bounding boxes pointing to the same physical object, preserving only the highest confidence detection',
      'It compresses 4K video feeds into low-resolution grayscale images',
      'It disables AI detection whenever night vision mode is activated'
    ],
    correctAnswer: 1,
    explanation: 'YOLO generates thousands of potential anchor candidate boxes. Non-Maximum Suppression (NMS) evaluates Intersection over Union (IoU) among overlapping boxes and discards redundant duplicates.',
    tags: ['YOLO', 'Object Detection', 'CCTV']
  },
  {
    id: 'q-ai-9',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Hard',
    question: 'What is the function of SHAP (SHapley Additive exPlanations) values in an AI crime prediction system?',
    options: [
      'To encrypt the neural network weights so that hackers cannot reverse-engineer them',
      'To provide game-theoretic, mathematically sound local and global feature attribution explaining how each input variable influenced the prediction',
      'To automatically generate synthetic crime logs to deceive attackers',
      'To balance the server load across multi-GPU compute clusters'
    ],
    correctAnswer: 1,
    explanation: 'SHAP calculates the marginal contribution of each feature to a model output. For court and civic scrutiny, SHAP explains exactly why an algorithm flagged a specific area or suspect.',
    tags: ['Explainable AI', 'SHAP', 'Governance']
  },
  {
    id: 'q-ai-10',
    category: 'Artificial Intelligence and Machine Learning',
    difficulty: 'Easy',
    question: 'What is "overfitting" in machine learning model development?',
    options: [
      'When a model learns training data noise and idiosyncrasies so well that it fails to generalize to unseen test data',
      'When a neural network model file is larger than the available RAM on the GPU',
      'When the model fails to learn even the basic patterns in the training set',
      'When a dataset has more columns than rows'
    ],
    correctAnswer: 0,
    explanation: 'Overfitting occurs when a model captures random noise rather than underlying patterns. It shows stellar performance on training data but collapses on real-world unseen production data.',
    tags: ['Machine Learning', 'Model Evaluation', 'Basics']
  },

  // ==========================================
  // 3. DIGITAL FORENSICS (10 Questions)
  // ==========================================
  {
    id: 'q-df-1',
    category: 'Digital Forensics',
    difficulty: 'Easy',
    question: 'According to the Order of Volatility in digital forensics (RFC 3227), which source of evidence should be acquired first?',
    options: [
      'Hard disk drives (SATA / NVMe)',
      'CPU registers and processor cache',
      'Optical storage media (DVD-R)',
      'Archival backup tapes'
    ],
    correctAnswer: 1,
    explanation: 'RFC 3227 establishes the Order of Volatility: CPU registers/cache vanish first, followed by routing tables/ARP cache/kernel memory, temporary file systems, disk drives, and lastly archival media.',
    tags: ['Volatility', 'Evidence Acquisition', 'RFC 3227']
  },
  {
    id: 'q-df-2',
    category: 'Digital Forensics',
    difficulty: 'Medium',
    question: 'Why must a hardware or software write-blocker be used when creating a forensic duplicate of a seized hard drive?',
    options: [
      'To accelerate the transfer speed of raw sector bits by bypassing the operating system kernel',
      'To physically prevent any modification, write operation, or timestamp updates to the original evidentiary media during acquisition',
      'To automatically decrypt BitLocker volumes without requiring the recovery key',
      'To convert proprietary file systems into standard FAT32 formatting'
    ],
    correctAnswer: 1,
    explanation: 'Connecting a seized drive directly to an OS causes automatic mounting, file metadata updates, and cache writes. A write-blocker intercepts write signals, ensuring the original drive remains pristine and tamper-free.',
    tags: ['Write Blocker', 'Chain of Custody', 'Integrity']
  },
  {
    id: 'q-df-3',
    category: 'Digital Forensics',
    difficulty: 'Medium',
    question: 'What does the technique of "File Carving" accomplish in digital forensics?',
    options: [
      'Encrypting classified files with multi-layer symmetric ciphers',
      'Recovering deleted files from unallocated disk space based on known file headers (magic bytes) and footers without relying on file system metadata',
      'Slicing a hard disk into multiple physical partitions using laser microscopes',
      'Erasing all file slack space to evade law enforcement recovery'
    ],
    correctAnswer: 1,
    explanation: 'When files are deleted, file system records ($MFT or inode) may be wiped, but file contents remain in unallocated clusters. File carving identifies file signatures (magic numbers like 0xFFD8FFE0 for JPEG) to reconstruct data.',
    tags: ['File Carving', 'Data Recovery', 'Unallocated Space']
  },
  {
    id: 'q-df-4',
    category: 'Digital Forensics',
    difficulty: 'Hard',
    question: 'In Windows forensic analysis, what critical artifact proves that a specific executable program was launched by a user, including execution count and timestamp?',
    options: [
      'System Event Log ID 1000',
      'Windows Prefetch files (.pf) and UserAssist registry keys',
      'Internet Information Services (IIS) log',
      'Windows Update KB records'
    ],
    correctAnswer: 1,
    explanation: 'Windows Prefetch files (.pf) in C:\\Windows\\Prefetch record the application name, run count, volume serial numbers, and the last eight execution timestamps. UserAssist records GUI program execution in the NTUSER.DAT hive.',
    tags: ['Windows Forensics', 'Prefetch', 'Execution Artifacts']
  },
  {
    id: 'q-df-5',
    category: 'Digital Forensics',
    difficulty: 'Easy',
    question: 'What is the primary legal purpose of maintaining a strict "Chain of Custody" in criminal investigations?',
    options: [
      'To calculate the monetary value of seized electronic equipment for government auction',
      'To provide a chronological, documented paper and digital trail accounting for everyone who collected, handled, transferred, analyzed, and secured the evidence',
      'To grant defense attorneys administrative root access to police servers',
      'To speed up the trial by bypassing cross-examination'
    ],
    correctAnswer: 1,
    explanation: 'Chain of custody proves in court that evidence presented at trial is identical to what was seized at the crime scene, has not been contaminated or substituted, and was handled only by authorized personnel.',
    tags: ['Chain of Custody', 'Legal', 'Admissibility']
  },
  {
    id: 'q-df-6',
    category: 'Digital Forensics',
    difficulty: 'Hard',
    question: 'What anti-forensics technique is referred to as "Timestomping"?',
    options: [
      'Intentionally synchronizing computer system clocks with GPS atomic clocks',
      'Deliberately modifying file system metadata timestamps (MACB: Modified, Accessed, Created, Born) to disguise the true timing of malicious activity',
      'Overclocking the CPU clock frequency to corrupt memory dumps during analysis',
      'Deleting all audio recordings from a surveillance room microphone'
    ],
    correctAnswer: 1,
    explanation: 'Timestomping alters $STANDARD_INFORMATION file timestamps to match benign operating system files (e.g. kernel32.dll), hiding malicious drops. Forensic examiners expose this by comparing against $FILE_NAME timestamps in the $MFT.',
    tags: ['Anti-Forensics', 'Timestomping', 'MFT']
  },
  {
    id: 'q-df-7',
    category: 'Digital Forensics',
    difficulty: 'Medium',
    question: 'In volatile memory analysis using Volatility 3, which plugin/command lists running processes alongside parent-child process tree relationships?',
    options: [
      'windows.pslist / windows.pstree',
      'windows.dumpall',
      'windows.formatdisk',
      'windows.decryptsam'
    ],
    correctAnswer: 0,
    explanation: 'The `windows.pstree` plugin traverses process active process links (EPROCESS blocks in kernel memory) and formats them into an indented hierarchical tree, revealing rogue children spawned under svchost.exe or explorer.exe.',
    tags: ['Volatility', 'Memory Forensics', 'Incident Response']
  },
  {
    id: 'q-df-8',
    category: 'Digital Forensics',
    difficulty: 'Easy',
    question: 'What does comparing the cryptographic SHA-256 hash of a forensic disk image with the original physical drive verify?',
    options: [
      'That the drive has zero bad sectors and 100% health',
      'Data integrity—confirming the bit-for-bit duplicate is an exact mathematical clone of the original drive',
      'That the drive contains zero malicious software files',
      'That the drive can be booted as a virtual machine'
    ],
    correctAnswer: 1,
    explanation: 'Cryptographic hashing provides mathematical proof of integrity. If even a single byte differs between the seized media and the forensic image, the resulting SHA-256 hash will be completely divergent.',
    tags: ['Hashing', 'Integrity', 'Evidence']
  },
  {
    id: 'q-df-9',
    category: 'Digital Forensics',
    difficulty: 'Medium',
    question: 'What valuable forensic evidence is found in "RAM Slack" and "File Slack"?',
    options: [
      'Unallocated remnants of previous memory buffers or previously deleted file contents residing between the end of a logical file and the end of the allocated physical cluster',
      'Unused video memory buffers on external display monitors',
      'Corrupted motherboard BIOS flash chips',
      'Temporary license keys for commercial antivirus software'
    ],
    correctAnswer: 0,
    explanation: 'Operating systems allocate disk space in fixed cluster blocks (e.g. 4KB). If a file only uses 2.5KB, the remaining 1.5KB slack space often retains fragments of whatever previously resided in that disk or RAM sector.',
    tags: ['Slack Space', 'File Systems', 'Disk Forensics']
  },
  {
    id: 'q-df-10',
    category: 'Digital Forensics',
    difficulty: 'Hard',
    question: 'In browser forensics, where do Google Chrome and Mozilla Firefox store user browsing history, cookies, and download records?',
    options: [
      'In plaintext XML files in the System32 directory',
      'In structured SQLite databases within the user’s AppData or profile directory',
      'Exclusively in encrypted volatile server RAM that never touches disk',
      'In the Windows Registry HKEY_LOCAL_MACHINE\\SAM hive'
    ],
    correctAnswer: 1,
    explanation: 'Modern browsers store history (`History`), downloads (`History`), and bookmarks in SQLite format files (e.g. `History`, `Cookies`, `Web Data`) located in `%LocalAppData%\\Google\\Chrome\\User Data\\Default\\`.',
    tags: ['Browser Forensics', 'SQLite', 'Artifacts']
  },

  // ==========================================
  // 4. ETHICAL HACKING (10 Questions)
  // ==========================================
  {
    id: 'q-eh-1',
    category: 'Ethical Hacking',
    difficulty: 'Easy',
    question: 'What is the decisive legal distinction between an ethical penetration tester (White Hat) and a malicious hacker (Black Hat)?',
    options: [
      'The technical programming languages they use',
      'Explicit, written authorization (Scope of Work / Rules of Engagement) from the asset owner prior to testing',
      'Whether they use Linux or Windows operating systems',
      'The amount of computing power they possess'
    ],
    correctAnswer: 1,
    explanation: 'Ethical hacking requires explicit, written consent and agreed-upon rules of engagement. Testing or accessing systems without prior authorized permission violates cybercrime laws regardless of intent.',
    tags: ['Ethics', 'Penetration Testing', 'Legal']
  },
  {
    id: 'q-eh-2',
    category: 'Ethical Hacking',
    difficulty: 'Medium',
    question: 'In an Nmap port scan, which scan flag performs a "TCP SYN Stealth Scan" by terminating the connection handshake with an RST packet before completing the 3-way handshake?',
    options: [
      'nmap -sT',
      'nmap -sS',
      'nmap -sU',
      'nmap -sP'
    ],
    correctAnswer: 1,
    explanation: '`nmap -sS` sends a SYN packet; if the target replies with SYN/ACK, the port is open, and Nmap immediately sends an RST (reset) packet rather than an ACK. Because the full connection is never completed, older systems did not log it.',
    tags: ['Nmap', 'Reconnaissance', 'Network Scanning']
  },
  {
    id: 'q-eh-3',
    category: 'Ethical Hacking',
    difficulty: 'Medium',
    question: 'Which vulnerability allows an attacker to inject malicious SQL fragments into input fields to manipulate database queries and bypass authentication?',
    options: [
      'Cross-Site Scripting (XSS)',
      'SQL Injection (SQLi)',
      'Insecure Direct Object Reference (IDOR)',
      'Server-Side Request Forgery (SSRF)'
    ],
    correctAnswer: 1,
    explanation: 'SQL Injection occurs when user-supplied input is directly concatenated into SQL statements without parameterization, allowing attackers to inject boolean conditions like `\' OR 1=1 --` to hijack query execution.',
    tags: ['OWASP Top 10', 'SQLi', 'Web Security']
  },
  {
    id: 'q-eh-4',
    category: 'Ethical Hacking',
    difficulty: 'Hard',
    question: 'What defensive mechanism prevents Cross-Site Scripting (XSS) payloads from exfiltrating authentication session tokens via JavaScript `document.cookie`?',
    options: [
      'Applying the `HttpOnly` cookie flag',
      'Disabling HTTPS TLS encryption',
      'Changing the database collation to UTF-8',
      'Increasing the session timeout to 30 days'
    ],
    correctAnswer: 0,
    explanation: 'Setting the `HttpOnly` flag instructs the browser that the cookie must never be accessible via client-side scripts (e.g. `document.cookie`). Even if an attacker executes stored XSS, they cannot read the session cookie.',
    tags: ['XSS', 'Session Management', 'AppSec']
  },
  {
    id: 'q-eh-5',
    category: 'Ethical Hacking',
    difficulty: 'Medium',
    question: 'What is a "Server-Side Request Forgery" (SSRF) vulnerability?',
    options: [
      'An attack where the client browser sends duplicate requests to overwhelm web sockets',
      'A vulnerability where a server-side web application is induced to make unintended HTTP requests to arbitrary internal or external resources (such as cloud metadata services 169.254.169.254)',
      'A hardware attack requiring physical access to server motherboard RAM slots',
      'Modifying CSS stylesheets to trick users into clicking buttons'
    ],
    correctAnswer: 1,
    explanation: 'In SSRF, a vulnerable server fetches a remote URL provided by the attacker. Attackers abuse this to query internal localhost services, internal VPC networks, or cloud metadata endpoints (`http://169.254.169.254/latest/meta-data/`).',
    tags: ['SSRF', 'Cloud Security', 'OWASP']
  },
  {
    id: 'q-eh-6',
    category: 'Ethical Hacking',
    difficulty: 'Hard',
    question: 'What is the purpose of a "ROP Chain" (Return-Oriented Programming) in modern binary exploitation?',
    options: [
      'To bypass Data Execution Prevention (DEP / W+X) by stitching together existing executable machine instructions ("gadgets") ending in RET',
      'To brute force 4096-bit RSA keys in under 5 minutes',
      'To intercept unencrypted Wi-Fi beacon frames',
      'To automate DNS queries over Tor relays'
    ],
    correctAnswer: 0,
    explanation: 'When DEP marks the stack and heap as non-executable, injected shellcode cannot run directly. ROP bypasses this by chaining small snippets of existing legitimate code ("gadgets") ending in a `ret` instruction to invoke system calls.',
    tags: ['Binary Exploitation', 'Memory Safety', 'DEP']
  },
  {
    id: 'q-eh-7',
    category: 'Ethical Hacking',
    difficulty: 'Easy',
    question: 'What does "Pivoting" or "Lateral Movement" mean during a penetration testing assessment?',
    options: [
      'Changing the screen orientation on a mobile device',
      'Using a compromised host as a springboard or proxy to access and compromise other internal machines on protected subnets',
      'Switching between Python and Bash programming languages',
      'Upgrading a hard drive from HDD to SSD during testing'
    ],
    correctAnswer: 1,
    explanation: 'Once an initial foothold is secured on a perimeter system, an attacker or tester pivots to tunnel traffic deeper into internal segmented networks that are inaccessible from the public internet.',
    tags: ['Lateral Movement', 'Pivoting', 'Metasploit']
  },
  {
    id: 'q-eh-8',
    category: 'Ethical Hacking',
    difficulty: 'Medium',
    question: 'Which of the following is an effective countermeasure against Cross-Site Request Forgery (CSRF)?',
    options: [
      'Using GET requests for all state-changing financial transactions',
      'Implementing cryptographically unique, anti-CSRF synchronizer tokens and the `SameSite=Strict` cookie attribute',
      'Disabling password complexity requirements',
      'Allowing wildcards in `Access-Control-Allow-Origin: *` headers'
    ],
    correctAnswer: 1,
    explanation: 'Anti-CSRF tokens are unpredictable values verified by the server on state-changing requests (POST/PUT). Paired with `SameSite=Strict` or `Lax`, browsers will not attach session cookies on cross-origin requests.',
    tags: ['CSRF', 'Web Security', 'Defense']
  },
  {
    id: 'q-eh-9',
    category: 'Ethical Hacking',
    difficulty: 'Hard',
    question: 'What is an "Insecure Direct Object Reference" (IDOR)?',
    options: [
      'When an application exposes a reference to an internal object (e.g. `GET /invoice/49102`) without validating whether the requesting user is authorized to access that object',
      'When an API uses JSON instead of XML format for serialized responses',
      'When a database uses 32-bit integer keys instead of UUIDs',
      'When a network router forwards packets without checking Ethernet checksums'
    ],
    correctAnswer: 0,
    explanation: 'IDOR occurs when an application exposes a direct database key or filename in the request parameter, and fails to check user ownership. An authenticated user changes `id=1001` to `id=1002` and reads another victim’s data.',
    tags: ['IDOR', 'Access Control', 'API Security']
  },
  {
    id: 'q-eh-10',
    category: 'Ethical Hacking',
    difficulty: 'Easy',
    question: 'What does CVE stand for in vulnerability management and cybersecurity research?',
    options: [
      'Common Vulnerabilities and Exposures',
      'Central Virtual Environment',
      'Certified Vector Encryption',
      'Corporate Verification Entity'
    ],
    correctAnswer: 0,
    explanation: 'CVE (Common Vulnerabilities and Exposures) is a publicly disclosed catalog of standardized identifiers for cybersecurity vulnerabilities, maintained by MITRE and sponsored by CISA.',
    tags: ['CVE', 'Vulnerability Management', 'Standards']
  },

  // ==========================================
  // 5. OSINT (OPEN SOURCE INTELLIGENCE) (10 Questions)
  // ==========================================
  {
    id: 'q-os-1',
    category: 'OSINT',
    difficulty: 'Easy',
    question: 'What is the primary definition of Open Source Intelligence (OSINT)?',
    options: [
      'Illegally intercepting confidential military radio frequencies',
      'Collecting, analyzing, and synthesizing intelligence gathered from publicly accessible sources without unauthorized network intrusion',
      'Reverse-engineering proprietary software using cracked disassemblers',
      'Installing spyware implants on target mobile phones'
    ],
    correctAnswer: 1,
    explanation: 'OSINT involves gathering data strictly from overt, publicly available sources (websites, public records, academic papers, commercial satellite imagery, social platforms) and transforming it into actionable intelligence.',
    tags: ['OSINT', 'Reconnaissance', 'Intelligence']
  },
  {
    id: 'q-os-2',
    category: 'OSINT',
    difficulty: 'Medium',
    question: 'Which tool/search engine indexes internet-connected devices, industrial control systems (ICS), webcams, and open server ports across the IPv4 space?',
    options: [
      'Google Chrome',
      'Shodan',
      'VLC Media Player',
      'Apache Tomcat'
    ],
    correctAnswer: 1,
    explanation: 'Shodan continually port-scans the global IP space and indexes the banners returned by servers, IoT devices, cameras, and ICS/SCADA controllers, making it an essential passive reconnaissance tool.',
    tags: ['Shodan', 'IoT', 'Infrastructure']
  },
  {
    id: 'q-os-3',
    category: 'OSINT',
    difficulty: 'Medium',
    question: 'What forensic metadata embedded within digital smartphone photos can reveal the exact GPS coordinates and device hardware model where an image was taken?',
    options: [
      'CSS stylesheets',
      'EXIF (Exchangeable Image File Format) metadata',
      'RAM paging swap file',
      'DNS MX records'
    ],
    correctAnswer: 1,
    explanation: 'EXIF metadata records technical camera parameters: aperture, shutter speed, camera/phone make and model, timestamp, and frequently exact latitude/longitude coordinates if location services were enabled.',
    tags: ['EXIF', 'Geolocation', 'Metadata']
  },
  {
    id: 'q-os-4',
    category: 'OSINT',
    difficulty: 'Hard',
    question: 'How do investigators utilize Certificate Transparency (CT) logs (e.g. crt.sh) during cyber investigations?',
    options: [
      'To decrypt all SSL traffic going to Google servers',
      'To discover hidden subdomains, staging servers, and infrastructure history registered by an organization or phishing actor',
      'To wipe forensic disk images remotely',
      'To forge valid TLS certificates for penetration tests'
    ],
    correctAnswer: 1,
    explanation: 'Certificate Transparency requires CAs to publicly log every TLS certificate issued. Querying CT search engines like crt.sh reveals subdomains (e.g., `vpn.target.com`, `dev.target.com`) that would otherwise remain unlisted.',
    tags: ['Certificate Transparency', 'Reconnaissance', 'Subdomain Enumeration']
  },
  {
    id: 'q-os-5',
    category: 'OSINT',
    difficulty: 'Easy',
    question: 'What Google Dork operator restricts search results strictly to PDF documents hosted on a target domain?',
    options: [
      'site:target.com filetype:pdf',
      'target.com +intext:adobe',
      'search:target.com -format=binary',
      'locate target.com /all-pdf'
    ],
    correctAnswer: 0,
    explanation: 'The `site:` operator scopes the query to a domain, and `filetype:pdf` (or `ext:pdf`) filters results to PDF files, often uncovering leaked internal manuals, employee rosters, or financial disclosures.',
    tags: ['Google Dorking', 'Search', 'Information Gathering']
  },
  {
    id: 'q-os-6',
    category: 'OSINT',
    difficulty: 'Medium',
    question: 'In cryptocurrency forensic investigations, why are public blockchain explorers (e.g. Etherscan, Blockchain.com) powerful OSINT tools?',
    options: [
      'Because they reveal the real-world home address and passport number of any wallet owner instantly',
      'Because public blockchains maintain an immutable, publicly transparent ledger of every transaction, address, timestamp, and fund transfer history',
      'Because they can reverse fraudulent transactions and return stolen funds with a single click',
      'Because they generate fake cryptocurrency tokens on demand'
    ],
    correctAnswer: 1,
    explanation: 'Blockchains like Bitcoin and Ethereum are pseudonymous, not anonymous. Every transaction is permanently recorded and publicly auditable, allowing investigators to trace money flows from victim to cash-out exchanges.',
    tags: ['Blockchain', 'Crypto Forensics', 'Financial OSINT']
  },
  {
    id: 'q-os-7',
    category: 'OSINT',
    difficulty: 'Hard',
    question: 'What is the primary risk of Operational Security (OPSEC) failure when an investigator browses a suspect’s profile directly using their personal account?',
    options: [
      'The investigator’s computer monitor will experience burn-in',
      'The target platform may alert the suspect via "profile view" notifications, track the investigator’s IP address, or tip off the adversary to burn infrastructure',
      'The target will automatically gain administrative access to police databases',
      'The browser will delete all bookmark files'
    ],
    correctAnswer: 1,
    explanation: 'Proper OPSEC requires "sock puppets" (non-attributable burner accounts), VPN/Tor routing, and isolated VMs. Browsing directly can leak the investigator’s identity, agency IP, or alert the suspect that they are being investigated.',
    tags: ['OPSEC', 'Tradecraft', 'Investigator Safety']
  },
  {
    id: 'q-os-8',
    category: 'OSINT',
    difficulty: 'Medium',
    question: 'Which tool allows visual link analysis and knowledge-graph mapping of people, domain names, IP addresses, companies, and phone numbers in investigations?',
    options: [
      'Wireshark',
      'Maltego',
      'Notepad++',
      'Postman'
    ],
    correctAnswer: 1,
    explanation: 'Maltego is a premier link-analysis and graph visualization tool that uses "transforms" to pivot from one entity (e.g. an email) to related entities (domains, social profiles, netblocks, geographic locations).',
    tags: ['Maltego', 'Link Analysis', 'Graph OSINT']
  },
  {
    id: 'q-os-9',
    category: 'OSINT',
    difficulty: 'Easy',
    question: 'What does the WHOIS protocol query in internet infrastructure investigations?',
    options: [
      'The current real-time GPS location of a web browser',
      'Registered domain name details, including registrar, registration creation date, expiration date, and contact nameservers',
      'The encrypted passwords of email users',
      'The credit balance of an e-commerce merchant'
    ],
    correctAnswer: 1,
    explanation: 'WHOIS is a standardized query and response protocol that provides registration data for domain names and autonomous system numbers (ASNs), indicating who controls or hosts internet infrastructure.',
    tags: ['WHOIS', 'DNS', 'Domains']
  },
  {
    id: 'q-os-10',
    category: 'OSINT',
    difficulty: 'Hard',
    question: 'What is "Passive DNS" (pDNS) and why is it invaluable for threat hunting?',
    options: [
      'A DNS server that refuses to answer incoming queries',
      'A historical database of captured DNS queries and resolution mappings over time, enabling investigators to see past IP addresses tied to a domain before the attacker changed them',
      'A technique to encrypt DNS using hardware security modules',
      'A tool for generating random domain names'
    ],
    correctAnswer: 1,
    explanation: 'Passive DNS sensors log DNS responses observed on the internet. Even if a cybercriminal changes a domain’s IP address today, pDNS allows investigators to review where that domain pointed 6 months ago.',
    tags: ['Passive DNS', 'Threat Hunting', 'Forensics']
  },

  // ==========================================
  // 6. CRIMINAL INVESTIGATION & LAW (10 Questions)
  // ==========================================
  {
    id: 'q-ci-1',
    category: 'Criminal Investigation',
    difficulty: 'Easy',
    question: 'What is "Locard’s Exchange Principle" in forensic science?',
    options: [
      'Every transaction in banking must be double-entered into a balance ledger',
      'Every contact leaves a trace—the perpetrator of a crime will bring something into the crime scene and leave with something from it',
      'Evidence is only valid if analyzed within 24 hours of seizure',
      'All suspects are considered guilty until cleared by polygraph'
    ],
    correctAnswer: 1,
    explanation: 'Dr. Edmond Locard formulated the foundational forensic principle: "Every contact leaves a trace." In cyberspace, this applies equally to digital artifacts: network packets, MAC addresses, log entries, and registry keys.',
    tags: ['Locard Principle', 'Forensic Science', 'Fundamentals']
  },
  {
    id: 'q-ci-2',
    category: 'Criminal Investigation',
    difficulty: 'Medium',
    question: 'What is a "Money Mule" in financial cybercrime networks?',
    options: [
      'A physical armored vehicle transporting gold between vault reserves',
      'An individual whose bank account is utilized by fraudsters to receive and rapidly transfer illegally acquired funds to obfuscate the money trail',
      'An automated high-frequency trading bot designed to trade equities',
      'A hardware token generating one-time passcodes'
    ],
    correctAnswer: 1,
    explanation: 'Money mules (often unwitting victims of fake job scams or deliberate accomplices) lend their bank accounts to fraudsters to layer and disperse stolen funds across diverse accounts, breaking the chain of transaction origin.',
    tags: ['Money Mule', 'Financial Crime', 'Fraud']
  },
  {
    id: 'q-ci-3',
    category: 'Criminal Investigation',
    difficulty: 'Medium',
    question: 'What does "Corpus Delicti" mean in criminal jurisprudence?',
    options: [
      'The body of the crime—concrete proof that an unlawful act actually occurred prior to convicting an individual of having committed it',
      'The psychological profile of an anonymous cybercriminal',
      'A mandatory subpoena compelling tech companies to surrender source code',
      'The diplomatic treaty governing international maritime extradition'
    ],
    correctAnswer: 0,
    explanation: 'Corpus Delicti ("body of the crime") requires the prosecution to prove that an actual crime occurred before a person can be convicted. In cybercrime, this means establishing unauthorized breach or damage via technical evidence.',
    tags: ['Jurisprudence', 'Evidence Law', 'Legal']
  },
  {
    id: 'q-ci-4',
    category: 'Criminal Investigation',
    difficulty: 'Hard',
    question: 'Under international standards (such as the Budapest Convention on Cybercrime), what mechanism enables emergency preservation of digital evidence stored on foreign servers?',
    options: [
      'Expedited Preservation of Stored Computer Data order',
      'Unilateral military drone interception of fiber optic undersea cables',
      'Immediate physical confiscation of foreign data centers without warrant',
      'Bypassing international court treaties via zero-day ransomware'
    ],
    correctAnswer: 0,
    explanation: 'The Budapest Convention provides for expedited preservation orders, legally requiring a service provider in a signatory nation to immediately preserve stored volatile data (e.g. server logs) for up to 90 days while formal MLAT requests process.',
    tags: ['Budapest Convention', 'MLAT', 'International Law']
  },
  {
    id: 'q-ci-5',
    category: 'Criminal Investigation',
    difficulty: 'Easy',
    question: 'What constitutes "Spear Phishing" as opposed to standard mass phishing?',
    options: [
      'Sending generic spam emails to ten million random email addresses',
      'A tailored, targeted fraudulent communication directed at a specific individual or organization containing personalized intelligence to maximize credibility',
      'Physically stealing laptop bags from corporate airport lounges',
      'Flooding network routers with ICMP packets'
    ],
    correctAnswer: 1,
    explanation: 'Spear phishing targets specific high-value individuals (e.g. finance executives) with customized lures referencing real projects, vendors, or colleagues, making it significantly more deceptive than broadcast spam.',
    tags: ['Phishing', 'Social Engineering', 'Threat Vectors']
  },
  {
    id: 'q-ci-6',
    category: 'Criminal Investigation',
    difficulty: 'Medium',
    question: 'What is the primary role of a "First Responder" at a physical cybercrime scene where computers are actively powered on?',
    options: [
      'Immediately unplug the power cord from the wall to prevent hackers from logging in',
      'Secure the perimeter, prevent unauthorized tampering, photograph the active screen display, assess RAM volatility, and engage specialized forensic examiners',
      'Format all connected thumb drives to inspect their storage capacity',
      'Reboot the system into Safe Mode to run third-party commercial antivirus scans'
    ],
    correctAnswer: 1,
    explanation: 'Immediately pulling the plug destroys volatile RAM containing encryption keys and running malware. The first responder must document the scene, preserve power state if live triage is warranted, and maintain chain-of-custody.',
    tags: ['First Responder', 'Scene Management', 'Triage']
  },
  {
    id: 'q-ci-7',
    category: 'Criminal Investigation',
    difficulty: 'Hard',
    question: 'In financial investigation forensics, what is the three-stage process of "Money Laundering"?',
    options: [
      'Placement, Layering, and Integration',
      'Acquisition, Storage, and Disposal',
      'Verification, Encryption, and Decryption',
      'Input, Processing, and Output'
    ],
    correctAnswer: 0,
    explanation: 'Money laundering follows: 1) Placement (introducing dirty funds into the financial system), 2) Layering (complex series of transactions to obscure the audit trail), 3) Integration (re-entering funds into the legitimate economy).',
    tags: ['Money Laundering', 'Financial Crime', 'AML']
  },
  {
    id: 'q-ci-8',
    category: 'Criminal Investigation',
    difficulty: 'Easy',
    question: 'What is "Synthetic Identity Theft"?',
    options: [
      'Creating a completely fabricated identity by combining real and fake credentials (e.g. a legitimate Social Security Number with a fake name and birth date) to open fraudulent credit accounts',
      'Using a 3D printer to duplicate someone’s physical house keys',
      'Cloning an animal using artificial biological DNA',
      'Wearing an actor’s mask during an in-person robbery'
    ],
    correctAnswer: 0,
    explanation: 'Synthetic identity theft blends legitimate data pieces (often belonging to children or deceased persons) with fictitious information to build brand-new credit profiles that traditional fraud filters struggle to flag.',
    tags: ['Identity Theft', 'Fraud', 'Financial Forensics']
  },
  {
    id: 'q-ci-9',
    category: 'Criminal Investigation',
    difficulty: 'Medium',
    question: 'What is a "Ransomware Initial Access Broker" (IAB) in the cybercriminal underground economy?',
    options: [
      'A law enforcement officer undercover in dark web forums',
      'A threat actor who specializes in breaching corporate networks and then sells that compromised access (VPN credentials, RDP, shells) to ransomware syndicates',
      'An escrow agent ensuring ransom payments are returned to victims',
      'A software developer creating open-source Linux distros'
    ],
    correctAnswer: 1,
    explanation: 'Modern cybercrime is highly specialized. Initial Access Brokers (IABs) do not deploy ransomware themselves; they compromise networks and auction off persistent access on illicit marketplaces to ransomware affiliates.',
    tags: ['Ransomware', 'Threat Actor', 'Cybercrime Ecosystem']
  },
  {
    id: 'q-ci-10',
    category: 'Criminal Investigation',
    difficulty: 'Hard',
    question: 'What is an "Exculpatory Evidence" rule that forensic investigators and prosecutors must uphold during criminal proceedings?',
    options: [
      'The legal requirement to disclose any evidence favorable to the defendant that tends to negate guilt or reduce the severity of the offense (e.g. Brady material in the US)',
      'The rule permitting investigators to withhold digital logs from defense counsel',
      'The requirement that judges must personally execute all forensic code scripts',
      'The regulation forbidding open-source software in government laboratories'
    ],
    correctAnswer: 0,
    explanation: 'Exculpatory evidence is material evidence favorable to the accused. Ethical investigation standards strictly require disclosing findings that indicate the suspect’s innocence or point to alternative suspects.',
    tags: ['Legal Ethics', 'Prosecution', 'Due Process']
  },

  // ==========================================
  // 7. DATA ANALYSIS & ANOMALY DETECTION (10 Questions)
  // ==========================================
  {
    id: 'q-da-1',
    category: 'Data Analysis',
    difficulty: 'Easy',
    question: 'What is Benford’s Law and how is it used in forensic financial audit investigations?',
    options: [
      'A rule stating that computing power doubles every eighteen months',
      'An observation that in naturally occurring numerical datasets, the number 1 appears as the leading first digit approximately 30% of the time, used to detect fabricated invoices or tax fraud',
      'A mathematical proof that all encryption ciphers can be factored in polynomial time',
      'A theorem predicting network bandwidth saturation under DDoS attacks'
    ],
    correctAnswer: 1,
    explanation: 'Benford’s Law dictates the distribution of leading digits in authentic multi-magnitude numerical data. When fraudsters fabricate fake invoice numbers or financial expenses, they tend to violate Benford’s distribution.',
    tags: ['Benfords Law', 'Forensic Accounting', 'Anomaly Detection']
  },
  {
    id: 'q-da-2',
    category: 'Data Analysis',
    difficulty: 'Medium',
    question: 'Which unsupervised learning algorithm isolates anomalies by constructing random decision trees and measuring the path length required to isolate a given data point?',
    options: [
      'Isolation Forest',
      'Linear Regression',
      'K-Nearest Neighbors Classifier',
      'Naive Bayes'
    ],
    correctAnswer: 0,
    explanation: 'Isolation Forest explicitly isolates anomalies rather than profiling normal points. Because anomalies are "few and different," they require fewer random partitioning splits and have significantly shorter path lengths in the trees.',
    tags: ['Isolation Forest', 'Anomaly Detection', 'Unsupervised ML']
  },
  {
    id: 'q-da-3',
    category: 'Data Analysis',
    difficulty: 'Medium',
    question: 'In geospatial crime mapping, what does "KDE" stand for and what is its visual function?',
    options: [
      'Kernel Density Estimation—a non-parametric method to calculate and visualize continuous risk probability density surfaces (heatmaps) from discrete crime points',
      'Key Dynamic Encryption—a standard for securing police radio radios',
      'Kinematic Distance Evaluation—calculating bullet trajectories',
      'K-Means Directory Extraction—backing up map layers'
    ],
    correctAnswer: 0,
    explanation: 'Kernel Density Estimation (KDE) smooths discrete coordinate points into a continuous spatial probability surface, producing the standard hot-spot heatmaps used to allocate police patrol routes.',
    tags: ['KDE', 'Geospatial', 'Crime Mapping']
  },
  {
    id: 'q-da-4',
    category: 'Data Analysis',
    difficulty: 'Hard',
    question: 'In graph data analysis, which centrality metric measures how frequently a specific node lies on the shortest path between all other pairs of nodes in a criminal communications network?',
    options: [
      'Degree Centrality',
      'Betweenness Centrality',
      'Closeness Centrality',
      'Eigenvector Centrality'
    ],
    correctAnswer: 1,
    explanation: 'Betweenness Centrality highlights key brokers or "bridges" in a network. In criminal organizations, kingpins or communication liaisons often exhibit high betweenness even if their raw degree count is low.',
    tags: ['Graph Theory', 'Social Network Analysis', 'Centrality']
  },
  {
    id: 'q-da-5',
    category: 'Data Analysis',
    difficulty: 'Easy',
    question: 'What is the "Z-score" in statistical anomaly detection?',
    options: [
      'The number of standard deviations a given data point lies above or below the mean of the dataset',
      'The speed of a processor running Python scripts',
      'The maximum value of a cryptographic private key',
      'The compression ratio of a zip archive'
    ],
    correctAnswer: 0,
    explanation: 'Z-score measures standard deviations from the mean: $Z = (X - \\mu) / \\sigma$. Points with $|Z| > 3$ are typically flagged as statistical outliers or anomalous transactions.',
    tags: ['Statistics', 'Z-Score', 'Outliers']
  },
  {
    id: 'q-da-6',
    category: 'Data Analysis',
    difficulty: 'Medium',
    question: 'What is the purpose of applying DBSCAN (Density-Based Spatial Clustering of Applications with Noise) in crime analysis?',
    options: [
      'To discover arbitrary-shaped geographic crime clusters while properly identifying and labeling sparse outlier points as noise',
      'To force all crime data points into strictly spherical clusters of equal radius',
      'To predict stock market index valuations',
      'To encrypt GPS coordinates before saving them to disk'
    ],
    correctAnswer: 0,
    explanation: 'Unlike K-Means (which assumes spherical clusters and assigns every point), DBSCAN clusters dense regions of arbitrary shapes and treats isolated scattered crimes as noise/outliers without distorting clusters.',
    tags: ['DBSCAN', 'Clustering', 'Spatial Analytics']
  },
  {
    id: 'q-da-7',
    category: 'Data Analysis',
    difficulty: 'Hard',
    question: 'When evaluating binary fraud classifiers on extreme class-imbalanced data, why is the Area Under the Precision-Recall Curve (PR-AUC) preferred over the ROC-AUC?',
    options: [
      'PR-AUC calculates much faster on 8-bit CPUs',
      'ROC-AUC can provide an overly optimistic illusion of performance because the True Negative count dominates the False Positive Rate denominator in imbalanced settings',
      'PR-AUC ignores false positives entirely',
      'ROC-AUC only works on regression models, not classification'
    ],
    correctAnswer: 1,
    explanation: 'When negatives outnumber positives 10,000 to 1, a large surge in false positives barely shifts the False Positive Rate (FP / TN+FP) in ROC curves. The Precision-Recall curve focuses directly on minority class accuracy.',
    tags: ['Evaluation Metrics', 'PR-AUC', 'Fraud Analytics']
  },
  {
    id: 'q-da-8',
    category: 'Data Analysis',
    difficulty: 'Easy',
    question: 'In exploratory data analysis (EDA), what does a "Correlation Matrix" display?',
    options: [
      'The pairwise correlation coefficients between numerical variables, revealing linear dependencies and multicollinearity',
      'The geographic location of all server data centers',
      'The list of active user passwords in plaintext',
      'The chronological commit history of a Git repository'
    ],
    correctAnswer: 0,
    explanation: 'A correlation matrix computes Pearson or Spearman correlation values (between -1.0 and +1.0) across all pairs of numeric features, helping investigators detect co-varying indicators of crime or fraud.',
    tags: ['EDA', 'Correlation', 'Statistics']
  },
  {
    id: 'q-da-9',
    category: 'Data Analysis',
    difficulty: 'Hard',
    question: 'What is the primary operational utility of a "Sliding Window" aggregation algorithm in real-time payment fraud prevention?',
    options: [
      'To render animated window glass graphics in modern web browsers',
      'To calculate cumulative transaction metrics (e.g., total spend in past 15 minutes, card count in past 1 hour) dynamically as each new event arrives',
      'To automatically close inactive browser tabs after 3 minutes',
      'To defragment hard drive sectors during bank closing hours'
    ],
    correctAnswer: 1,
    explanation: 'Fraud velocity checks require evaluating rolling temporal windows (e.g. how many times was this card swiped in the last 10 minutes?). Streaming sliding windows maintain this state in memory (e.g. via Redis) in real-time.',
    tags: ['Streaming', 'Velocity Checks', 'FinTech']
  },
  {
    id: 'q-da-10',
    category: 'Data Analysis',
    difficulty: 'Medium',
    question: 'What is "Principal Component Analysis" (PCA) commonly utilized for in biometric and forensic data pipelines?',
    options: [
      'Dimensionality reduction—transforming a large set of correlated variables into a smaller set of orthogonal, uncorrelated principal components while preserving maximum variance',
      'Hashing text files using cryptographic salt',
      'Querying relational databases using SQL commands',
      'Detecting physical USB insertions in computer hardware'
    ],
    correctAnswer: 0,
    explanation: 'PCA projects high-dimensional feature spaces (such as facial landmark coordinates or packet header distributions) onto lower-dimensional subspaces, speeding up computation and eliminating collinearity.',
    tags: ['PCA', 'Dimensionality Reduction', 'Data Science']
  },

  // ==========================================
  // 8. SOFTWARE DEVELOPMENT & ENGINEERING (10 Questions)
  // ==========================================
  {
    id: 'q-sd-1',
    category: 'Software Development',
    difficulty: 'Easy',
    question: 'What is the primary benefit of using Docker containerization when developing a crime investigation platform for a hackathon?',
    options: [
      'It eliminates "works on my machine" issues by packaging code, libraries, dependencies, and OS configurations into portable, reproducible runtime images',
      'It automatically writes the frontend React components without human coding',
      'It decrypts proprietary encrypted hard disk images for free',
      'It grants unlimited cloud compute credits without payment'
    ],
    correctAnswer: 0,
    explanation: 'Docker encapsulates the application and its entire runtime environment. Judges and teammates can run the project with a single `docker compose up` command without installing specialized native libraries.',
    tags: ['Docker', 'DevOps', 'Containers']
  },
  {
    id: 'q-sd-2',
    category: 'Software Development',
    difficulty: 'Medium',
    question: 'In modern web architecture, why are WebSockets preferred over standard HTTP polling for live CCTV alerts and real-time cyber telemetry?',
    options: [
      'WebSockets use larger packet headers to convey extra metadata',
      'WebSockets maintain a persistent, bidirectional, full-duplex TCP connection, allowing the server to push instantaneous alerts with minimal overhead and latency',
      'WebSockets automatically encrypt all data with quantum ciphers',
      'WebSockets do not require any server-side code'
    ],
    correctAnswer: 1,
    explanation: 'HTTP polling repeatedly establishes new connections asking "is there new data?", wasting bandwidth and introducing polling latency. WebSockets keep a persistent duplex channel open for instant real-time event broadcasting.',
    tags: ['WebSockets', 'Real-Time', 'Networking']
  },
  {
    id: 'q-sd-3',
    category: 'Software Development',
    difficulty: 'Hard',
    question: 'What is the "Circuit Breaker" pattern in distributed systems design, such as an emergency crime alert notification dispatch pipeline?',
    options: [
      'A physical safety switch that cuts wall electricity to computer towers',
      'A software design pattern that detects system failures and wraps requests to prevent an unresponsive downstream service from causing cascading catastrophic failures across the entire cluster',
      'A compiler optimization that converts recursion into iterative loops',
      'A method to intentionally crash competing applications on the same server'
    ],
    correctAnswer: 1,
    explanation: 'When an external service (e.g. SMS dispatch gateway) becomes unresponsive, a Circuit Breaker trips to "Open" state, failing fast or falling back immediately instead of tying up server worker threads and crashing the system.',
    tags: ['Architecture', 'Resilience', 'Distributed Systems']
  },
  {
    id: 'q-sd-4',
    category: 'Software Development',
    difficulty: 'Easy',
    question: 'What does the Git command `git merge --abort` do during a software collaboration conflict?',
    options: [
      'It permanently wipes the local Git repository and deletes all code files',
      'It safely stops the current merge operation and restores the working tree back to the pre-merge state',
      'It forces all conflicting code lines into production immediately',
      'It creates a new GitHub account'
    ],
    correctAnswer: 1,
    explanation: 'If a merge encounters complex conflicts or mistakes, `git merge --abort` unwinds the merge process and safely returns the branch to the exact commit state it held before `git merge` was invoked.',
    tags: ['Git', 'Version Control', 'Engineering']
  },
  {
    id: 'q-sd-5',
    category: 'Software Development',
    difficulty: 'Medium',
    question: 'What is the purpose of an API Gateway in microservices architecture for a law enforcement dashboard?',
    options: [
      'To provide a single entry point that handles routing, rate limiting, authentication, SSL termination, and request aggregation for underlying backend services',
      'To store video files in physical tape archives',
      'To replace all backend databases with static JSON files',
      'To monitor employee keyboard typing speed'
    ],
    correctAnswer: 0,
    explanation: 'An API Gateway acts as a reverse proxy, decoupling client frontends from backend microservices and centralizing cross-cutting concerns like token validation, rate-limiting, and request routing.',
    tags: ['API Gateway', 'Microservices', 'Architecture']
  },
  {
    id: 'q-sd-6',
    category: 'Software Development',
    difficulty: 'Hard',
    question: 'In asynchronous event-driven pipelines (e.g. Kafka or RabbitMQ), what does "Idempotency" mean for a transaction consumer?',
    options: [
      'The consumer will crash if it receives more than 100 messages per second',
      'Executing the same operation or event message multiple times produces the exact same system state and outcome as executing it once, preventing duplicate charges or alerts',
      'The consumer only processes messages during daytime hours',
      'The consumer encrypts its own source code on startup'
    ],
    correctAnswer: 1,
    explanation: 'In distributed networks, messages can be redelivered. An idempotent consumer (e.g. checking if a transaction ID was already settled before deducting funds) guarantees consistency despite at-least-once delivery.',
    tags: ['Distributed Systems', 'Idempotency', 'Kafka']
  },
  {
    id: 'q-sd-7',
    category: 'Software Development',
    difficulty: 'Easy',
    question: 'What is the primary role of a "Linter" (e.g. ESLint, Flake8) in software engineering?',
    options: [
      'To analyze source code statically for programmatic bugs, syntax errors, style violations, and suspicious anti-patterns before execution',
      'To compress compiled binaries into smaller file sizes',
      'To deploy web applications to cloud servers',
      'To benchmark the battery consumption of mobile apps'
    ],
    correctAnswer: 0,
    explanation: 'Linters analyze code without executing it, flagging potential errors (undefined variables, unused imports, logic flaws) and enforcing clean, consistent formatting standards across development teams.',
    tags: ['Code Quality', 'Linting', 'Dev Tools']
  },
  {
    id: 'q-sd-8',
    category: 'Software Development',
    difficulty: 'Medium',
    question: 'Why should sensitive secrets (such as API keys and database credentials) be managed via Environment Variables rather than committed to source code repositories?',
    options: [
      'Because environment variables automatically double the execution speed of Python scripts',
      'To prevent accidental credential leaks in public or shared version control repositories and adhere to 12-Factor App configuration methodology',
      'Because Git repositories reject any file containing capital letters',
      'Because cloud servers cannot read files on disk'
    ],
    correctAnswer: 1,
    explanation: 'Hardcoding secrets into Git repositories exposes them to anyone with repository access and makes credential rotation hazardous. Environment variables separate code from deployment-specific configuration.',
    tags: ['AppSec', '12-Factor', 'Configuration']
  },
  {
    id: 'q-sd-9',
    category: 'Software Development',
    difficulty: 'Hard',
    question: 'What is the difference between gRPC and RESTful JSON APIs in high-performance forensic backend systems?',
    options: [
      'gRPC uses Protocol Buffers over HTTP/2 providing strict typing, binary serialization, and streaming capabilities with lower network overhead than text-based JSON over HTTP/1.1',
      'REST APIs are written only in C++ while gRPC is written only in HTML',
      'gRPC cannot be used on server computers',
      'RESTful JSON APIs do not support any HTTP methods'
    ],
    correctAnswer: 0,
    explanation: 'gRPC leverages HTTP/2 multiplexing and compact binary Protocol Buffers serialization, making it significantly faster and more bandwidth-efficient than verbose text-based JSON REST payloads.',
    tags: ['gRPC', 'Protobuf', 'API Design']
  },
  {
    id: 'q-sd-10',
    category: 'Software Development',
    difficulty: 'Easy',
    question: 'What is the purpose of unit testing in a mission-critical crime investigation application?',
    options: [
      'To verify that individual modular components, functions, or procedures behave as expected in isolation against predefined inputs and assertions',
      'To test how many users can connect to the server at the same time',
      'To check whether the company logo looks good on smartphone screens',
      'To write marketing copy for the product launch'
    ],
    correctAnswer: 0,
    explanation: 'Unit tests validate the smallest testable parts of an application (e.g. checking whether a hash calculation or date parser returns exact expected results), preventing regressions as features evolve.',
    tags: ['Testing', 'Quality Assurance', 'Engineering']
  },

  // ==========================================
  // 9. DATABASE MANAGEMENT (10 Questions)
  // ==========================================
  {
    id: 'q-db-1',
    category: 'Database Management',
    difficulty: 'Easy',
    question: 'What does the acronym ACID represent in relational database transaction management?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Authentication, Cryptography, Integrity, Decryption',
      'Allocation, Clustering, Indexing, Defragmentation',
      'Authorization, Control, Identification, Delegation'
    ],
    correctAnswer: 0,
    explanation: 'ACID guarantees that database transactions are processed reliably: Atomicity (all-or-nothing), Consistency (rules/constraints upheld), Isolation (concurrent transactions don\'t interfere), and Durability (committed changes persist).',
    tags: ['ACID', 'RDBMS', 'Transactions']
  },
  {
    id: 'q-db-2',
    category: 'Database Management',
    difficulty: 'Medium',
    question: 'Why are Graph Databases (like Neo4j) significantly more efficient than standard Relational SQL databases for tracing money laundering and criminal syndicate syndicates?',
    options: [
      'Graph databases store data only on USB thumb drives',
      'Graph databases treat relationships as first-class citizens, enabling constant-time pointer index-free adjacency traversals instead of expensive, recursive multi-table SQL JOIN operations',
      'Graph databases do not require any disk storage space',
      'Graph databases are immune to all hardware hardware power outages'
    ],
    correctAnswer: 1,
    explanation: 'In relational databases, querying 5 or 6 hops of relationships (A sent to B who sent to C who sent to D) requires multiple costly recursive JOINs. Graph databases navigate connected memory pointers directly.',
    tags: ['Graph Databases', 'Neo4j', 'Network Traversal']
  },
  {
    id: 'q-db-3',
    category: 'Database Management',
    difficulty: 'Hard',
    question: 'What is the difference between a B-Tree index and a GIST/R-Tree index when querying geospatial crime coordinates in PostgreSQL (PostGIS)?',
    options: [
      'B-Tree indexes are optimized for 1D scalar orderable data (e.g. timestamps, IDs), whereas R-Tree / GIST indexes partition multi-dimensional spatial bounding boxes to accelerate 2D/3D polygon and distance queries',
      'GIST indexes can only be used on text strings, not numbers',
      'B-Tree indexes delete the underlying table data after 30 days',
      'There is no technical difference between them'
    ],
    correctAnswer: 0,
    explanation: 'Standard B-Trees order scalar numbers in 1D. Geospatial coordinates have two dimensions (lat/long); R-Trees and GiST group spatial bounding boxes hierarchically, allowing rapid spatial lookups like `ST_DWithin` in PostGIS.',
    tags: ['PostGIS', 'Spatial Indexing', 'PostgreSQL']
  },
  {
    id: 'q-db-4',
    category: 'Database Management',
    difficulty: 'Medium',
    question: 'What is a "Deadlock" in concurrent database transaction processing?',
    options: [
      'When the hard drive storage capacity reaches exactly 100%',
      'A condition where two or more transactions are permanently blocked because each holds a lock on a resource that the other requires to proceed',
      'When an admin forgets their database root password',
      'When a network cable is disconnected from the database server'
    ],
    correctAnswer: 1,
    explanation: 'Deadlock happens when Transaction A locks Row 1 and waits for Row 2, while Transaction B locks Row 2 and waits for Row 1. Database engines detect cyclic waits and abort one transaction to break the cycle.',
    tags: ['Concurrency', 'Locks', 'Transactions']
  },
  {
    id: 'q-db-5',
    category: 'Database Management',
    difficulty: 'Easy',
    question: 'Which SQL clause is used to filter aggregated data resulting from a `GROUP BY` statement?',
    options: [
      'WHERE',
      'HAVING',
      'FILTER',
      'ORDER BY'
    ],
    correctAnswer: 1,
    explanation: '`WHERE` filters individual rows before grouping takes place. `HAVING` filters the summarized groups after the `GROUP BY` aggregation has been computed.',
    tags: ['SQL', 'Aggregations', 'Queries']
  },
  {
    id: 'q-db-6',
    category: 'Database Management',
    difficulty: 'Medium',
    question: 'What is the primary function of Database Sharding in high-volume crime telemetry logging systems?',
    options: [
      'Horizontally partitioning a database dataset across multiple independent database server instances to distribute write load and storage capacity',
      'Converting all stored numbers into Roman numerals',
      'Encrypting each individual letter in a text column with a separate key',
      'Backing up database tables to optical discs'
    ],
    correctAnswer: 0,
    explanation: 'Sharding splits a massive dataset (e.g. billions of network log rows) across multiple machines based on a shard key (like customer ID or hash range), allowing horizontal scaling beyond single-server hardware limits.',
    tags: ['Sharding', 'Scalability', 'Big Data']
  },
  {
    id: 'q-db-7',
    category: 'Database Management',
    difficulty: 'Hard',
    question: 'What does the Write-Ahead Logging (WAL) mechanism ensure in modern databases like PostgreSQL and SQLite?',
    options: [
      'It ensures changes are written to persistent sequential log storage before they are applied to the main database data pages, guaranteeing crash recovery and atomicity',
      'It prevents users from executing SELECT queries during nighttime hours',
      'It logs all employee chat messages to human resources',
      'It automatically translates SQL queries into English language sentences'
    ],
    correctAnswer: 0,
    explanation: 'WAL records transaction modifications sequentially to disk first. If power fails or the server crashes while dirty pages are in memory, the engine replays the WAL on restart to recover full consistency.',
    tags: ['WAL', 'Durability', 'PostgreSQL']
  },
  {
    id: 'q-db-8',
    category: 'Database Management',
    difficulty: 'Easy',
    question: 'What type of database is Redis primarily classified as?',
    options: [
      'Relational SQL table database',
      'In-memory key-value data structure store',
      'Graph database for social networks',
      'Columnar data warehouse for OLAP cubes'
    ],
    correctAnswer: 1,
    explanation: 'Redis is an open-source, in-memory data store used as a database, cache, streaming engine, and message broker, delivering sub-millisecond responses ideal for fraud velocity counters.',
    tags: ['Redis', 'Caching', 'In-Memory']
  },
  {
    id: 'q-db-9',
    category: 'Database Management',
    difficulty: 'Medium',
    question: 'What is the primary architectural purpose of "Database Read Replicas"?',
    options: [
      'To offload read-heavy query traffic (e.g. reporting dashboards, analytics) from the primary write master node, improving overall system throughput and reliability',
      'To create duplicate records intentionally in the same table',
      'To test destructive SQL DROP TABLE queries on production data',
      'To bypass user authentication checks'
    ],
    correctAnswer: 0,
    explanation: 'Read replicas asynchronously replicate data from the primary master database. High-volume read queries (e.g. dashboards) run against replicas, keeping the primary node unburdened for critical transactional writes.',
    tags: ['Replication', 'High Availability', 'Architecture']
  },
  {
    id: 'q-db-10',
    category: 'Database Management',
    difficulty: 'Hard',
    question: 'In Vector Databases (such as Milvus, Pinecone, or ChromaDB), what does the HNSW (Hierarchical Navigable Small World) algorithm do?',
    options: [
      'It constructs multi-layer proximity graphs to enable approximate nearest neighbor (ANN) vector search in logarithmic time complexity',
      'It compresses relational tables into ZIP archives',
      'It sorts text alphabetically using Unicode collation rules',
      'It generates synthetic test credit card numbers'
    ],
    correctAnswer: 0,
    explanation: 'HNSW is a graph-based indexing algorithm for vector similarity search. By building layered graphs where upper layers skip long distances and lower layers refine local neighborhoods, it finds top-k nearest vectors in sub-millisecond times.',
    tags: ['Vector DB', 'HNSW', 'ANN Search']
  },

  // ==========================================
  // 10. GENERAL HACKATHON & PRESENTATION STRATEGY (10 Questions)
  // ==========================================
  {
    id: 'q-gh-1',
    category: 'General Hackathon Questions',
    difficulty: 'Easy',
    question: 'What is the golden rule for allocating time during a 24-hour or 36-hour hackathon project build?',
    options: [
      'Spend 95% of the time writing code and prepare the pitch presentation 5 minutes before judging begins',
      'Build a focused Minimum Viable Product (MVP) with 1–2 killer features, leaving ample time (2–3 hours) for end-to-end testing, demo script rehearsing, and slide preparation',
      'Attempt to build an entire operating system from scratch',
      'Avoid testing the demo until you are standing directly in front of the judges'
    ],
    correctAnswer: 1,
    explanation: 'Hackathons are won by functional, demonstrable value and clear communication, not sprawling unfinished feature lists. An end-to-end working MVP with rehearsed storytelling beats a broken prototype every time.',
    tags: ['Hackathon Strategy', 'MVP', 'Time Management']
  },
  {
    id: 'q-gh-2',
    category: 'General Hackathon Questions',
    difficulty: 'Medium',
    question: 'When presenting an AI crime investigation solution to a judging panel, how should you address model accuracy?',
    options: [
      'Claim the model is 100% accurate with zero mistakes or errors under any circumstance',
      'State objective benchmark metrics (Precision, Recall, F1-Score), define the test dataset, explain failure modes, and demonstrate human-in-the-loop review safeguards for high-stakes decisions',
      'Say that accuracy cannot be measured because AI is unpredictable',
      'Change the subject whenever a judge asks about accuracy'
    ],
    correctAnswer: 1,
    explanation: 'Judges immediately spot false claims of "100% accuracy" as novice bluffing. Professional engineering requires knowing your false positive rate, how you mitigate bias, and how humans verify edge cases.',
    tags: ['Judging', 'AI Ethics', 'Pitch Defense']
  },
  {
    id: 'q-gh-3',
    category: 'General Hackathon Questions',
    difficulty: 'Medium',
    question: 'What is the best contingency backup plan for the live demonstration portion of a hackathon pitch?',
    options: [
      'Rely exclusively on live conference Wi-Fi and live third-party cloud APIs during the stage presentation',
      'Have a local offline fallback environment, a pre-recorded high-resolution screen-capture video of the working workflow, and static slides showcasing the results',
      'If the demo crashes, immediately blame the hackathon venue organizers and stop speaking',
      'Cancel the presentation if the internet connection is slower than 100 Mbps'
    ],
    correctAnswer: 1,
    explanation: 'Conference Wi-Fi notorious drops or congests during finals. Having a pre-recorded 60-second screen-capture video ensures that even if live connectivity fails, your pitch proceeds smoothly without panic.',
    tags: ['Demo Strategy', 'Presentation', 'Risk Management']
  },
  {
    id: 'q-gh-4',
    category: 'General Hackathon Questions',
    difficulty: 'Easy',
    question: 'What should be the primary focus of the first 30 seconds (the "Hook") of your hackathon pitch?',
    options: [
      'Reciting every team member’s complete academic resume and high school achievements',
      'Clearly stating the acute real-world crime problem, who suffers from it, the cost of current failures, and your compelling solution value proposition',
      'Showing a complex terminal bash script installing Python packages',
      'Reading the text of the hackathon rulebook verbatim'
    ],
    correctAnswer: 1,
    explanation: 'Judges listen to dozens of pitches. A crisp hook that establishes the visceral problem and economic or human impact in the first 30 seconds instantly captures judge attention and sets up your solution.',
    tags: ['Pitch Hook', 'Storytelling', 'Presentation']
  },
  {
    id: 'q-gh-5',
    category: 'General Hackathon Questions',
    difficulty: 'Hard',
    question: 'When a judge asks: "How does your project scale from a college prototype to a metropolitan police department handling 100,000 events daily?", how should you structure your answer?',
    options: [
      'Say you will simply purchase a bigger laptop',
      'Outline an architectural transition: stateless microservices, message queues (Kafka) for ingest buffer, distributed storage (S3/PostGIS), caching (Redis), and horizontal autoscaling pods on Kubernetes',
      'Dismiss the question by asserting that 100,000 events never happens in real life',
      'State that scaling is someone else’s problem'
    ],
    correctAnswer: 1,
    explanation: 'Judges assess architectural depth. Demonstrating that you understand decoupling ingest from processing, horizontal scaling, buffering burst loads with message brokers, and database indexing proves engineering maturity.',
    tags: ['Scalability', 'System Design', 'Viva Defense']
  },
  {
    id: 'q-gh-6',
    category: 'General Hackathon Questions',
    difficulty: 'Medium',
    question: 'What is a "Minimum Viable Product" (MVP) in the context of a software competition?',
    options: [
      'A non-functional Figma design with zero working code or interactions',
      'The version of a new product which allows a team to demonstrate real core end-to-end functionality with the least amount of engineering effort',
      'A software package containing all 50 planned future features regardless of stability',
      'A printed PDF brochure'
    ],
    correctAnswer: 1,
    explanation: 'An MVP is not a mock; it is a lean, working product that proves the core hypothesis or technology. It solves the primary problem end-to-end without being bogged down by peripheral bells and whistles.',
    tags: ['MVP', 'Product Management', 'Hackathon Strategy']
  },
  {
    id: 'q-gh-7',
    category: 'General Hackathon Questions',
    difficulty: 'Easy',
    question: 'Why is it critical to clearly identify the "Target User" of your Crimeathon solution during your presentation?',
    options: [
      'Because software cannot be written without knowing the user’s blood type',
      'Because forensic analysts, patrol officers, cyber compliance officers, and judicial prosecutors have completely different workflows, access levels, and UI requirements',
      'Because judges will deduct points if you have more than one user persona in your slide deck',
      'Target users do not matter in hackathons'
    ],
    correctAnswer: 1,
    explanation: 'A product designed for "everyone" serves no one effectively. A patrol officer in a vehicle needs rapid 1-touch high-contrast alerts; a forensic lab examiner needs deep hex inspection and chain-of-custody logs.',
    tags: ['User Persona', 'Product Design', 'Target Audience']
  },
  {
    id: 'q-gh-8',
    category: 'General Hackathon Questions',
    difficulty: 'Hard',
    question: 'When asked about the "Ethical and Legal Implications" of an AI crime prediction tool, what answer demonstrates mature engineering responsibility?',
    options: [
      'Deny that algorithms can ever have ethical issues or biases',
      'Discuss data governance, demographic parity audits, protection of civil liberties, non-punitive proactive interventions, and strict compliance with national privacy and evidentiary statutes',
      'Say that technology should move fast and ignore legal regulations',
      'Claim that your code is exempt from all laws because it is open source'
    ],
    correctAnswer: 1,
    explanation: 'Judges in crime technology hackathons scrutinize civil liberties and potential bias. Showing proactive safeguards, fairness metrics, auditability, and legal alignment signals a trustworthy, viable project.',
    tags: ['AI Ethics', 'Legal Compliance', 'Governance']
  },
  {
    id: 'q-gh-9',
    category: 'General Hackathon Questions',
    difficulty: 'Medium',
    question: 'In a 5-minute hackathon pitch with 2 minutes of Q&A, what is the ideal slide and timing breakdown?',
    options: [
      '30 slides, spending 10 seconds per slide',
      '6–8 slides: Problem (1 min), Proposed Solution & Architecture (1 min), Live Working Demo (2 min), Tech Stack & Future Roadmap (1 min), leaving 2 min for Q&A',
      '0 slides, spending 5 minutes debugging code in VS Code',
      'Spending all 5 minutes on the team introduction'
    ],
    correctAnswer: 1,
    explanation: 'A concise deck of 6–8 slides keeps momentum high. Giving the live working demo 40% of the total pitch time proves you actually built what you promised, leaving crisp time for Q&A.',
    tags: ['Pitch Deck', 'Timing', 'Presentation Format']
  },
  {
    id: 'q-gh-10',
    category: 'General Hackathon Questions',
    difficulty: 'Easy',
    question: 'What is the most effective approach when a judge asks a technical question you genuinely do not know the answer to?',
    options: [
      'Invent a fake technical buzzword and try to deceive the judge',
      'Acknowledge the question candidly, explain your current engineering hypothesis, and state how you would validate or research the solution during the next development phase',
      'Argue with the judge and say their question is invalid',
      'Remain completely silent and look at the floor'
    ],
    correctAnswer: 1,
    explanation: 'Judges respect honesty, intellectual humility, and problem-solving reasoning. Bluffs destroy credibility instantly. Thoughtfully articulating how you would approach solving the unknown demonstrates maturity.',
    tags: ['Q&A Strategy', 'Viva Defense', 'Professionalism']
  }
];
