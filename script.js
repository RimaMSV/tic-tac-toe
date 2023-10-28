const modalEl = document.querySelector("#modal");
const openModalEl = document.querySelector('.open');

openModalEl.addEventListener("click", () => {
    modalEl.showModal();
})