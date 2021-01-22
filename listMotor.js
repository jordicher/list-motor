const printTime = document.getElementById("printTime");
const printUsers = document.getElementById("printUsers");
const fragment = document.createDocumentFragment();
const ulListTime = document.createElement("ul");
ulListTime.className = "list-group";

let ms = 1800000; /* 1 800 000ms = 30 minutes */
var addSm = 25200000; 
var idUser = "";

const users = [
  {
    name: "Maria",
    reservedHours: ["hour1", "hour3", "hour6", "hour15"],
  },
  {
    name: "Jose",
    reservedHours: ["hour2", "hour7", "hour10", "hour18"],
  },
  {
    name: "Pedro",
    reservedHours: ["hour2", "hour10", "hour20", "hour21"],
  },
  {
    name: "Lorena",
    reservedHours: ["hour2", "hour3", "hour10", "hour17"],
  },
  {
    name: "Marc",
    reservedHours: ["hour2", "hour10", "hour11", "hour19"],
  },
  {
    name: "Alicia",
    reservedHours: ["hour2", "hour10", "hour20", "hour24"],
  },
  {
    name: "Manel",
    reservedHours: ["hour2", "hour3", "hour10", "hour23"],
  },
  {
    name: "Lucas",
    reservedHours: ["hour2", "hour3", "hour10", "hour20"],
  },
  {
    name: "Borja",
    reservedHours: ["hour1", "hour10", "hour12", "hour20"],
  },
  {
    name: "Brandon",
    reservedHours: ["hour2", "hour4", "hour14", "hour20"],
  },
];

const hoursReserve = [];

/* Pasar las horas a formato AM PM le pasarmos la fecha en formato ms*/
const getHourAMPM = (time) => {
  let timeString = time.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return timeString;
};

/* Añadir usuarios a horas reservadas */
const updateResUsers = () => {
  for (let i = 0; i < users.length; i++) {
    users[i].reservedHours.forEach((reserved) => {
      for (const hours of hoursReserve) {
        if (hours.id == reserved) {
          if (hours.users.includes(i)) {
          } else {
            hours.users.push(i);
          }
        }
      }
    });
  }
};

for (let i = 0; i <= 24; i++) {
  var time = new Date(addSm);
  addSm += ms;
  let objectHour = {
    id: `hour${i}`,
    hour: getHourAMPM(time),
    users: [],
  };
  hoursReserve.push(objectHour);
}

const impUsers = () => {
  users.map((user, index) => {
    let div = document.createElement("div");
    div.className = "form-checkS";
    let input = document.createElement("input");
    input.type = "radio";
    input.className = "form-check-input";
    input.name = "userRadio";
    input.id = index;
    let label = document.createElement("label");
    label.textContent = user.name;
    div.appendChild(input);
    div.appendChild(label);
    fragment.appendChild(div);
  });
  printUsers.appendChild(fragment);
};
impUsers();

const selectUser = document.getElementsByName("userRadio");

for (let i = 0; i < selectUser.length; i++) {
  selectUser[i].addEventListener("change", (e) => {
    idUser = e.target.id;

    printListTime();
    addReserveUser();
  });
}

const allHours = () => {
  const hours = document.getElementsByClassName("hour");

  for (const hour of hours) {
    hour.addEventListener("click", (e) => {
      if (idUser == "") {
        alert("Selecciona un usuario, por favor");
        return;
      }
      let inside = users[idUser].reservedHours.indexOf(e.target.id);

      if (inside === -1) {
        if (parseInt(e.target.lastChild.innerText) > 7) {
          //revisar que no hay más de 8
          alert(
            "No hay motos para reservar, otro usuario debe liberar el slot"
          );
          return;
        } else {
          users[idUser].reservedHours.push(e.target.id);
        }
      } else {
        users[idUser].reservedHours.splice(inside, 1);
      }

      /* Reiniciar */
      for (let z = 0; z < hoursReserve.length; z++) {
        hoursReserve[z].users = [];
      }

      printListTime();
      addReserveUser();
    });
  }
};

/* El usuario seleccionado se pone un color de fondo a la lista segun las horas seleccionadas */
const addReserveUser = () => {
  for (const hoursUser of users[idUser].reservedHours) {
    let h = document.getElementById(hoursUser);
    h.classList.add("bg-primary");
  }
};

/* Imprimir lista */
const printListTime = () => {
  updateResUsers();
  ulListTime.innerHTML = "";
  var classLi =
    "list-group-item d-flex justify-content-between align-items-center hour";

  for (let i = 0; i < hoursReserve.length; i++) {
    let li = document.createElement("li");
    li.id = `hour${i}`;
    li.className = classLi;
    li.textContent = hoursReserve[i].hour;

    let span = document.createElement("span");

    if (hoursReserve[i].users.length < 8) {
      span.className = "badge bg-secondary";
    } else {
      span.className = "badge bg-danger";
    }
    span.textContent = hoursReserve[i].users.length;
    li.appendChild(span);
    ulListTime.appendChild(li);
  }

  printTime.appendChild(ulListTime);
  allHours();
};

printListTime();
