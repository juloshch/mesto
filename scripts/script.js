let buttonOpenPopup = document.querySelector(".edit-but")
let buttonClosePopup = document.querySelector(".popup__close-image")
let popup = document.querySelector(".popup")

let openPopup = () => {
    let captionName = document.querySelector(".caption__name");
    let name = captionName.innerText;
    console.log(name);
    let popupName = document.querySelector(".popup__field-name");
    popupName.value = name;

    let captionParagraph = document.querySelector(".caption__paragraph");
    let paragraph = captionParagraph.innerText;
    let popupParagraph = document.querySelector(".popup__field-paragraph");
    popupParagraph.value = paragraph;

    popup.classList.toggle("popup_is-opened");
}

let formElement = document.querySelector(".popup__container");

let formSubmitHandler = (evt) => {
    evt.preventDefault()

    let nameInput = document.querySelector(".popup__field-name");
    let name = nameInput.value;
    let newName = document.querySelector(".caption__name");
    newName.textContent = name;

    let jobInput = document.querySelector(".popup__field-paragraph");
    let job = jobInput.value;
    let newJob = document.querySelector(".caption__paragraph");
    newJob.textContent = job;

    popup.classList.toggle("popup_is-opened");
}

let popupToggle = () => {
    popup.classList.toggle("popup_is-opened");
}

buttonOpenPopup.addEventListener("click", openPopup);
buttonClosePopup.addEventListener("click", popupToggle);
formElement.addEventListener('submit', formSubmitHandler); 