const form = document.getElementById("taskform");
const tasklist = document.getElementById("tasklist");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  addTask(
    form.elements.taskName.value,
    form.elements.taskType.value,
    form.elements.taskTime.value,
    form.elements.taskFeedback.value
  );
});

function displayTasks() {
  tasklist.innerHTML = "";

  let localTasks = JSON.parse(localStorage.getItem("tasks"));

  if (localTasks !== null) {
    localTasks.forEach(function(task) {
      let item = document.createElement("li");
      item.setAttribute("data-id", task.id);

      let imageSrc = "";
      if (task.type === "Action") {
        imageSrc = "action.jpg";
      } else if (task.type === "Romance") {
        imageSrc = "romance.jpg";
      } else if (task.type === "Horror") {
        imageSrc = "horror.jpg";
      } else if (task.type === "Comedy") {
        imageSrc = "comedy.jpg";
      } else if (task.type === "Drama") {
        imageSrc = "drama.jpg";
      } else if (task.type === "SciFi") {
        imageSrc = "scifi.jpg";
      }

      item.innerHTML = `<div class="task-content">
        <div class="task-info">
          <h3>${task.name}</h3>
          <p>Genre: ${task.type}</p>
          <p>Your Rating: ${task.time}</p>
          <p>Your Review: ${task.feedback}</p>
          <p>Date: ${task.date}</p>
        </div>
        <div class="task-image">
          <img src="${imageSrc}" alt="${task.type}">
        </div>
      </div>`;

      tasklist.appendChild(item);

      form.reset();

      let delButton = document.createElement("button");
      let delButtonText = document.createTextNode("Delete");
      delButton.appendChild(delButtonText);
      item.appendChild(delButton);
      delButton.addEventListener("click", function(event) {
        localTasks.forEach(function(taskArrayElement, taskArrayIndex) {
          if (taskArrayElement.id == item.getAttribute("data-id")) {
            localTasks.splice(taskArrayIndex, 1);
          }
        });

        localStorage.setItem("tasks", JSON.stringify(localTasks));

        item.remove();
      });
    });
  }
}

function addTask(name, type, time, feedback) {
  let task = {
    name,
    type,
    id: generateUniqueId(),
    date: new Date().toLocaleString(),
    time,
    feedback
  };
  let localTasks = JSON.parse(localStorage.getItem("tasks"));
  if (localTasks == null) {
    localTasks = [task];
  } else {
    if (localTasks.find((element) => element.id === task.id)) {
      console.log("Task ID already exists");
    } else {
      localTasks.push(task);
    }
  }

  localStorage.setItem("tasks", JSON.stringify(localTasks));

  displayTasks();
}

function generateUniqueId() {
  return Date.now().toString() + Math.floor(Math.random() * 100).toString();
}

displayTasks();

function limitRating(input) {
  if (input.value > 10) {
    input.value = 10;
  }
}
