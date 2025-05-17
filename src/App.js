import React, { useState } from "react";
import { marked } from "marked";
import "./App.css";

function App() {
  const [markdown, setMarkdown] = useState("");

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
  };

  const getHtml = () => {
    return { __html: marked.parse(markdown) };
  };

  const downloadHtml = () => {
    const htmlContent = `<!DOCTYPE html><html><head><meta charset='utf-8'><title>Markdown Output</title><link rel='stylesheet' href='style.css'></head><body>${marked.parse(markdown)}</body></html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Markdown to HTML Converter</h1>
      <div className="vertical-layout">
        <div className="section">
          <div className="section-title">Markdown Editor</div>
          <textarea
            className="markdown-input"
            value={markdown}
            onChange={handleMarkdownChange}
            placeholder="Enter your Markdown here..."
          />
        </div>
        <div className="section">
          <div className="section-title">Live HTML Preview</div>
          <div className="html-preview">
            <div dangerouslySetInnerHTML={getHtml()} />
          </div>
        </div>
      </div>
      <button className="download-btn" onClick={downloadHtml}>
        Download HTML
      </button>
    </div>
  );
}

export default App;
