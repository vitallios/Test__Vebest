// Code

var Cards = [
  {
    id: 1,
    name: "Card 1",
    description: "Card 1 description",
    image:
      "https://sotni.ru/wp-content/uploads/2023/08/grustnaia-devochka-na-kacheliakh-5.webp",
    counter: 1,
  },
  {
    id: 2,
    name: "Card 2",
    description: "Card 2 description",
    image:
      "https://sotni.ru/wp-content/uploads/2023/08/grustnaia-devochka-na-kacheliakh-5.webp",
    counter: 1,
  },
  {
    id: 3,
    name: "Card 3",
    description: "Card 3 description",
    image:
      "https://sotni.ru/wp-content/uploads/2023/08/grustnaia-devochka-na-kacheliakh-5.webp",
    counter: 1,
  },
  {
    id: 4,
    name: "Card 4",
    description: "Card 4 description",
    image:
      "https://sotni.ru/wp-content/uploads/2023/08/grustnaia-devochka-na-kacheliakh-5.webp",
    counter: 1,
  },
  {
    id: 5,
    name: "Card 5",
    description: "Card 5 description",
    image:
      "https://sotni.ru/wp-content/uploads/2023/08/grustnaia-devochka-na-kacheliakh-5.webp",
    counter: 1,
  },
];

var carzina = [];

Cards.forEach((card) => {
  const cardList = document.querySelector(".catalog__list");
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");

  cardElement.setAttribute("value", `${card.counter}`);
  cardElement.innerHTML = `
    <div class="card__title">
      <h2>${card.name}</h2>
      <p>${card.description}</p>
    </div>
    <div class="card__image">
      <img src="${card.image}" alt="">
    </div>
    <div class="card__btns">
      <button id="${card.id}">Подробнее</button>
    </div>
  `;
  cardList.appendChild(cardElement);
});

//
//
let catalogCarzinaSpan = document.querySelector(".catalog__carzina-span");
const removeCarzina = document.querySelector(".removeCarzina");
const sessionStorageCarzinaValue = parseInt(
  sessionStorage.getItem("CARZINA_COUNTER")
);

removeCarzina.addEventListener("click", () => {
  sessionStorage.removeItem("CARZINA_COUNTER");
  localStorage.setItem("CARZINA_COUNTER", "");
  catalogCarzinaSpan.textContent = 0;
  carzina = [];
  location.reload();
});

catalogCarzinaSpan.textContent = sessionStorageCarzinaValue
  ? sessionStorageCarzinaValue
  : 0;

//

const fModal = (Content, Title, Counter) => {
  let modal = document.createElement("div");
  modal.classList.add("modal");
  modal.classList.add("active");
  window.document.body.appendChild(modal);
  modal.innerHTML = `
        <div class="modal__content">
        <button class="modal__clous">X</button>
        <h2>${Title}</h2>
        <p>${Content}</p>
        <div class="modal__counter">
        <button class="counter__minus">-</button>
        <span>${Counter}</span>
        <button class="counter__pluss">+</button>
        </div>
        <button class="addCarzina">Добавить в карзину</button>
        </div>
        `;

  const modalRemove = () => {
    let modal = document.querySelector(".modal");
    modal.classList.remove("active");
    window.document.body.removeChild(modal);
  };

  const modalClous = document.querySelector(".modal__clous");
  //
  const counterPluss = document.querySelector(".counter__pluss");
  const counterMinus = document.querySelector(".counter__minus");
  const addCarzina = document.querySelector(".addCarzina");
  let counterNumber = document.querySelector(".modal__counter");
  catalogCarzinaSpan = document.querySelector(".catalog__carzina-span");
  let userCounter;

  //
  counterPluss.addEventListener("click", () => {
    if (counterNumber.children[1].textContent >= 0) {
      userCounter = parseInt(counterNumber.children[1].textContent++ + 1);
    }
  });
  //
  counterMinus.addEventListener("click", () => {
    if (counterNumber.children[1].textContent > 1) {
      userCounter = parseInt(counterNumber.children[1].textContent--);
    }
  });

  addCarzina.addEventListener("click", () => {
    userCounter = userCounter ? userCounter : 1;

    // Добавление в карзину
    carzina.push({
      name: Title,
      description: Content,
      counter: userCounter,
    });
    // Находим количество продукта которое указывали в карточках(counter: userCounter)
    //  и складываем между собой
    let useCounterRezult = carzina.reduce((acc, card) => {
      return acc + card.counter;
    }, 0);

    if (sessionStorageCarzinaValue) {
      catalogCarzinaSpan.textContent = parseInt(
        sessionStorageCarzinaValue + useCounterRezult
      );
    } else {
      catalogCarzinaSpan.textContent = useCounterRezult;
    }

    // сохраняем данные в памяти
    window.sessionStorage.setItem(
      "CARZINA_COUNTER",
      `${catalogCarzinaSpan.textContent}`
    );
    modalRemove();
  });

  // Кнопка закрытия модального окна
  modalClous.addEventListener("click", () => {
    modalRemove();
  });

  // удаление модального окна при клике на крестик
  modalClous.addEventListener("click", () => {
    modalRemove();
  });
  // удаление модального окна при клике на темную подложку
  window.addEventListener("click", (e) => {
    if (e.target.classList == "modal active") {
      modalRemove();
    }
  });
};

const cardBtns = document.querySelectorAll(".card__btns button");

cardBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Заголовок продукта
    let cardTitle =
      e.target.parentElement.parentElement.firstElementChild.firstElementChild
        .textContent;
    // описание продукта
    let cardContent =
      e.target.parentElement.parentElement.firstElementChild.lastElementChild
        .textContent;
    // Количество продукта
    let cardCounter = e.target.parentElement.parentElement.value;
    fModal(cardContent, cardTitle, cardCounter);
  });
});
