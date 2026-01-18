import { MENU } from '../data/menu-data.js'

const grid = document.getElementById('menu-grid')

export function renderStep(category) {
  grid.innerHTML = ''

  MENU
    .filter(item => item.category === category)
    .forEach(item => {
      const card = document.createElement('div')
      card.className = 'card'

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="info">
          <div class="info-titre">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
          <div class="info-titre-btn">
            <span>${item.price}€</span>
            <button class="select-btn" data-id="${item.id}">Voir</button>
          </div>
        </div>
      `

      // 👉 clic sur la carte = ouvrir l’overlay
      card.addEventListener('click', () => {
        window.openOverlay(item)
      })

      // clic sur le bouton = même comportement
      const btn = card.querySelector('.select-btn')
      btn.addEventListener('click', (e) => {
        e.stopPropagation() // évite double déclenchement
        window.openOverlay(item)
      })



      grid.appendChild(card)
    })
}
