import { useState, useRef } from "react";

const CATEGORIES = ["🔥 Motivation", "💡 Wisdom", "❤️ Love", "😂 Humor", "📚 Learning", "🎯 Goals"];
const TABS = [
  { id: "quote", label: "Quote", icon: "💬" },
  { id: "reel", label: "Reel", icon: "🎬" },
  { id: "message", label: "Message", icon: "💌" },
];

export default function SaveitSave() {
  const [activeTab, setActiveTab] = useState("quote");
  const [mode, setMode] = useState("text"); // "text" | "image"
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [catOpen, setCatOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImage(url);
    setImageName(file.name);
    setMode("image");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSave = () => {
    if (mode === "text" && !text.trim()) return;
    if (mode === "image" && !image) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const canSave = (mode === "text" && text.trim()) || (mode === "image" && image);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0e0e0e",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      padding: "24px 16px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .tab-btn { transition: all 0.2s; }
        .tab-btn:hover { opacity: 0.85; }
        .mode-pill { transition: all 0.22s cubic-bezier(.4,0,.2,1); }
        .save-btn { transition: all 0.18s; }
        .save-btn:active { transform: scale(0.97); }
        .drop-zone { transition: border-color 0.2s, background 0.2s; }
        .cat-option:hover { background: rgba(255,193,7,0.08); color: #ffc107; }
        textarea:focus { outline: none; }
        textarea::placeholder { color: #555; }
        .pulse { animation: pulse 0.5s ease; }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
      `}</style>

      <div style={{ width: "100%", maxWidth: 420 }}>
        {/* Header */}
        <div style={{ marginBottom: 28, textAlign: "center" }}>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            color: "#fff",
            letterSpacing: "-0.5px",
          }}>
            Save something <span style={{ fontSize: 22 }}>✨</span>
          </div>
          <div style={{ color: "#555", fontSize: 13, marginTop: 4 }}>
            Capture quotes, reels & messages
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex",
          gap: 8,
          marginBottom: 22,
          background: "#1a1a1a",
          borderRadius: 14,
          padding: 5,
        }}>
          {TABS.map(t => (
            <button key={t.id} className="tab-btn" onClick={() => setActiveTab(t.id)} style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              background: activeTab === t.id ? "#ffc107" : "transparent",
              color: activeTab === t.id ? "#0e0e0e" : "#777",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Mode Toggle — NEW */}
        <div style={{
          display: "flex",
          background: "#181818",
          borderRadius: 12,
          padding: 4,
          marginBottom: 16,
          border: "1px solid #2a2a2a",
        }}>
          {["text", "image"].map(m => (
            <button key={m} className="mode-pill" onClick={() => setMode(m)} style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              background: mode === m ? "#ffc107" : "transparent",
              color: mode === m ? "#0e0e0e" : "#555",
            }}>
              {m === "text" ? "📝 Text" : "🖼️ Image"}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ marginBottom: 14 }}>
          {mode === "text" ? (
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Paste or type your quote here..."
              rows={5}
              style={{
                width: "100%",
                background: "#181818",
                border: "1.5px solid #ffc107",
                borderRadius: 14,
                color: "#fff",
                fontSize: 15,
                padding: "16px",
                resize: "none",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
              }}
            />
          ) : (
            <div
              className="drop-zone"
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current.click()}
              style={{
                border: `2px dashed ${dragging ? "#ffc107" : image ? "#ffc107" : "#333"}`,
                borderRadius: 14,
                background: dragging ? "rgba(255,193,7,0.05)" : "#181818",
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {image ? (
                <>
                  <img src={image} alt="uploaded" style={{
                    width: "100%",
                    maxHeight: 260,
                    objectFit: "cover",
                    borderRadius: 12,
                  }} />
                  <div style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    background: "rgba(0,0,0,0.7)",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: 11,
                    color: "#ffc107",
                    backdropFilter: "blur(6px)",
                  }}>
                    Tap to change
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🖼️</div>
                  <div style={{ color: "#666", fontSize: 14 }}>Tap or drag an image here</div>
                  <div style={{ color: "#444", fontSize: 12, marginTop: 4 }}>JPG, PNG, WEBP supported</div>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={e => handleFile(e.target.files[0])}
              />
            </div>
          )}
        </div>

        {/* Optional image attach (only in text mode) */}
        {mode === "text" && (
          <button onClick={() => fileRef.current?.click()} style={{
            width: "100%",
            background: "#181818",
            border: "1.5px dashed #2c2c2c",
            borderRadius: 12,
            color: "#555",
            fontSize: 14,
            padding: "13px 16px",
            textAlign: "left",
            cursor: "pointer",
            marginBottom: 14,
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span>🔗</span>
            <span>{imageName || "Attach an image (optional)"}</span>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }}
              onChange={e => { handleFile(e.target.files[0]); }} />
          </button>
        )}

        {/* Category */}
        <div style={{ position: "relative", marginBottom: 24 }}>
          <button onClick={() => setCatOpen(!catOpen)} style={{
            width: "100%",
            background: "#181818",
            border: "1.5px solid #2a2a2a",
            borderRadius: 12,
            color: "#ccc",
            fontSize: 14,
            padding: "13px 16px",
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span>{category}</span>
            <span style={{ color: "#555", transform: catOpen ? "rotate(180deg)" : "none", transition: "0.2s" }}>▾</span>
          </button>
          {catOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0, right: 0,
              background: "#1e1e1e",
              border: "1px solid #2a2a2a",
              borderRadius: 12,
              zIndex: 10,
              overflow: "hidden",
            }}>
              {CATEGORIES.map(c => (
                <div key={c} className="cat-option" onClick={() => { setCategory(c); setCatOpen(false); }} style={{
                  padding: "12px 16px",
                  fontSize: 14,
                  color: c === category ? "#ffc107" : "#888",
                  cursor: "pointer",
                  background: c === category ? "rgba(255,193,7,0.06)" : "transparent",
                  transition: "all 0.15s",
                }}>
                  {c}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{
            flex: 1,
            background: "#1a1a1a",
            border: "1.5px solid #2a2a2a",
            borderRadius: 14,
            color: "#777",
            fontSize: 15,
            fontWeight: 600,
            padding: "15px 0",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            Cancel
          </button>
          <button
            className={`save-btn ${saved ? "pulse" : ""}`}
            onClick={handleSave}
            disabled={!canSave}
            style={{
              flex: 2,
              background: canSave ? "#ffc107" : "#2a2500",
              border: "none",
              borderRadius: 14,
              color: canSave ? "#0e0e0e" : "#555",
              fontSize: 15,
              fontWeight: 700,
              padding: "15px 0",
              cursor: canSave ? "pointer" : "not-allowed",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.2px",
              transition: "all 0.2s",
            }}
          >
            {saved ? "Saved ✓" : "Save ✨"}
          </button>
        </div>

        {/* Helper note */}
        <div style={{
          marginTop: 18,
          textAlign: "center",
          fontSize: 12,
          color: "#444",
          lineHeight: 1.6,
        }}>
          Switch to <span style={{ color: "#ffc107" }}>🖼️ Image</span> mode to save an image directly as your content
        </div>
      </div>
    </div>
  );
}
