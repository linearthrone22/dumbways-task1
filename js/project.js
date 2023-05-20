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
  
      const projectPreviewCard = `
        <div class="project-flex-box">
          <img src="${imageSrc}">
          <h3>${projectName}</h3>
          <h5>Duration: ${startDate} - ${finishDate}</h5>
          <p>${description}</p>
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
  
  function renderProjectPreviewCards() {
    const projectFlex = document.querySelector(".project-flex");
    projectFlex.innerHTML = "";
  
    for (let i = 0; i < projectData.length; i++) {
      projectFlex.innerHTML += projectData[i];
    }
  }
  