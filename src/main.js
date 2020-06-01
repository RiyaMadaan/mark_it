const setUserName = userName => {
  const today = new Date();
  const currentHours = today.getHours();
  let greetingPrefix = "Good Morning";
  if (currentHours > 11 && currentHours < 16) {
    greetingPrefix = "Good Afternoon";
  }
  if (currentHours > 15 && currentHours <= 23) {
    greetingPrefix = "Good Evening";
  }
  document.getElementById(
    "greeting"
  ).innerText = `${greetingPrefix} \t ${userName}`;
};

const createElement = (elementType, className, id = "", body = "") => {
  const element = document.createElement(elementType);
  element.className = className;
  element.id = id;
  element.innerHTML = body;
  return element;
};

const clearInputField = () => {
  document.getElementById("name-input").value = "";
};

const set = () => {
  const userName = document.getElementById("name-input").value;
  if (userName != "") {
    localStorage.setItem("userName", userName);
    setUserName(userName);
    clearInputField();
  }
};

const displayUser = () => {
  const userName = localStorage.getItem("userName");
  if (userName != null) {
    setUserName(userName);
  }
};

const buildImagePopup = () => {
  const popupHeaderText = document.getElementById("popup-header-text");
  popupHeaderText.innerHTML = "Change Background Image";
  showPopup();
  // const imageInputBox = createElement("input", "inputFileToLoad");
  // imageInputBox.type = "file";

  // const box = createElement("div", "", "", `Add Image: ${box}`);
  // console.log("box is", box);
};

// const alreadyHasWidth = width => {
//   return +width.substr(0, width.length - 1) > 0 || 0;
// };

const buildNamePopup = () => {
  // const popup = document.getElementById("popup-main").style.width;

  // if (alreadyHasWidth(popup)) {
  //   return;
  // }

  const popupHeaderText = document.getElementById("popup-header-text");
  popupHeaderText.innerHTML = "Change  Greeting  Name";
  showPopup();
  const popupBody = document.getElementById("popup-body");

  nameInputBox = createElement("input", "", "name-input");
  // nameInputBox.placeholder = "Type your name here.....";
  // nameInputBox.autocomplete = "off";

  // const nameInputButton = createElement(
  //   "button",
  //   "",
  //   "name-input-button",
  //   "Update"
  // );
  // nameInputButton.onclick = set;

  // popupBody.appendChild(nameInputBox);
  // popupBody.appendChild(nameInputButton);
};

const showPopup = () => {
  document.getElementById("popup-main").style.width = "30%";
};

const initialize = () => {
  document
    .getElementById("image-popup")
    .addEventListener("click", buildImagePopup);
  document
    .getElementById("greeting-name-box")
    .addEventListener("click", buildNamePopup);

  window.onkeydown = event => {
    if (event.keyCode == 27) {
      if (document.getElementById("name-input-button")) {
        console.log("exists");
        document.getElementById("name-input-button").remove();
        document.getElementById("name-input").remove();
      }
      document.getElementById("popup-main").style.width = "0%";

      console.log("escape pressed");
    }
  };
  displayUser();
};

window.onload = initialize;