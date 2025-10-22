function downloadResource(filename) {
  alert(`Downloading ${filename}...`);
  // In production: window.location.href = `/printables/${filename}`;
}

function generateSheet() {
  const topic = document.getElementById("topicSelect").value;
  const output = document.getElementById("output");

  const sheets = {
    f200: "F200 Revision Sheet: Storyboards, scripts, and visualisation diagrams.",
    f201: "F201 Revision Sheet: Design principles, file formats, and editing tools.",
    f202: "F202 Revision Sheet: Interactivity, user flow, and testing methods."
  };

  output.textContent = sheets[topic] || "Select a topic.";
}
