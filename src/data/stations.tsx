import type { ReactNode } from "react";
import { useState } from "react";

export type Station = {
  name: string;
  freq: number;
  render: () => ReactNode;
  secret?: boolean;
};

type FeaturedProject = {
  name: string;
  desc: string;
  link: string;
  note?: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    name: "mini-redis",
    desc: "Redis-inspired key-value store built from raw TCP sockets, with WAL, LRU/LFU eviction, and a custom wire protocol.",
    link: "https://github.com/vishnupriya-cheemalamarri/mini-redis",
  },
  {
    name: "Real-Time Collaborative Spreadsheet",
    desc: "Real-time collaborative spreadsheet with sub-100ms sync, a custom formula parser, and a 200×26 grid.",
    link: "https://github.com/vishnupriya-cheemalamarri/collaborative-sheets",
  },
  {
    name: "DocIntel",
    desc: "RAG document Q&A platform with grounded responses and TF-IDF-based trust scoring.",
    link: "https://github.com/vishnupriya-cheemalamarri/DocIntel-Document-Intelligence-Platform",
  },
  {
    name: "Hybrid Attention CNN",
    desc: "ResNet18 + CBAM + Self-Attention for COPD detection — achieving 99.33% test accuracy.",
    link: "https://github.com/vishnupriya-cheemalamarri/hybrid-attention-cnn-",
    note: "First-author paper submitted to PeerJ Computer Science",
  },
  {
    name: "PQ-Shield",
    desc: "Post-quantum healthcare security framework using Kyber, Dilithium, AES-GCM, and Ethereum.",
    link: "https://github.com/vishnupriya-cheemalamarri/PQ-Shield-Post-Quantum-Secure-Healthcare-Communication-Framework",
  },
];

const moreProjects = [
  {
    name: "AI Document Simplifier",
    desc: "Prodapt Hackathon project — simplifies documents with GPT-4o-mini + local embeddings",
    link: "https://github.com/vishnupriya-cheemalamarri/AI_Document-Simplifier",
  },
  {
    name: "Decentralized File Manager",
    desc: "File storage system exploring decentralized architecture",
    link: "https://github.com/vishnupriya-cheemalamarri/Decentralized-file-manager",
  },
  {
    name: "Budget Battles",
    desc: "Financial tracker built to explore MongoDB indexing + Redis caching strategy",
    link: "https://github.com/vishnupriya-cheemalamarri/Budget_Battles",
  },
  {
    name: "MERN Online Auction System",
    desc: "Real-time bidding platform — registration, listings, live bids",
    link: "https://github.com/vishnupriya-cheemalamarri/MERN_ONLINE_AUCTION_SYSTEM_BACKEND",
  },
  {
    name: "Chef Claude",
    desc: "AI recipe generator from your ingredients — React + Groq API",
    link: "https://github.com/vishnupriya-cheemalamarri/Chef-Claude",
  },
  {
    name: "MERN NoteBoard",
    desc: "Full-stack note-taking app — MongoDB, Express, React, Node",
    link: "https://github.com/vishnupriya-cheemalamarri/MERN_NoteBoard",
  },
  {
    name: "Tic Tac Toe",
    desc: "Classic game, built for React fundamentals practice",
    link: "https://github.com/vishnupriya-cheemalamarri/tic-tac-toe",
  },
];

const training = [
  {
    name: "MERN Stack Development",
    desc: "Ethnus Technologies · May 2024 – Jul 2024 — REST APIs, auth, an online auction system",
  },
];

const certifications = [
  "AWS Certified Cloud Practitioner",
  "Summer Research Internship, VIT Chennai",
  "MERN Stack Development, Ethnus Technologies",
];

function EmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "cvpriya5002@gmail.com";

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="hover:text-amber-300 underline underline-offset-4"
    >
      {copied ? "Copied!" : "Email"}
    </button>
  );
}

