
import "../styles/currency.css"; 
async function loadRates() {
  const base = document.querySelector("#base").value;
  const date = document.querySelector("#date").value;
  const tableBody = document.querySelector("#currency-table tbody");

  const url = date
    ? `https://api.frankfurter.app/${date}?from=${base}`
    : `https://api.frankfurter.app/latest?from=${base}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    const rates = data.rates;
    tableBody.innerHTML = "";

    Object.entries(rates).slice(0, 50).forEach(([currency, rate]) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${currency}</td><td>${rate.toFixed(4)}</td>`;
      tableBody.appendChild(row);
    });
  } catch (err) {
    tableBody.innerHTML = `<tr><td colspan="2">Ошибка ${err.message}</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.querySelector("#date").setAttribute("max", today);
  document.querySelector("#load-btn").addEventListener("click", loadRates);
  loadRates();
});
