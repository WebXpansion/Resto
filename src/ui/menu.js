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
            <span>${Number(item.price).toFixed(2)}€</span>

            <p>${item.description}</p>
          </div>
         
        </div>
      `

      // 👉 clic sur la carte = ouvrir l’overlay
      card.addEventListener('click', () => {
        window.openOverlay(item)
      })

   



      grid.appendChild(card)
    })
}