export const stations: Station[] = [
  {
    name: "About",
    freq: 91.5,
    render: () => (
      <div className="max-w-md text-center font-serif flex flex-col items-center gap-4">
        <img
          src="/photo.jpeg"
          alt="Vishnupriya"
          className="w-28 h-28 rounded-full object-cover border-2 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.4)]"
        />
        <p className="text-2xl text-amber-100">Cheemalamarri Vishnu Priya
          
        </p>

        <p className="text-lg text-amber-100/90 leading-relaxed italic">
          Somewhere between the static and the signal, I build things.
        </p>
        <p className="text-base text-amber-100/70 leading-relaxed">
          Computer Science student at VIT Chennai, exploring how systems work
          beneath the surface — from TCP sockets and databases to real-time
          applications and AI.
          
        </p>
        <p className="text-base text-amber-100/70 leading-relaxed">
          B.Tech CS, VIT Chennai · Class of 2027 · CGPA 8.92</p>
      </div>
    ),
  },
  {
    name: "Work",
    freq: 96.3,
    render: () => (
      <div className="max-w-lg font-mono">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm tracking-[0.3em] text-amber-500/70">
            96.3 — SIGNALS FROM THE BUILD
          </p>
          <a
            href="https://github.com/vishnupriya-cheemalamarri"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-amber-400/70 hover:text-amber-300 underline underline-offset-4"
          >
            View GitHub →
          </a>
        </div>

        <div className="max-h-72 overflow-y-auto pr-2 space-y-6">
          <div>
            <p className="text-amber-500/60 text-xs tracking-widest mb-2">
              NOW PLAYING
            </p>
            <div className="space-y-2">
              {featuredProjects.map((project) => (
                <a
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:bg-amber-400/10 rounded-md p-2 transition-colors"
                >
                  <p className="text-amber-200">▸ {project.name}</p>
                  <p className="text-amber-100/60 text-sm">{project.desc}</p>
                  {project.note && (
                    <p className="text-amber-400/70 text-xs mt-1 italic">
                      ✦ {project.note}
                    </p>
                  )}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-amber-500/60 text-xs tracking-widest mb-2">
              OTHER FREQUENCIES
            </p>
            <div className="space-y-2">
              {moreProjects.map((project) => (
                <a
                  key={project.name}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block hover:bg-amber-400/10 rounded-md p-2 transition-colors"
                >
                  <p className="text-amber-200/90">▸ {project.name}</p>
                  <p className="text-amber-100/50 text-sm">{project.desc}</p>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-amber-500/60 text-xs tracking-widest mb-2">
              TRANSMISSION LOG
            </p>
            {training.map((item) => (
              <div key={item.name} className="p-2">
                <p className="text-amber-200/90">▸ {item.name}</p>
                <p className="text-amber-100/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-amber-500/60 text-xs tracking-widest mb-2">
              SIGNALS RECEIVED
            </p>
            <ul className="space-y-1 pl-2">
              {certifications.map((certification) => (
                <li key={certification} className="text-amber-100/60 text-sm">
                  ✦ {certification}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "???",
    freq: 99.9,
    secret: true,
    render: () => (
      <div className="max-w-md text-center">
        <p className="text-sm tracking-[0.4em] text-purple-400/80 mb-3 font-mono animate-pulse">
          UNKNOWN SIGNAL
        </p>
        <p className="text-lg text-purple-200 italic leading-relaxed">
          "You've been listening past the usual frequencies.
          <br />
          Most people stop here.
          <br />
          You didn't.
          <br />
          Maybe that's exactly the kind of signal worth keeping."
        </p>
      </div>
    ),
  },
  {
    name: "Contact",
    freq: 104.7,
    render: () => (
      <div className="max-w-md text-center">
        <p className="text-sm tracking-[0.3em] text-amber-500/70 mb-1 font-mono">
          104.7 — OPEN FREQUENCY
        </p>
        <p className="text-amber-100/70 text-sm mb-4 italic">
          The line is open.
        </p>
        <div className="flex justify-center gap-6 text-amber-100 text-lg">
          <EmailButton />
          <a
            href="https://www.linkedin.com/in/vishnupriya-cheemalamarri-9b41a1290/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-300 underline underline-offset-4"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/vishnupriya-cheemalamarri"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-300 underline underline-offset-4"
          >
            GitHub
          </a>
        </div>
      </div>
    ),
  },
];