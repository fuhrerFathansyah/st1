function getTestimonialData(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = () => {
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.onerror = () => {
      reject("Network Error!");
    };

    xhr.send();
  });
}

async function allTestimonial() {
  const testimonials = await getTestimonialData(
    "https://api.npoint.io/22d0c5a173aaf49e8afe"
  );

  if (!testimonials.length) {
    return (document.getElementById(
      "testimonial"
    ).innerHTML = `<h1>No Data</h1>`);
  }

  const testimonialHTML = testimonials.map((testimonial) => {
    return `<div class="testimonial">
    <img src="${testimonial.image}" class="profile-testimonial"/>
    <p class="quote">"${testimonial.content}"</p>
    <p class="author">- ${testimonial.author}</p>
    </div>`;
  });

  document.getElementById("testimonial").innerHTML = testimonialHTML.join("");
}

async function filterTestimonial(rating) {
  const testimonials = await getTestimonialData(
    "https://api.npoint.io/22d0c5a173aaf49e8afe"
  );
  const filteredTestimonial = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );

  if (filteredTestimonial.length <= 0) {
    return (document.getElementById(
      "testimonial"
    ).innerHTML = `<h1>NO DATA</h1>`);
  }

  const testimonialHTML = filteredTestimonial.map((testimonial) => {
    return `<div class="testimonial">
                <img src="${testimonial.image}" class="profile-testimonial"/>
                <p class="quote">"${testimonial.content}"</p>
                <p class="author">- ${testimonial.author}</p>
                </div>`;
  });

  document.getElementById("testimonial").innerHTML = testimonialHTML.join("");
}
allTestimonial();
