import { MENU } from '../data/menu-data.js'

export function renderMenu(category) {
  const grid = document.getElementById('menu-grid')
  if (!grid) return

  grid.innerHTML = ''

  const selections = window.selections || {}
  const activeMenu = window.activeMenu || 'midi'

  const items = MENU.filter(item => {
    const menuOk = item.menu === 'both' || item.menu === activeMenu
    const categoryOk = item.category === category
    return menuOk && categoryOk
  })

  const groups = {}

  items.forEach(item => {
    const key = item.groupKey || 'group.other'
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  })

  Object.entries(groups).forEach(([groupKey, groupItems]) => {
    const title = document.createElement('h2')
    title.className = 'menu-group-title'
    title.textContent = window.t(groupKey)
    grid.appendChild(title)

    groupItems.forEach((item, index) => {
      const entry = selections[item.category]?.find(e => e.item.id === item.id)

      const card = document.createElement('div')
      card.className = 'card'
      card.onclick = () => window.openOverlay(item)

      card.innerHTML = `
        <img src="${item.image}" alt="${window.t(item.titleKey)}">
        <div class="info">
          <h3>${window.t(item.titleKey)}</h3>
          <p>${window.t(item.descriptionKey)}</p>
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
      `

      const row = document.createElement('div')
      row.className = 'card-row'
      if (index < groupItems.length - 1) row.classList.add('with-divider')

      row.appendChild(card)
      grid.appendChild(row)
    })
  })
}
