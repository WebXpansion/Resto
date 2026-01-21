import { MENU } from '../data/menu-data.js'

const grid = document.getElementById('menu-grid')

export function renderMenu(category) {
  grid.innerHTML = ''

  const selections = window.selections || {}
  const activeMenu = window.activeMenu || 'midi'

  // 1️⃣ Filtrage menu (midi / soir) + catégorie
  const items = MENU.filter(item => {
    const menuOk = item.menu === 'both' || item.menu === activeMenu
    const categoryOk = item.category === category
    return menuOk && categoryOk
  })

  // 2️⃣ Groupement par sous-catégorie
  const groups = {}

  items.forEach(item => {
    const key = item.group || 'Autres'
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
  })

  // 3️⃣ Render
  Object.entries(groups).forEach(([groupName, groupItems]) => {
    // 🔹 Titre de groupe
    const title = document.createElement('h2')
    title.className = 'menu-group-title'
    title.textContent = groupName
    grid.appendChild(title)

    // 🔹 Cartes
    groupItems.forEach((item, index) => {
      const entry = selections[item.category]?.find(e => e.item.id === item.id)
    
      const card = document.createElement('div')
      card.className = 'card'
      card.onclick = () => window.openOverlay(item)
    
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="info">
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
      `
    
      const row = document.createElement('div')
      row.className = 'card-row'
    
      // ✅ ligne SEULEMENT si ce n’est PAS le dernier item du groupe
      if (index < groupItems.length - 1) {
        row.classList.add('with-divider')
      }
    
      row.appendChild(card)
      grid.appendChild(row)
    })
    
  })
}
