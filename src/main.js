import './style.css'
import './ui/menu.css'
import { renderMenu } from './ui/menu.js'
import { initViewer } from './viewer.js'

// ===============================
// 🔢 ÉTAT GLOBAL
// ===============================
let previewItem = null
let currentQty = 1

const selections = {
  drink: [],
  starter: [],
  pizza: [],
  dessert: [],
  formule: []
}

let overlayFromRecap = false
let activeMenu = 'midi'
window.activeMenu = activeMenu



window.selections = selections

window.addEventListener('load', () => {
  const intro = document.getElementById('intro')
  const discover = document.getElementById('intro-discover')
  const menu = document.getElementById('intro-menu')

  setTimeout(() => discover.classList.add('visible'), 200)
  setTimeout(() => menu.classList.add('visible'), 800)

  setTimeout(() => {
    intro.classList.add('hidden')
  }, 2000)
})


// ===============================
// 🎯 ELEMENTS UI
// ===============================
const qtyValue = document.getElementById('qty-value')
const qtyPlus = document.getElementById('qty-plus')
const qtyMinus = document.getElementById('qty-minus')
const arBtn = document.getElementById('ar')

const overlay = document.getElementById('overlay')
const sheet = document.getElementById('sheet')
const sheetBackBtn = document.getElementById('sheet-back')
const sheetTitle = document.getElementById('sheet-title')
const sheetDesc = document.getElementById('sheet-desc')
const sheetPrice = document.getElementById('sheet-price')
const viewerLoader = document.getElementById('viewer-loader')

const cartBadge = document.querySelector('.cart-badge')
let cartCount = 0


function updateCartBadge() {
  if (cartCount > 0) {
    cartBadge.classList.remove('hidden')
    cartBadge.textContent = Math.min(cartCount, 99)
  } else {
    cartBadge.classList.add('hidden')
  }
}

// ===============================
// ➕ / ➖ QUANTITÉ
// ===============================
qtyPlus.onclick = () => {
  currentQty++
  qtyValue.textContent = currentQty
}

qtyMinus.onclick = () => {
  if (currentQty > 0) {
    currentQty--
    qtyValue.textContent = currentQty
  }
}

// ===============================
// 🌐 OVERLAY
// ===============================
window.openOverlay = (item) => {
  previewItem = item

  arBtn.style.display = item.model ? 'flex' : 'none'

  const list = selections[item.category] || []
  const existing = list.find(e => e.item.id === item.id)
  

  currentQty = existing ? existing.quantity : 1
  qtyValue.textContent = currentQty

  sheetTitle.textContent = item.title
  sheetDesc.textContent = item.description
  sheetPrice.textContent = `${item.price.toFixed(2)}€`

  overlay.classList.remove('hidden')
  sheet.classList.remove('hidden')

  requestAnimationFrame(() => {
    overlay.classList.add('active')
    sheet.classList.add('active')
  })

  viewerLoader.classList.remove('hidden')

  if (item.model) {
    initViewer(item, () => viewerLoader.classList.add('hidden'))
  } else {
    viewerLoader.textContent = 'Aucune 3D disponible'
  }
}

function closeOverlay() {
  overlay.classList.remove('active')
  sheet.classList.remove('active')

  setTimeout(() => {
    overlay.classList.add('hidden')
    sheet.classList.add('hidden')
  }, 300)
}

overlay.onclick = (e) => {
  if (e.target === overlay) closeOverlay()
}

sheetBackBtn.onclick = closeOverlay

// ===============================
// ✅ CONFIRMATION
// ===============================
document.getElementById('overlay-confirm').onclick = () => {
  if (!previewItem) return

  const list = selections[previewItem.category]
  const existing = list.find(e => e.item.id === previewItem.id)

  if (!existing && currentQty > 0) {
    list.push({ item: previewItem, quantity: currentQty })
    cartCount++
    updateCartBadge()
  }
  
  if (existing && currentQty === 0) {
    list.splice(list.indexOf(existing), 1)
    cartCount = Math.max(cartCount - 1, 0)
    updateCartBadge()
  }
  
  if (existing && currentQty > 0) {
    existing.quantity = currentQty
  }
  

  closeOverlay()

  if (overlayFromRecap) {
    renderRecap()
    overlayFromRecap = false
  } else {
    renderMenu(currentFilter)
    requestAnimationFrame(animateCards)
  }
  
  
}

