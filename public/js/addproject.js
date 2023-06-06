// Function to display an alert if the form is empty
function emptyFormAlert() {
  let projectName = document.getElementById("projectname").value;
  let startDate = document.getElementById("startdate").value;
  let endDate = document.getElementById("enddate").value;
  let description = document.getElementById("inputdesc").value;
  let image = document.getElementById("input-image").value;

  if (projectName === "") {
    return alert("Please input your project name");
  } else if (startDate === "") {
    return alert("Please select the start date");
  } else if (endDate === "") {
    return alert("Please select the end date");
  } else if (description === "") {
    return alert("Please provide a project description");
  } else if (image === "") {
    return alert("Please upload an image of your project");
  }
}

// Function to submit the project form
function submitProject() {
  if (emptyFormAlert()) {
    return;
  }

  let projectName = document.getElementById("projectname").value;
  let startDate = document.getElementById("startdate").value;
  let endDate = document.getElementById("enddate").value;
  let description = document.getElementById("inputdesc").value;
  let bootstrapIcon = document.getElementById("bootstrap").checked ? '<i class="fab fa-bootstrap fa-xl"></i>' : "";
  let cssIcon = document.getElementById("css").checked ? '<i class="fab fa-css3-alt fa-xl"></i>' : "";
  let jsIcon = document.getElementById("js").checked ? '<i class="fab fa-js fa-xl"></i>' : "";
  let goIcon = document.getElementById("Go").checked ? '<i class="fab fa-golang fa-xl"></i>' : "";
  let image = document.getElementById("input-image").files[0];

  const reader = new FileReader();
  reader.onload = function (event) {
    let imageSrc = event.target.result;

    const startDateObj = new Date(startDate);
    const EndDateObj = new Date(endDate);
    const duration = calculateDuration(startDateObj, EndDateObj);

    const projectCard = `
        <div class="card rounded-4 border-0 shadow-sm ppc" style="width: 16rem;">
          <img src="${imageSrc}" class="rounded-top-4 card-img-top object-fit-cover">
          <div class="card-body">
            <h6>${projectName}</h6>
            <h8 class="text-muted">Duration: ${formatDuration(duration)}</h8>
            <p style="margin: 0;">${description}</p>
            <div class="d-flex gap-2 my-4">
              ${bootstrapIcon}${cssIcon}${jsIcon}${goIcon}
            </div>
            <div class="d-flex flex-row gap-3 justify-content-evenly">
              <button class="btn rounded-pill btn-outline-dark btn-sm w-50">Edit</button>
              <button class="btn rounded-pill btn-outline-danger btn-sm w-50">Delete</button>
            </div>
          </div>
        </div>
      `;
    console.log(duration);
    console.log(calculateDuration)
    const projectContainer = document.getElementById("ppc-container");
    projectContainer.innerHTML += projectCard;
  };

  reader.readAsDataURL(image);
}

function calculateDuration(startDate, endDate) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000; // jumlah milidetik dalam satu hari

  const startTimestamp = startDate.getTime();
  const finishTimestamp = endDate.getTime();

  const durationInMilliseconds = Math.abs(finishTimestamp - startTimestamp);
  durationInDays = Math.round(durationInMilliseconds / millisecondsPerDay);

  const years = Math.floor(durationInDays / 365);
  const months = Math.floor((durationInDays % 365) / 30);
  const days = durationInDays % 30;

  return {
    years: years,
    months: months,
    days: days,
  };
}

function formatDuration(duration) {
  const { years, months, weeks, days } = duration;
  let formattedDuration = "";

  if (years > 0) {
    formattedDuration += `${years} ${years === 1 ? 'year' : 'years'}, `;
  }
  if (months > 0) {
    formattedDuration += `${months} ${months === 1 ? 'month' : 'months'}, `;
  }
  if (days > 0) {
    formattedDuration += `${days} ${days === 1 ? 'day' : 'days'}, `;
  }

  return formattedDuration
}