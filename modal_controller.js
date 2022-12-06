// const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
import data from './data.json';

let title = document.getElementById('title');
let subtitle = document.getElementById('subtitle');
let date = document.getElementById('date');
let description = document.getElementById('description');
let project_image = document.getElementById('project_image');
let project_link = document.getElementById('project_link');
let github_link = document.getElementById('github_link');
let credits = document.getElementById('credits');

let opened = false;

// console.log(data.pool_table.title);
// openModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     openModal(modal)
//   })
// })

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal, project) {
  if (modal == null) return
  modal.scrollTo(0,0);
  title.textContent = data[project].title;
  subtitle.textContent = data[project].subtitle;
  date.textContent = data[project].date;
  description.textContent = data[project].description;
  project_image.src = data[project].project_image;
  if (data[project].project_link == "") {
    project_link.style.display = "none";
  }
  else
  {
    project_link.style.display = "";
  }
  project_link.href = data[project].project_link;
  if (data[project].github_link == "") {
    github_link.style.display = "none";
  }
  else
  {
    github_link.style.display = "";
  }
  github_link.href = data[project].github_link;
  credits.textContent = data[project].credits;

  modal.classList.add('active')
  overlay.classList.add('active')

  opened = true;
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
  opened = false;
}

const pressEsc = (event) => {
	if(event.key === "Escape" && opened) {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
        closeModal(modal)
  })
    }
}

window.addEventListener("keydown", pressEsc)

// export { openModalButtons, closeModalButtons, overlay, openModal, closeModal };
export { closeModalButtons, overlay, openModal, closeModal };