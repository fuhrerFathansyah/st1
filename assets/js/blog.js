var dataProject = [];

function addProject(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let startdate = document.getElementById("startdate").value;
    let enddate = document.getElementById("enddate").value;
    let content = document.getElementById("content").value;
    

    if (title === "" || startdate === "" || enddate === "" || content === "") {
        return alert("Please fill in all fields!"); // Menampilkan peringatan jika ada input yang kosong
    }

    let imageInput = document.getElementById("input-image");
    
    if (imageInput.files.length === 0) {
        return alert("select an image!");
    }

    let image = imageInput.files[0];
    let imageURL = URL.createObjectURL(image);

    if (enddate < startdate) {
        return alert("The end date is wrong!");
    }

    let startDatePart = startdate.split("/");
    let endDatePart = enddate.split("/");

    let formatStartDate = startDatePart[2] + "-" + startDatePart[1] + "-" + startDatePart[0];
    let formatEndDate = endDatePart[2] + "-" + endDatePart[1] + "-" + endDatePart[0];

    let newStartDate = new Date(formatStartDate);
    let newEndDate = new Date(formatEndDate);

    let timeDifference = newEndDate - newStartDate;

    let differenceInDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    let differenceInMonths = Math.floor(differenceInDays / 30.44);
    let differenceInYears = Math.floor(differenceInMonths / 12);

    let duration;

    if (differenceInYears > 0) {
        duration = `${differenceInYears} years`;
    } else if (differenceInMonths > 0) {
        duration = `${differenceInMonths} months`;
    } else {
        duration = `${differenceInDays} days`;
    }

    dataProject.push({
        title: title,
        startdate: startdate,
        enddate: enddate,
        content: content,
        image: imageURL,
        duration: duration
    });

    console.log(dataProject);

    newData();
}

function newData() {
    var listProjectContainer = document.getElementById("list-project");

    // Clear existing projects
    listProjectContainer.innerHTML = "";

    // Loop through dataProject array and create project elements
    for (let i = 0; i < dataProject.length; i++) {
        const project = dataProject[i];

        // Create a new project element
        var projectElement = document.createElement("div");
        projectElement.classList.add("project");

        // Populate project details
        projectElement.innerHTML = `
            <img src="${project.image}" alt="This is the project image">
            <h3>${project.title}</h3>
            <p>${project.startdate} - ${project.enddate}</p>
            <p>Duration: ${project.duration}</p>
            <p>${project.content}</p>
        `;

        // Append project element to the listProjectContainer
        listProjectContainer.appendChild(projectElement);
    }
}