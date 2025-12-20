"use client";

import { useState } from "react";
import { CyberCard } from "../ui/CyberCard";
import { CyberButton } from "../ui/CyberButton";

interface SharedDocument {
  id: string;
  name: string;
  size: string;
  chunks: number;
  shareLink: string;
  createdAt: string;
  accessCount: number;
}

export function CollaborativeRAG() {
  const [documents, setDocuments] = useState<SharedDocument[]>([
    {
      id: "1",
      name: "Cisco_CCNA_Guide.pdf",
      size: "2.4 MB",
      chunks: 156,
      shareLink: "https://app.ollama-manager.io/rag/abc123",
      createdAt: "2024-01-15",
      accessCount: 24,
    },
    {
      id: "2",
      name: "AWS_Solutions_Architect.md",
      size: "890 KB",
      chunks: 89,
      shareLink: "https://app.ollama-manager.io/rag/def456",
      createdAt: "2024-01-14",
      accessCount: 12,
    },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Add new document
          const newDoc: SharedDocument = {
            id: Date.now().toString(),
            name: "New_Document.pdf",
            size: "1.2 MB",
            chunks: 78,
            shareLink: `https://app.ollama-manager.io/rag/${Math.random().toString(36).slice(2, 8)}`,
            createdAt: new Date().toISOString().split("T")[0],
            accessCount: 0,
          };
          setDocuments((prev) => [newDoc, ...prev]);
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const copyLink = (doc: SharedDocument) => {
    navigator.clipboard.writeText(doc.shareLink);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <CyberCard className="p-6" glowColor="blue">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-['Orbitron'] text-xl font-bold text-[#A855F7]">
            Collaborative RAG
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Share knowledge bases with shareable links
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors ${
          isUploading ? "border-[#A855F7] bg-[#A855F7]/5" : "border-[#2D2D44] hover:border-[#A855F7]"
        }`}
      >
        {isUploading ? (
          <div className="space-y-4">
            <div className="text-[#A855F7] font-['Orbitron']">Processing Document...</div>
            <div className="w-full bg-[#1A1A2E] rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#A855F7] to-[#00D4FF] h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="text-xs text-gray-500">
              {uploadProgress < 30 && "Parsing document..."}
              {uploadProgress >= 30 && uploadProgress < 60 && "Chunking text..."}
              {uploadProgress >= 60 && uploadProgress < 90 && "Generating embeddings..."}
              {uploadProgress >= 90 && "Storing vectors..."}
            </div>
          </div>
        ) : (
          <>
            <svg className="w-12 h-12 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-400 mb-4">
              Drag & drop documents or click to browse
            </p>
            <p className="text-xs text-gray-600 mb-4">
              Supports: PDF, TXT, MD, DOCX (Max 50MB)
            </p>
            <CyberButton size="sm" onClick={simulateUpload}>
              Upload Document
            </CyberButton>
          </>
        )}
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
          Shared Knowledge Bases ({documents.length})
        </div>
        
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0A0A0F] border border-[#2D2D44] rounded-lg p-4 hover:border-[#A855F7]/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-[#A855F7]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-white">{doc.name}</span>
                </div>
                
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span>{doc.size}</span>
                  <span>{doc.chunks} chunks</span>
                  <span>{doc.accessCount} accesses</span>
                  <span>{doc.createdAt}</span>
                </div>

                {/* Share Link */}
                <div className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    value={doc.shareLink}
                    readOnly
                    className="flex-1 bg-[#1A1A2E] border border-[#2D2D44] rounded px-3 py-1.5 text-xs text-gray-400 font-mono"
                  />
                  <button
                    onClick={() => copyLink(doc)}
                    className={`px-3 py-1.5 text-xs rounded transition-colors ${
                      copiedId === doc.id
                        ? "bg-[#05FFA1] text-black"
                        : "bg-[#2D2D44] text-gray-300 hover:bg-[#A855F7] hover:text-white"
                    }`}
                  >
                    {copiedId === doc.id ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => deleteDocument(doc.id)}
                className="p-2 text-gray-600 hover:text-[#FF2A6D] transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </CyberCard>
  );
}
