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
      const check = document.createElement('span')
      check.className = 'card-check'
      check.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.6103 3.45613C24.1299 3.9952 24.1299 4.866 23.6103 5.40507L8.95378 20.5957C8.42082 21.1348 7.5814 21.1348 7.06176 20.5957L0.399722 13.6846C-0.133241 13.1317 -0.133241 12.2609 0.399722 11.7218C0.919361 11.1689 1.75878 11.1689 2.27842 11.7218L7.99445 17.6516L21.7049 3.41467C22.2246 2.86178 23.064 2.86178 23.5836 3.41467Z"/>
      </svg>
      `

      card.querySelector('.info').appendChild(check)
    }

    card.onclick = () => window.openOverlay(item)

    const wrapper = document.createElement('div')
    wrapper.className = 'card-row'
    wrapper.appendChild(card)

    grid.appendChild(wrapper)
  })
}
