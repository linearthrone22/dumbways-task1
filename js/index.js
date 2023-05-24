console.log("selamat pagi!")

let hamburgerIsOpen = true;

function openHamburger() {
    let hamburgerNavContainer = document.getElementById(
        "hamburger-nav-container"
        );
    if (hamburgerIsOpen) {
        hamburgerNavContainer.style.display = "block";
        hamburgerIsOpen = false;
    } else {
        hamburgerNavContainer.style.display = "none";
        hamburgerIsOpen = true;
    }
}