console.log("testi.js tes");
class Testimonial {
    #quote = "";
    #author = "";
    #image = "";
    #date = "";
  
    constructor(quote, author, image, date) {
      this.#quote = quote;
      this.#author = author;
      this.#image = image;
      this.#date = date;
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
  
    get testimonialHTML() {
      return `
        <div class="testimonial">
          <img src="${this.image}" alt="" class="profile-testimonial" />
          <div class="text">
            <p class="date">${this.date}</p>
            <p class="author">${this.author}</p>
          </div>
          <div class="quote">"${this.quote}"</div>
        </div>
      `;
    }
  }
  
  const testimonial1 = new Testimonial(
    "Life-changing!",
    "- Kakeknya John Cena",
    "https://i.redd.it/g0i0fwxhxva31.jpg",
    "25-05-2023"
  );
  
  const testimonial2 = new Testimonial(
    "Simply the best!",
    "- Kucingnya Cleopatra",
    "https://images.unsplash.com/photo-1607544155801-4f5af2e88dc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "Oktober 69 SM"
  );
  
  const testimonial3 = new Testimonial(
    "Highly recommended!",
    "- Monalisa",
    "https://images.unsplash.com/photo-1423742774270-6884aac775fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    "01-01-1503"
  );
  
  const testimonialData = [testimonial1, testimonial2, testimonial3];
  let testimonialHTML = "";
  
  for (let i = 0; i < testimonialData.length; i++) {
    testimonialHTML += testimonialData[i].testimonialHTML;
  }
  
  document.querySelector(".testimonials").innerHTML = testimonialHTML;
  