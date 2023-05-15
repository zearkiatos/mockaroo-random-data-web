document.getElementById("load").onclick = getFile;
var table = [];
var tableHeaders = [];

function getFile() {
  const input = document.getElementById("input-file");
  if ("files" in input && input.files.length > 0) {
    placeFileContent(
      document.getElementById("visualization-area"),
      input.files[0]
    );
  }
}

function placeFileContent(target, file) {
  target.removeAttribute("hidden");
  readFileContent(file)
    .then((content) => {
      target.querySelector("#content").innerHTML = mapCSVtoTable(content);
      target.querySelector("#success-msg").innerText =
        "File read sucessfuly";
      target.querySelector(
        "#row-count"
      ).innerText = `Total: ${table.length} rows`;
    })
    .catch((error) => {
      console.log(error);
      target.querySelector(
        "#success-msg"
      ).innerText = `There was an error when read the file:\n${error}`;
    });
}

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}

function mapCSVtoTable(csvcontent) {
  let html = "";
  html += "<thead>";
  let allTextLines = csvcontent.split(/\r\n|\n/);
  for (line in allTextLines) {
    let curLine = allTextLines[line];
    table.push([]);
    let allfields = curLine.split(",");
    for (field in allfields) {
      if (line == 0) {
        html += `<th>${allfields[field]}</th>`;
        tableHeaders.push(allfields[field]);
      } else {
        html += `<td>${allfields[field]}</td>`;
        table[line - 1].push(allfields[field]);
      }
    }
    if (line == 0) {
      html += "</thead><tbody><tr>";
      table = [];
    } else if (line === allTextLines.length - 1) {
      html += "</tr></tbody>";
    } else {
      html += "</tr><tr>";
    }
  }
  return html;
}
