const testimonials = [
    {
        image : "https://nichegamer.com/wp-content/uploads/2023/10/persona-3-reload-10-31-23-1-2048x1152.jpg",
        content : "Mitsuru Kirijo cantik ya",
        author : "Fathan Syah",
        rating : 2,
    },
    {
        image : "https://www.charlieintel.com/cdn-image/wp-content/uploads/2024/04/13/Genshin-Impact-Arlecchino-build-guide-Best-Polearm-artifact-teams-more.jpg?width=750&quality=60&format=auto",
        content : "Arlecchino.. Peruere",
        author : "Fathan Syah"   ,
        rating : 3,
    },
    {
        image : "https://www.charlieintel.com/cdn-image/wp-content/uploads/2024/02/20/Honkai-Star-Rail-Acheron-Ascension-Traces-level-up-materials.jpg?width=750&quality=60&format=auto",
        content : "Acheron Yomi.. gitu sih",
        author : "Fathan Syah",
        rating : 5,
    },
]

function allTestimonial(){
const testimonialHTML= testimonials.map((testimonial) => {
return `<div class="testimonial">
<img src="${testimonial.image}" class="profile-testimonial"/>
<p class="quote">"${testimonial.content}"</p>
<p class="author">- ${testimonial.author}</p>
</div>`;
});

document.getElementById("testimonial"). innerHTML = testimonialHTML.join("");
}

function filterTestimonial(rating){
    const filteredTestimonial = testimonials.filter(testimonial => testimonial.rating === rating);

    if(filteredTestimonial.length <= 0){
        return document.getElementById("testimonial").innerHTML = `<h1>NO DATA</h1>`
    }

        const testimonialHTML= filteredTestimonial.map((testimonial) => {
            return `<div class="testimonial">
            <img src="${testimonial.image}" class="profile-testimonial"/>
            <p class="quote">"${testimonial.content}"</p>
            <p class="author">- ${testimonial.author}</p>
            </div>`;
            });
        
        document.getElementById("testimonial"). innerHTML = testimonialHTML.join("");
        
}
allTestimonial();
