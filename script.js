const generateBtn = document.getElementById("generate-btn");
const modal = document.getElementById("modal");
const result = document.getElementById("result");
const message = document.getElementById("message");
const closeBtn = document.getElementsByClassName("close")[0];
const tableBody = document.getElementById("table-body");
const results = JSON.parse(localStorage.getItem("results")) || [];

generateBtn.addEventListener("click", function() {
  const randomNum = Math.floor(Math.random() * 6) + 1;
  let messageText;
  switch(randomNum) {
    case 1:
      const randomSubNum = Math.floor(Math.random() * 8) + 1;
      switch(randomSubNum) {
        case 1:
          messageText = "Clientes: Boca Castor";
          break;
        case 2:
          messageText = "Clientes: CEDI Tech";
          break;
        case 3:
          messageText = "Clientes: Pi Consulting";
          break;
        case 4:
          messageText = "Clientes: Bagual";
          break;
        case 5:
          messageText = "Clientes: DelGer Guiñazu";
          break;
        case 6:
          messageText = "MCM Trading";
          break;
        case 7:
          messageText = "No hay cliente - Buscar uno";
          break;
        case 8:
          messageText = "No hay cliente - Buscar uno";
          break;
      }
      break;
    case 2:
      messageText = "Finanzas / ComprasPúblicas";
      break;
    case 3:
      messageText = "Uramark";
      break;
    case 4:
      messageText = "DecenterLine";
      break;
    case 5:
      messageText = "Administración / Gestion";
      break;
    case 6:
      const randomSubNum2 = Math.floor(Math.random() * 4) + 1;
      switch(randomSubNum2) {
        case 1:
          messageText = "Estudiar Política Económica Argentina";
          break;
        case 2:
          messageText = "Estudiar Comercio Internacional";
          break;
        case 3:
          messageText = "Estudiar DevOps";
          break;
        case 4:
          messageText = "Estudiar algo de tecnología";
          break;
      
      }
      break;
  }
  const currentDate = new Date();
  const newResult = {
    date: currentDate.toLocaleDateString(),
    time: currentDate.toLocaleTimeString(),
    number: randomNum,
    message: messageText
  };
  results.push(newResult);
  localStorage.setItem("results", JSON.stringify(results));
  modal.style.display = "block";
  result.textContent = randomNum;
  message.textContent = messageText;
  addRow(newResult);
});

closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

function addRow(result) {
  const row = document.createElement("tr");
  const dateCell = document.createElement("td");
  dateCell.textContent = result.date;
  const timeCell = document.createElement("td");
  timeCell.textContent = result.time;
  const numberCell = document.createElement("td");
  numberCell.textContent = result.number;
  const messageCell = document.createElement("td");
  messageCell.textContent = result.message;
  row.appendChild(dateCell);
  row.appendChild(timeCell);
  row.appendChild(numberCell);
  row.appendChild(messageCell);
  tableBody.appendChild(row);
}

function importResults() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
      const importedResults = JSON.parse(reader.result);
      localStorage.setItem("results", JSON.stringify(importedResults));
      tableBody.innerHTML = "";
      importedResults.forEach(result => addRow(result));
    }
  }
  input.click();
}


function exportResults() {
  const exportData = JSON.stringify(results);
  const exportBlob = new Blob([exportData], { type: "application/json" });
  const exportUrl = URL.createObjectURL(exportBlob);
  const exportLink = document.createElement("a");
  exportLink.href = exportUrl;
  exportLink.download = "results.json";
  exportLink.click();
}

const importarDatosBtn = document.getElementById("importar-datos-btn");
importarDatosBtn.addEventListener("click", importResults);

const exportarDatosBtn = document.getElementById("exportar-datos-btn");
exportarDatosBtn.addEventListener("click", exportResults);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/sw.js")
      .then(function(registration) {
        console.log("Service Worker registrado con éxito");
      })
      .catch(function(error) {
        console.error("Error al registrar el Service Worker", error);
      });
  });
}
