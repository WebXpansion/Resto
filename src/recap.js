const grid = document.getElementById('recap-grid')
const selections = window.opener?.selections || window.selections || {}

function t(key) {
  return window.TRANSLATIONS?.[key] || key
}

grid.innerHTML = ''

Object.values(selections).forEach(list => {
  list.forEach(({ item, quantity }) => {
    const card = document.createElement('div')
    card.className = 'card'

    card.innerHTML = `
      <img src="${item.image}" alt="${t(item.titleKey)}">
      <div class="info">
        <div class="info-titre">
          <h3>${t(item.titleKey)}</h3>
          <p>${t(item.descriptionKey)}</p>
          <div class="price-row">
            <span class="price">${item.price.toFixed(2)}€</span>
            <span class="separator">|</span>
            <span class="qty">Qté : ${quantity}</span>
          </div>
        </div>
      </div>
    `

    const wrapper = document.createElement('div')
    wrapper.className = 'card-row visible'
    wrapper.appendChild(card)

    grid.appendChild(wrapper)
  })
})
