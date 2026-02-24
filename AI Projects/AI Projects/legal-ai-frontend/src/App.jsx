import React, { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import "./App.css";

const BACKEND_URL = "http://localhost:8000";

export default function App() {
    const [file, setFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [chatInput, setChatInput] = useState("");
    const [chatResponse, setChatResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadDocument = async () => {
        if (!file) return alert("Please select a file first!");

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post(`${BACKEND_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setUploadResponse(res.data);
        } catch {
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const runFullAnalysis = async () => {
        if (!uploadResponse) return alert("Upload a document first!");

        setLoading(true);
        try {
            const res = await axios.post(
                `${BACKEND_URL}/analysis/analyze-full`,
                {
                    document_id: uploadResponse.document_id,
                    extracted_text: uploadResponse.extracted_text,
                }
            );
            setAnalysis(res.data);
        } catch {
            alert("Analysis failed");
        } finally {
            setLoading(false);
        }
    };

    const sendChat = async () => {
        if (!chatInput.trim()) return;

        try {
            const res = await axios.post(`${BACKEND_URL}/chat`, {
                query: chatInput,
                context: uploadResponse?.extracted_text || "",
            });
            setChatResponse(res.data.response);
        } catch {
            alert("Chat failed");
        }
    };

    return (
        <div className="app-container">
            <div className="header-container">
                <h1 className="main-title">Legal AI Assistant</h1>
                <p className="subtitle">
                    Upload documents and analyze legal risks
                </p>
            </div>

            <div className="upload-box">
                <div className="file-drop-area">
                    <input
                        type="file"
                        id="fileInput"
                        className="hidden-input"
                        onChange={handleFileSelect}
                    />
                    <label htmlFor="fileInput" className="upload-text">
                        {file ? file.name : "Click to upload document"}
                    </label>
                </div>

                <div className="action-bar">
                    <button
                        className="btn-primary"
                        onClick={uploadDocument}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Document"}
                    </button>
                </div>
            </div>

            {uploadResponse && (
                <div className="results-grid">
                    <div className="summary-card">
                        <h3 className="card-title">Document Summary</h3>
                        <div
                            className="card-content-area"
                            dangerouslySetInnerHTML={{
                                __html: marked(uploadResponse.llm_summary || ""),
                            }}
                        />
                    </div>
                </div>
            )}

            {uploadResponse && (
                <div className="center-section">
                    <button
                        className="btn-primary"
                        onClick={runFullAnalysis}
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Run Full Analysis"}
                    </button>
                </div>
            )}

            {analysis && (
                <div className="results-grid">
                    <div
                        className={`score-badge ${
                            analysis.final_risk_score > 70
                                ? "score-badge-high"
                                : analysis.final_risk_score > 40
                                ? "score-badge-elevated"
                                : "score-badge-low"
                        }`}
                    >
                        <div className="score-value">
                            {analysis.final_risk_score}
                        </div>
                        <div className="risk-text">Risk Score</div>
                    </div>

                    <div className="issues-table-container">
                        <div className="table-header">Issues Detected</div>

                        <table className="issues-table">
                            <thead>
                                <tr>
                                    <th>Clause</th>
                                    <th>Description</th>
                                    <th>Rewrite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.issues_detected.map((issue, i) => (
                                    <tr key={i}>
                                        <td className="col-clause">
                                            {issue.clause_title}
                                        </td>
                                        <td className="col-description">
                                            {issue.issue_description}
                                        </td>
                                        <td className="col-rewrite">
                                            {
                                                analysis.rewrite_suggestions[i]
                                                    ?.suggested_rewrite
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="qa-assistant-box">
                <h3 className="card-title">Chat with AI</h3>

                <input
                    type="text"
                    className="qa-placeholder"
                    placeholder="Ask something..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                />

                <button className="btn-primary" onClick={sendChat}>
                    Send
                </button>

                {chatResponse && (
                    <div className="summary-card">
                        <p>{chatResponse}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
