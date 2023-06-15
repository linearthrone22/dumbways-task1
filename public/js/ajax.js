const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.npoint.io/26208e57447a8fb2c7f3", true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject("Error loading data.");
      }
    };
    xhr.onerror = () => {
      reject("Network error.");
    };
    xhr.send();
  });
  
  async function getAllTestimonials() {
    try {
      const response = await promise;
      console.log(response);
  
      renderTestimonials(response.testimonials);
      return response;
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  function filterTestimonialsByRating(rating, response) {
    const filteredTestimonials = response.testimonials.filter((testimonial) => testimonial.rating === rating);
    renderTestimonials(filteredTestimonials);
  }
  
  function showAllTestimonials(response) {
    renderTestimonials(response.testimonials);
  }
  
  function renderTestimonials(testimonials) {
    const testimonialsContainer = document.getElementById("testimonials");
    testimonialsContainer.innerHTML = "";
  
    if (testimonials.length === 0) {
      document.getElementById("no-testimonial").style.display = "block";
    } else {
      document.getElementById("no-testimonial").style.display = "none";
      testimonials.forEach((testimonial) => {
        const ratingStars = '<i class="fa-solid fa-star"></i>'.repeat(testimonial.rating);
        const testimonialHTML = `
          <div class="testimonial">
            <img src="${testimonial.image}" alt="" class="profile-testimonial" />
            <div class="text">
              <p class="date">${testimonial.date}</p>
              <p class="author">${testimonial.author}</p>
            </div>
            <div class="quote">"${testimonial.quote}"</div>
            <div class="rating" data-rating="${testimonial.rating}">${ratingStars}</div>
          </div>
        `;
        testimonialsContainer.innerHTML += testimonialHTML;
      });
    }
  }
  
  async function initializeTestimonials() {
    const response = await getAllTestimonials();
  
    const ratingButtons = document.querySelectorAll(".rating-button");
    ratingButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const rating = parseInt(button.dataset.rating);
        filterTestimonialsByRating(rating, response);
        console.log(`Showing rating ${rating} testimonials`);
      });
    });
  
    const allRatingsButton = document.querySelector(".all-ratings-button");
    allRatingsButton.addEventListener("click", () => {
      showAllTestimonials(response);
      console.log("Showing all testimonials");
    });
  }
  
  initializeTestimonials();
  