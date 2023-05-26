class Testimonial {
  #quote = "";
  #author = "";
  #image = "";
  #date = "";
  #rating = "";

  constructor(quote, author, image, date, rating) {
    this.#quote = quote;
    this.#author = author;
    this.#image = image;
    this.#date = date;
    this.#rating = rating;
  }

  get quote() {
    return this.#quote;
  }

  get author() {
    return this.#author;
  }

  get image() {
    return this.#image;
  }

  get date() {
    return this.#date;
  }

  get rating() {
    return this.#rating;
  }

  get testimonialHTML() {
    const ratingStars = Array.from({ length: this.rating }, () => '<i class="fa-solid fa-star"></i>').join(''); // Generate star icons based on the rating
    
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

const testimonial1 = new Testimonial(
  "Luar Biasa Kreatif!",
  "- Kakeknya John Cena",
  "https://i.redd.it/g0i0fwxhxva31.jpg",
  "25-05-2023",
  5
);

const testimonial2 = new Testimonial(
  "Sangat Terampil Meongg!",
  "- Kucingnya Cleopatra",
  "https://images.unsplash.com/photo-1607544155801-4f5af2e88dc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  "Oktober 69 SM",
  4
);

const testimonial3 = new Testimonial(
  "Menginspirasi Sekali!",
  "- Monalisa",
  "https://images.unsplash.com/photo-1423742774270-6884aac775fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
  "01-01-1503",
  5
);

const testimonial4 = new Testimonial(
  "Kasirnya Mantan Saya!",
  "- Rahmat",
  "https://plus.unsplash.com/premium_photo-1683639447442-164725904c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
  "09-04-2023",
  1
);

const testimonial5 = new Testimonial(
  "Pelayannya Jelek!",
  "- Raul",
  "https://images.unsplash.com/photo-1632318676766-a64e84632e31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80",
  "08-16-2022",
  3
);

const testimonialData = [testimonial1, testimonial2, testimonial3, testimonial4, testimonial5];

function renderTestimonials(testimonials) {
  const testimonialsContainer = document.querySelector(".testimonials");
  testimonialsContainer.innerHTML = ""; // Clear previous testimonials

  if (testimonials.length === 0) {
    document.getElementById("no-testimonial").style.display = "block";
  } else {
    document.getElementById("no-testimonial").style.display = "none";
    testimonials.forEach((testimonial) => {
      testimonialsContainer.innerHTML += testimonial.testimonialHTML;
    });
  }
}

function filterTestimonialsByRating(rating) {
  const filteredTestimonials = testimonialData.filter((testimonial) => testimonial.rating === rating);
  renderTestimonials(filteredTestimonials);
}

function showAllTestimonials() {
  renderTestimonials(testimonialData);
}

// Add event listeners to rating buttons
const ratingButtons = document.querySelectorAll(".rating-button");
ratingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const rating = parseInt(button.getAttribute("data-rating"));
    filterTestimonialsByRating(rating);
  });
});

// Add event listener to "All Ratings" button
const allRatingsButton = document.querySelector(".all-ratings-button");
allRatingsButton.addEventListener("click", showAllTestimonials);

// Initial rendering of testimonials
renderTestimonials(testimonialData);
