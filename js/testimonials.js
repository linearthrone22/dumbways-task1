// Definisikan kelas Testimonial
class Testimonial {
  constructor(quote, author, image, date, rating) {
    this.quote = quote;
    this.author = author;
    this.image = image;
    this.date = date;
    this.rating = rating;
  }

  // Dapatkan HTML testimonial
  get testimonialHTML() {
    const ratingStars = '<i class="fa-solid fa-star"></i>'.repeat(this.rating); // Menghasilkan ikon bintang berdasarkan rating

    return `
      <div class="testimonial">
        <img src="${this.image}" alt="" class="profile-testimonial" />
        <div class="text">
          <p class="date">${this.date}</p>
          <p class="author">${this.author}</p>
        </div>
        <div class="quote">"${this.quote}"</div>
        <div class="rating" data-rating="${this.rating}">${ratingStars}</div>
      </div>
    `;
  }
}

// Data testimonial yang sudah dibuat menggunakan kelas Testimonial
const testimonialData = [
  new Testimonial(
    "Luar Biasa Kreatif!",
    "- Kakeknya John Cena",
    "https://i.redd.it/g0i0fwxhxva31.jpg",
    "25-05-2023",
    5
  ),
  new Testimonial(
    "Sangat Terampil Meongg!",
    "- Kucingnya Cleopatra",
    "https://images.unsplash.com/photo-1607544155801-4f5af2e88dc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "Oktober 69 SM",
    4
  ),
  new Testimonial(
    "Menginspirasi Sekali!",
    "- Monalisa",
    "https://images.unsplash.com/photo-1423742774270-6884aac775fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    "01-01-1503",
    5
  ),
  new Testimonial(
    "Sellernya Mantan Saya!",
    "- Rahmat",
    "https://plus.unsplash.com/premium_photo-1683639447442-164725904c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    "09-04-2023",
    1
  ),
  new Testimonial(
    "Oke lah!",
    "- Raul",
    "https://images.unsplash.com/photo-1632318676766-a64e84632e31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
    "08-16-2022",
    3
  ),
];

// Fungsi untuk merender testimonial ke dalam HTML
function renderTestimonials(testimonials) {
  const testimonialsContainer = document.querySelector(".testimonials");
  testimonialsContainer.innerHTML = ""; // Menghapus testimonial sebelumnya

  if (testimonials.length === 0) {
    document.getElementById("no-testimonial").style.display = "block";
  } else {
    document.getElementById("no-testimonial").style.display = "none";
    testimonials.forEach((testimonial) => {
      testimonialsContainer.innerHTML += testimonial.testimonialHTML;
    });
  }
}

// Fungsi untuk menyaring testimonial berdasarkan rating
function filterTestimonialsByRating(rating) {
  const filteredTestimonials = testimonialData.filter((testimonial) => testimonial.rating === rating);
  renderTestimonials(filteredTestimonials);
}

// Fungsi untuk menampilkan semua testimonial
function showAllTestimonials() {
  renderTestimonials(testimonialData);
}

// Menambahkan event listener pada tombol rating
const ratingButtons = document.querySelectorAll(".rating-button");
ratingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const rating = parseInt(button.dataset.rating);
    filterTestimonialsByRating(rating);
  });
});

// Menambahkan event listener pada tombol "All Ratings"
const allRatingsButton = document.querySelector(".all-ratings-button");
allRatingsButton.addEventListener("click", showAllTestimonials);

// Merender testimonial secara awal
renderTestimonials(testimonialData);
