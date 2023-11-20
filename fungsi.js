document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("splashScreen").style.display = "none";
  }, 2500); // Ubah 3000 menjadi durasi yang diinginkan (dalam milidetik)
});

const rentalTable = document.getElementById("rentalTable");
const FormTambah = document.getElementById("FormTambah");
const editForm = document.getElementById("editForm");
const cancelEditButton = document.getElementById("cancelEdit");

let rentalData = [];

FormTambah.addEventListener("submit", (e) => {
  e.preventDefault();
  const namaPelanggan = document.getElementById("namaPelanggan").value;
  const jenisMobil = document.getElementById("jenisMobil").value;
  const lamaSewa = parseInt(document.getElementById("lamaSewa").value);
  let harga;

  switch (jenisMobil) {
    case "Avanza":
      harga = 500000 * lamaSewa;
      break;
    case "Xenia":
      harga = 650000 * lamaSewa;
      break;
    case "Apv":
      harga = 850000 * lamaSewa;
      break;
  }

  const newData = {
    id: rentalData.length + 1,
    namaPelanggan,
    jenisMobil,
    lamaSewa,
    harga,
  };

  rentalData.push(newData);
  displayrentalData();
  FormTambah.reset();
});

function displayrentalData() {
  rentalTable.innerHTML = `<tr>
        <th>ID</th>
        <th>Nama Pelanggan</th>
        <th>Jenis Mobil</th>
        <th>Lama Sewa</th>
        <th>Harga</th>
        <th>Aksi</th>
    </tr>`;

  rentalData.forEach((rental) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${rental.id}</td>        
            <td>${rental.namaPelanggan}</td>
            <td>${rental.jenisMobil}</td>
            <td>${rental.lamaSewa + " hari"}</td>
            <td>${rental.harga}</td>
            <td>
                <button class="edit-button" data-id="${rental.id}">Edit</button>
                <button class="delete-button" data-id="${rental.id}">Hapus</button>
            </td>
        `;
    rentalTable.appendChild(row);
  });
}

rentalTable.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const id = e.target.dataset.id;
    const index = rentalData.findIndex((item) => item.id == id);
    if (index !== -1) {
      rentalData.splice(index, 1);
      displayrentalData();
    }
  } else if (e.target.classList.contains("edit-button")) {
    const id = e.target.dataset.id;
    const rental = rentalData.find((item) => item.id == id);

    document.getElementById("editId").value = rental.id;
    document.getElementById("editNamaPelanggan").value = rental.namaPelanggan;
    document.getElementById("editjenisMobil").value = rental.jenisMobil;
    document.getElementById("editlamaSewa").value = rental.lamaSewa;

    editForm.reset();

    editForm.style.display = "block";
  }
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("editId").value;
  const namaPelanggan = document.getElementById("editNamaPelanggan").value;
  const jenisMobil = document.getElementById("editJenisMobil").value;
  const editHari = parseInt(document.getElementById("editHari").value);
  let harga;

  switch (jenisMobil) {
    case "Avanza":
      harga = 500000 * editHari;
      break;
    case "Xenia":
      harga = 650000 * editHari;
      break;
    case "Apv":
      harga = 850000 * editHari;
      break;
  }

  const rental = rentalData.find((item) => item.id == id);
  if (rental) {
    rental.namaPelanggan = namaPelanggan;
    rental.jenisMobil = jenisMobil;
    rental.lamaSewa = editHari;
    rental.harga = harga;

    displayrentalData();
  }
});

displayrentalData();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
