import { MENU } from '../data/menu-data.js'

const grid = document.getElementById('menu-grid')

export function renderMenu(category = 'all') {
  grid.innerHTML = ''

  const selections = window.selections || {}

  const activeMenu = window.activeMenu || 'midi'

  const items = MENU.filter(item => {
    const menuOk = item.menu === 'both' || item.menu === activeMenu
    const categoryOk = category === 'all' || item.category === category
    return menuOk && categoryOk
  })
  

  items.forEach(item => {
    const list = selections[item.category] || []
    const entry = list.find(e => e.item.id === item.id)

    const card = document.createElement('div')
    card.className = 'card'

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="info">
        <div class="info-titre">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="price-row">
            <span class="price">${item.price.toFixed(2)}€</span>
            ${
              entry
                ? `<span class="separator">|</span>
                   <span class="qty">Qté : ${entry.quantity}</span>`
                : ''
            }
          </div>
        </div>
      </div>
    `

    if (entry) {
      const check = document.createElement('img')
      check.src = '/images/check.svg'
      check.className = 'card-check'
      card.querySelector('.info').appendChild(check)
    }

    card.onclick = () => window.openOverlay(item)

    const wrapper = document.createElement('div')
    wrapper.className = 'card-row'
    wrapper.appendChild(card)

    grid.appendChild(wrapper)
  })
}
