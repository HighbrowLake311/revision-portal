function downloadResource(filename) {
  alert(`Downloading ${filename}...`);
  // In live version: window.location.href = `assets/printables/${filename}`;
}

function generateSheet() {
  const unit = document.getElementById("unitSelect").value;
  const output = document.getElementById("output");

  const sheets = {
    f200: "F200 Printable Sheet: Data types, storage, retrieval, legal & ethical issues.",
    f201: "F201 Printable Sheet: Big Data systems, machine learning models & data pipelines.",
    f202: "F202 Printable Sheet: Spreadsheet modelling process, functions, testing & evaluation."
  };

  output.textContent = sheets[unit] || "Please select a unit.";
}
