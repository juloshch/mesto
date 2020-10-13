let buttonOpenPopup = document.querySelector(".edit-but");
let buttonClosePopup = document.querySelector(".popup__close-image");
let popup = document.querySelector(".popup");
let captionName = document.querySelector(".caption__name");
let captionParagraph = document.querySelector(".captions__paragraph");
let popupFieldName = document.querySelector(".popup__field_type_name");
let popupFieldParagraph = document.querySelector(".popup__field_type_paragraph");
let formElement = document.querySelector(".popup__container");

let popupToggle = () => {
    popup.classList.toggle("popup_is-opened");
};

let openPopup = () => {
    popupFieldName.value = captionName.innerText;
    popupFieldParagraph.value = captionParagraph.innerText;
    popupToggle();
};

let formSubmitHandler = (evt) => {
    evt.preventDefault();
    captionName.textContent = popupFieldName.value;
    captionParagraph.textContent = popupFieldParagraph.value;
    popupToggle();
};

buttonOpenPopup.addEventListener("click", openPopup);
buttonClosePopup.addEventListener("click", popupToggle);
formElement.addEventListener('submit', formSubmitHandler); 