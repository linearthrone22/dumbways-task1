function emptyFormAlert() {
  let projectName = document.getElementById("projectname").value;
  let startDate = document.getElementById("startdate").value;
  let finishDate = document.getElementById("enddate").value;
  let description = document.getElementById("inputdesc").value;
  let image = document.getElementById("input-phone").value;

  if (projectName === "") {
    return alert("Please input your project name or title");
  } else if (startDate === "") {
    return alert("When did you start this project?");
  } else if (finishDate === "") {
    return alert("When did you finish this project?");
  } else if (description === "") {
    return alert("Please describe this project");
  } else if (image === "") {
    return alert("Please attach an image of your project");
  }
}

let projectData = [];

function submitData() {
  if (emptyFormAlert()) {
    return;
  }

  let projectName = document.getElementById("projectname").value;
  let startDate = document.getElementById("startdate").value;
  let finishDate = document.getElementById("enddate").value;
  let description = document.getElementById("inputdesc").value;
  let htmlIcon = document.getElementById("html").checked ? '<i class="fab fa-html5 fa-xl"></i>' : "";
  let cssIcon = document.getElementById("css").checked ? '<i class="fab fa-css3-alt fa-xl"></i>' : "";
  let jsIcon = document.getElementById("js").checked ? '<i class="fab fa-js fa-xl"></i>' : "";
  let imageIcon = document.getElementById("image").checked ? '<i class="fas fa-image fa-xl"></i>' : "";
  let image = document.getElementById("input-phone").files[0];

  const reader = new FileReader();
  reader.onload = function (event) {
    let imageSrc = event.target.result;

    const startDateObj = new Date(startDate);
    const finishDateObj = new Date(finishDate);
    const duration = calculateDuration(startDateObj, finishDateObj);

    const truncatedDescription = truncateText(description, 45);

    const projectPreviewCard = `
      <div class="project-flex-box">
        <img src="${imageSrc}">
        <h3>${projectName}</h3>
        <h5>Duration: ${formatDuration(duration)}</h5>
        <p>${truncatedDescription}</p>
        <p>${htmlIcon}${cssIcon}${jsIcon}${imageIcon}</p>
        <div class="project-button">
          <button>edit</button><button>delete</button>
        </div>
      </div>
    `;

    projectData.push(projectPreviewCard);
    renderProjectPreviewCards();
  };

  reader.readAsDataURL(image);
}

function calculateDuration(startDate, finishDate) {
  const yearsDiff = finishDate.getFullYear() - startDate.getFullYear();
  const monthsDiff = finishDate.getMonth() - startDate.getMonth();
  const daysDiff = finishDate.getDate() - startDate.getDate();

  return {
    years: yearsDiff,
    months: monthsDiff,
    days: daysDiff
  };
}

function formatDuration(duration) {
  const { years, months, days } = duration;
  let formattedDuration = "";

  if (years > 0) {
    formattedDuration += `${years} ${years === 1 ? 'year' : 'years'}, `;
  }
  if (months > 0) {
    formattedDuration += `${months} ${months === 1 ? 'month' : 'months'}, `;
  }
  if (days > 0) {
    formattedDuration += `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  return formattedDuration;
}

function truncateText(text, limit) {
  if (text.length > limit) {
    return text.slice(0, limit) + "...";
  } else {
    return text;
  }
}

function renderProjectPreviewCards() {
  const projectFlex = document.querySelector(".project-flex");
  projectFlex.innerHTML = "";

  for (let i = 0; i < projectData.length; i++) {
    projectFlex.innerHTML += projectData[i];
  }
}

