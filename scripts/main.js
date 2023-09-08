/* Developed by Omar Abu Snineh */
let infoTasks = [
  {
    title: "Brush Teeth",
    date: "09 / 08 / 2023",
    time: "17:48:31",
    isDone: false,
  },
  {
    title: "English Learn",
    date: "09 / 08 / 2023",
    time: "17:50:33",
    isDone: true,
  },
  {
    title: "Quran Reading",
    date: "09 / 08 / 2023",
    time: "17:50:59",
    isDone: false,
  },
];

resetInfoTasks();

const addition = document.querySelector("#addition");
let tasks = document.querySelector(".tasks");
let bgColor = "";

const currentDate = new Date();
function theDate() {
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const date = `${day} / ${month} / ${year}`;
  return date;
}

function theTime() {
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const time = `${hours}:${minutes}:${seconds}`;
  return time;
}

function taskLoop() {
  for (i in infoTasks) {
    var task = `
            <div
                class="task ${
                  infoTasks[i].isDone ? "bg-blue-300" : "bg-zinc-200"
                }  w-full h-[6rem] rounded-lg shrink-0 flex flex-nowrap justify-around items-center"
                >
                <div class="context flex-1 ml-14 font-medium mb-6">${
                  infoTasks[i].title
                }
                <h2 class="absolute font-thin text-xs leading-10">Date Created: 
                ${infoTasks[i].date} | Time: ${infoTasks[i].time}</h2>
                </div>
                <div class="control flex-none mr-14 space-x-2">
                  <button onClick="updateTask(${i})" 
                    class="right-5 top-2 rounded-full ${
                      infoTasks[i].isDone ? "bg-blue-300" : "bg-zinc-200"
                    } px-3.5 py-2 text-base text-gray-500 font-medium transition duration-200 hover:bg-zinc-300 active:bg-zinc-100"
                  >
                    <i class="fa-solid fa-pencil"></i>
                  </button>
                  <button onClick="isDoneTask(${i})"
                    class="right-5 top-2 rounded-full 
                    ${infoTasks[i].isDone ? "bg-blue-300" : "bg-zinc-200"}
                    px-3.5 py-2 text-base text-gray-500 font-medium transition duration-200 hover:bg-zinc-300 active:bg-zinc-100"
                  >
                  ${
                    infoTasks[i].isDone
                      ? '<i class="fa-solid fa-circle-xmark"></i>'
                      : '<i class="fa-solid fa-circle-check"></i>'
                  }
                  </button>
                  <button onClick="deleteTask(${i})" 
                    class="right-5 top-2 rounded-full 
                    ${infoTasks[i].isDone ? "bg-blue-300" : "bg-zinc-200"}
                    px-3.5 py-2 text-base text-gray-500 font-medium transition duration-200 hover:bg-zinc-300 active:bg-zinc-100"
                  >
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
            </div>
          `;
    tasks.innerHTML += task;
  }
}

taskLoop();

addition.addEventListener("click", () => {
  const date = theDate();
  let time = theTime();
  console.log("🚀 ~ addition.addEventListener ~ time:", time);
  console.log("🚀 ~ addition.addEventListener ~ date:", date);
  const titleTask = prompt("Enter Your Title of Task");
  console.log("🚀 ~ addition.addEventListener ~ tilte:", titleTask);
  if (titleTask != null && titleTask != "") {
    infoTasks.push({
      title: titleTask,
      date: date,
      time: time,
      isDone: false,
    });
    refreshingAndLocalSrorage();
    console.log("infoAfter", infoTasks);
  } else if (titleTask === "") {
    alert("Please add your task with some title");
  }
});

function deleteTask(ind) {
  const isSure = confirm(
    `Are you sure you want to delete the task : ${infoTasks[ind].title}`
  );
  if (isSure) {
    infoTasks.splice(ind, 1);
    refreshingAndLocalSrorage();
    console.log("🚀 ~ deleteTask ~ index:", ind);
  }
}

function updateTask(ind) {
  const newTitleTask = prompt(
    `Enter Your New Title for Task : ${infoTasks[ind].title}`
  );
  if (newTitleTask != null && newTitleTask != "") {
    infoTasks[ind].title = newTitleTask;
    refreshingAndLocalSrorage();
  } else if (newTitleTask === "") {
    alert("Please add your task with some title");
  }
}

function isDoneTask(ind) {
  if (!infoTasks[ind].isDone) {
    infoTasks[ind].isDone = true;
  } else {
    infoTasks[ind].isDone = false;
  }
  refreshingAndLocalSrorage();
  console.log("🚀 ~ isCheck ~ infoTasks[ind].isDone:", infoTasks[ind].isDone);
}

function refreshing() {
  tasks.innerHTML = "";
  taskLoop();
}

// Local Storage Values
function savedActionsOnTask() {
  // //(setting localStorage)// //

  let strTasks = JSON.stringify(infoTasks);
  localStorage.setItem("infoTasks", strTasks);
}

function refreshingAndLocalSrorage() {
  savedActionsOnTask();
  refreshing();
}

function resetInfoTasks() {
  // //(getting localStorage)// //

  //_______________form one
  // infoTasks = JSON.parse(localStorage.getItem("infoTasks"));
  // if (infoTasks === null) {
  //   infoTasks = [];
  // }

  //_______________form two
  // let reset = JSON.parse(localStorage.getItem("infoTasks"));
  // if (reset === null) {
  //   infoTasks = [];
  // } else {
  //   infoTasks = reset;
  // }

  //_______________form three
  infoTasks = JSON.parse(localStorage.getItem("infoTasks")) ?? [];
}