// ===============================
// 📱 AR (iOS)
// ===============================
function isAppleDevice() {
  return /iPhone|iPod|iPad/.test(navigator.userAgent)
}
function openQuickLook(usdzUrl) {
  const link = document.createElement('a')
  link.setAttribute('rel', 'ar')
  link.setAttribute('href', usdzUrl)

  const img = document.createElement('img')
  img.src = '/images/ar.svg'
  img.style.display = 'none'

  link.appendChild(img)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

arBtn.onclick = () => {
  if (!previewItem?.model || !isAppleDevice()) return

  const usdzUrl = `/models/${previewItem.model.replace('.glb', '.usdz')}`
  openQuickLook(usdzUrl)
}

// ===============================
// 🚀 INIT
// ===============================
let currentFilter = 'formule'
renderMenu(currentFilter)
requestAnimationFrame(animateCards)

function animateCards() {
  const rows = document.querySelectorAll('.card-row')

  rows.forEach((row, index) => {
    row.classList.remove('visible')

    setTimeout(() => {
      row.classList.add('visible')
    }, index * 60)
  })
}

//filtre
const filterButtons = document.querySelectorAll('.filter')

filterButtons.forEach(btn => {
  btn.onclick = () => {
    filterButtons.forEach(b => b.classList.remove('active'))
    btn.classList.add('active')

    currentFilter = btn.dataset.filter
    renderMenu(currentFilter)
    requestAnimationFrame(animateCards)
  }
})


const menuSwitch = document.querySelector('.menu-switch')
const menuDropdown = document.querySelector('.menu-dropdown')
const menuLabel = document.querySelector('.menu-label')



menuSwitch.onclick = () => {
  menuDropdown.classList.toggle('hidden')
  menuSwitch.classList.toggle('open')
}

menuDropdown.querySelectorAll('button').forEach(btn => {
  btn.onclick = () => {
    menuDropdown.querySelectorAll('button')
      .forEach(b => b.classList.remove('active'))
  
    btn.classList.add('active')
    activeMenu = btn.dataset.menu
    window.activeMenu = activeMenu
  
    if (activeMenu === 'soir') {
      document.body.classList.add('theme-soir')
    } else {
      document.body.classList.remove('theme-soir')
    }
  
    menuLabel.textContent = btn.textContent
    menuDropdown.classList.add('hidden')
    menuSwitch.classList.remove('open')
  
    // 🔁 SI ON EST SUR LE RÉCAP → RAFRAÎCHIR
    if (!recapSection.classList.contains('hidden')) {
      renderRecap()
    } else {
      renderMenu(currentFilter)
      requestAnimationFrame(animateCards)
    }
  }
  
})


// clic extérieur → fermeture
document.addEventListener('click', (e) => {
  if (!menuSwitch.contains(e.target) && !menuDropdown.contains(e.target)) {
    menuDropdown.classList.add('hidden')
    menuSwitch.classList.remove('open')
  }
})


const recapSection = document.getElementById('recap-section')
const recapGrid = document.getElementById('recap-grid')
const menuGrid = document.getElementById('menu-grid')
const filters = document.getElementById('filters')


const cartBtn = document.querySelector('.cart-btn')
const recapBackBtn = document.getElementById('recap-back-btn')

if (cartBtn && recapBackBtn) {
  cartBtn.onclick = () => {
    filters.classList.add('hidden')
    menuGrid.classList.add('hidden')
    recapSection.classList.remove('hidden')
    recapBackBtn.classList.remove('hidden')
    renderRecap()
  }

  recapBackBtn.onclick = () => {
    recapSection.classList.add('hidden')
    recapBackBtn.classList.add('hidden')
    filters.classList.remove('hidden')
    menuGrid.classList.remove('hidden')
    renderMenu(currentFilter)
    requestAnimationFrame(animateCards)
  }

}





function renderRecap() {
  recapGrid.innerHTML = ''

  Object.values(selections).forEach(list => {
    list.forEach(({ item, quantity }) => {
      const card = document.createElement('div')
      card.className = 'card'

      card.onclick = () => {
        overlayFromRecap = true
        window.openOverlay(item)
      }


      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="info">
          <div class="info-titre">
          ${item.menu !== 'both' && item.menu !== activeMenu
            ? `<span class="recap-warning">Disponible le ${item.menu}</span>`
            : ''
          }
          
          <h3>${item.title}</h3>
          
            <div class="price-row">
              <span class="price">${item.price.toFixed(2)}€</span>
              <span class="separator">|</span>
              <span class="qty">Qté : ${quantity}</span>
            </div>
            <button class="btn-replace">Modifier</button>
          </div>
        </div>
      `

      card.querySelector('.btn-replace').onclick = (e) => {
        e.stopPropagation()
      
        overlayFromRecap = true
        window.openOverlay(item)
      }
      

      

      const wrapper = document.createElement('div')
      wrapper.className = 'card-row visible'
      wrapper.appendChild(card)

      recapGrid.appendChild(wrapper)
    })
  })
}


