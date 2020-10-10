let buttonOpenPopup = document.querySelector(".edit-but");
let buttonClosePopup = document.querySelector(".popup__close-image");
let popup = document.querySelector(".popup");
let captionName = document.querySelector(".caption__name");
let captionParagraph = document.querySelector(".captions__paragraph");
let popupFieldName = document.querySelector(".popup__field_name");
let popupFieldParagraph = document.querySelector(".popup__field_paragraph");
let formElement = document.querySelector(".popup__container");

let popupToggle = (evt) => {
    evt.preventDefault();
    popup.classList.toggle("popup_is-opened");
}

let openPopup = (evt) => {
    popupFieldName.value = captionName.innerText;
    popupFieldParagraph.value = captionParagraph.innerText;
    popupToggle(evt);
}

let formSubmitHandler = (evt) => {
    evt.preventDefault();
    captionName.textContent = popupFieldName.value;
    captionParagraph.textContent = popupFieldParagraph.value;
    popupToggle(evt);
}

buttonOpenPopup.addEventListener("click", openPopup);
buttonClosePopup.addEventListener("click", popupToggle);
formElement.addEventListener('submit', formSubmitHandler); 