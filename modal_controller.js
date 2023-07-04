// const openModalButtons = document.querySelectorAll('[data-modal-target]')
import data from './data.json';
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const date = document.getElementById('date');
const description = document.getElementById('description');
const projectImage = document.getElementById('project_image');
const projectLink = document.getElementById('project_link');
const githubLink = document.getElementById('github_link');
const credits = document.getElementById('credits');

let opened = false;

// console.log(data.pool_table.title);
// openModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     openModal(modal)
//   })
// })

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal);
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  });
});

function openModal (modal, project) {
  if (modal == null) return;
  modal.scrollTo(0, 0);
  title.textContent = data[project].title;
  subtitle.textContent = data[project].subtitle;
  date.textContent = data[project].date;
  description.textContent = data[project].description;
  projectImage.src = data[project].project_image;
  if (data[project].project_link === '') {
    projectLink.style.display = 'none';
  } else {
    projectLink.style.display = '';
  }
  projectLink.href = data[project].project_link;
  if (data[project].github_link === '') {
    githubLink.style.display = 'none';
  } else {
    githubLink.style.display = '';
  }
  githubLink.href = data[project].github_link;
  credits.textContent = data[project].credits;

  modal.classList.add('active');
  overlay.classList.add('active');

  opened = true;
}

function closeModal (modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
  opened = false;
}

const pressEsc = (event) => {
  if (event.key === 'Escape' && opened) {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
      closeModal(modal);
    });
  }
};

window.addEventListener('keydown', pressEsc);

// export { openModalButtons, closeModalButtons, overlay, openModal, closeModal };
export { closeModalButtons, overlay, openModal, closeModal };
