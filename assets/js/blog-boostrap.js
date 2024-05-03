const blogs = [];

function addBlog(e) {
  e.preventDefault();

  const title = document.getElementById("input-blog-title").value;
  const content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image").files;
  image = URL.createObjectURL(image[0]);

  const createdAt = new Date();

  const blog = {
    title,
    content,
    image,
    createdAt,
  };

  blogs.unshift(blog);
  renderBlog();
}

function renderBlog() {
  let html = "";

  for (let index = 0; index < blogs.length; index++) {
    html += `
        <div class="card d-flex flex-row">
        <img
          src="${blogs[index].image}"
          class="card-img-top w-25"
          alt="..."
        />
        <div class="card-body d-flex flex-column align-items-start">
          <div class="w-100 d-flex justify-content-end">
            <a href="#" class="btn btn-primary mx-2">Edit Post</a>
            <a href="#" class="btn btn-primary">Delete Post</a>
          </div>
          <h5 class="card-title fw-bold">${blogs[index].title}</h5>
            <p class="card-text">
            ${getFullTime(blogs[index].createdAt)} | Fathan Syah
            </p>
          <p class="card-text">
          ${blogs[index].content}
          </p>
          <p class="card-text">
          ${getDistanceTime(blogs[index].createdAt)}
          </p>
        </div>
      </div>
`;
  }

  document.getElementById("contents").innerHTML = html;
}

function getFullTime(dates) {
  let minutes = dates.getMinutes();
  let hours = dates.getHours();
  const date = dates.getDate();
  const month = dates.getMonth();
  const year = dates.getFullYear();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${date} ${months[month]} ${year} ${hours}:${minutes} WIB`;
}

function getDistanceTime(timePost) {
  let timeNow = new Date();

  let distance = timeNow - timePost;

  const seconds = Math.floor(distance / 1000);
  const minutes = Math.floor(distance / 1000 / 60);
  const hours = Math.floor(distance / 1000 / 60 / 60);
  const day = Math.floor(distance / 1000 / 60 / 60 / 24);

  if (seconds < 60) {
    return seconds + " seconds ago";
  } else if (minutes < 60) {
    return minutes + " minutes ago";
  } else if (hours < 60) {
    return hours + " hours ago";
  } else if (day < 24) {
    return day + " day ago";
  }
}

renderBlog();

setInterval(() => {
  renderBlog();
}, 1000);
