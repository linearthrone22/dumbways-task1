// Menampilkan teks "selamat pagi!" ke konsol
console.log("Selamat pagi!");

// Mendefinisikan variabel 'hamburgerIsOpen' dengan nilai awal true
let hamburgerIsOpen = true;

// Mendefinisikan fungsi 'openHamburger'
function openHamburger() {
  // Mendapatkan elemen dengan id "hamburger-nav-container" dan menyimpannya ke dalam variabel 'hamburgerNavContainer'
  let hamburgerNavContainer = document.getElementById("hamburger-nav-container");

  // Memeriksa nilai dari 'hamburgerIsOpen'
  if (hamburgerIsOpen) {
    // Jika 'hamburgerIsOpen' bernilai true, maka mengatur tampilan 'hamburgerNavContainer' menjadi "block"
    hamburgerNavContainer.style.display = "block";
    
    // Mengubah nilai 'hamburgerIsOpen' menjadi false
    hamburgerIsOpen = false;
  } else {
    // Jika 'hamburgerIsOpen' bernilai false, maka mengatur tampilan 'hamburgerNavContainer' menjadi "none"
    hamburgerNavContainer.style.display = "none";
    
    // Mengubah nilai 'hamburgerIsOpen' menjadi true
    hamburgerIsOpen = true;
  }
}


// document.addEventListener('contextmenu', function(event) {
//     event.preventDefault();                                    // prevent user to right click in website environment
//   });
  