class Testimonial {
    image = ""
    content = ""
    author = ""

    constructor(image, content, author) {
        this.image = image
        this.content = content
        this.author = author
    }

    html() {
        return `<div class="testimonial">
        <img src="${this.image}" class="profile-testimonial"/>
        <p class="quote">"${this.content}"</p>
        <p class="author">- ${this.author}</p>
        </div>`
    }
}

const testimonial1 = new Testimonial ("https://nichegamer.com/wp-content/uploads/2023/10/persona-3-reload-10-31-23-1-2048x1152.jpg", "Mitsuru Kirijo cantik ya", "Fathan Syah");
const testimonial2 = new Testimonial ("https://www.charlieintel.com/cdn-image/wp-content/uploads/2024/04/13/Genshin-Impact-Arlecchino-build-guide-Best-Polearm-artifact-teams-more.jpg?width=750&quality=60&format=auto", "Arlecchino.. Peruere", "Fathan Syah");
const testimonial3 = new Testimonial ("https://www.charlieintel.com/cdn-image/wp-content/uploads/2024/02/20/Honkai-Star-Rail-Acheron-Ascension-Traces-level-up-materials.jpg?width=750&quality=60&format=auto", "Acheron Yomi.. gitu sih", "Fathan Syah");

const testimonials = [testimonial1, testimonial2, testimonial3];

let testimonialHTML = ``

for (let index = 0; index < testimonials.length; index++) {
    testimonialHTML += testimonials[index].html();
}

document.getElementById("testimonial").innerHTML = testimonialHTML;