import './style.css'
import './ui/menu.css'
import { renderStep } from './ui/menu.js'
import { initViewer } from './viewer.js'

// ===============================
// 🧭 ÉTAPES
// ===============================
const STEPS = [
  { key: 'drink', label: 'Boisson' },
  { key: 'starter', label: 'Starter' },
  { key: 'pizza', label: 'Plat' },
  { key: 'dessert', label: 'Dessert' },
  { key: 'recap', label: 'Récapitulatif' }
]



let stepIndex = 0
let selectedItem = null
let previewItem = null
let hasSelection = false

const selections = {
  drink: undefined,
  starter: undefined,
  pizza: undefined,
  dessert: undefined
}

window.getCurrentSelection = () => {
  const stepKey = STEPS[stepIndex].key
  return selections[stepKey]
}



// ===============================
// 🎯 ELEMENTS UI
// ===============================
const sheetBackBtn = document.getElementById('sheet-back')

const stepPrefix = document.getElementById('step-prefix')
const stepTitle = document.getElementById('step-title')


const nextBtn = document.getElementById('next')

const overlay = document.getElementById('overlay')
const sheet = document.getElementById('sheet')
const sheetTitle = document.getElementById('sheet-title')
const sheetDesc = document.getElementById('sheet-desc')
const sheetPrice = document.getElementById('sheet-price')
const viewerLoader = document.getElementById('viewer-loader')
const overlaySelectBtn = document.getElementById('overlay-select')

const stepCurrent = document.getElementById('step-current')
const stepTotal = document.getElementById('step-total')
const stepBackBtn = document.getElementById('step-back')

stepTotal.textContent = STEPS.length


// ===============================
// 🎬 INTRO
// ===============================
window.addEventListener('load', () => {
  const intro = document.getElementById('intro')
  const discover = document.getElementById('intro-discover')
  const menu = document.getElementById('intro-menu')

  setTimeout(() => discover.classList.add('visible'), 200)
  setTimeout(() => menu.classList.add('visible'), 800)

  setTimeout(() => {
    intro.classList.add('hidden')
    startStep()
  }, 2000)
})

// ===============================
// 🧠 STEP LOGIC
// ===============================
function startStep() {
  const step = STEPS[stepIndex]
  animateTitle(step.label)

  const stepFooter = document.querySelector('.step-footer')

  // Étape 1 → bouton Continuer plein width
  if (stepIndex === 0) {
    stepFooter.classList.add('single')
  } else {
    stepFooter.classList.remove('single')
  }

  stepCurrent.textContent = stepIndex + 1

  // Bouton retour visible à partir de l’étape 2
  if (stepIndex > 0) {
    stepBackBtn.classList.remove('hidden')
  } else {
    stepBackBtn.classList.add('hidden')
  }

  

  // ===============================
  // 🧾 ÉTAPE RÉCAP
  // ===============================
  if (step.key === 'recap') {
    renderRecap()

    // Footer spécial récap
    nextBtn.textContent = 'Valider'
    nextBtn.disabled = false

    return
  }

  // ===============================
  // 🧭 ÉTAPES NORMALES
  // ===============================
  const stepKey = STEPS[stepIndex].key

  // 🔁 restaurer sélection si elle existe
  selectedItem = selections[stepKey]
  hasSelection = selections[stepKey] !== undefined
  
  updateFooter()
  renderStep(step.key)
  
}


sheetBackBtn.addEventListener('click', () => {
  previewItem = null
  closeOverlay()
})

stepBackBtn.addEventListener('click', () => {
  if (stepIndex === 0) return

  stepIndex--
  startStep()
})


// ===============================
// 🌐 OVERLAY API
// ===============================
window.openOverlay = (item) => {
  previewItem = item

  sheetTitle.textContent = item.title
  sheetDesc.textContent = item.description
  sheetPrice.textContent = `${Number(item.price).toFixed(2)}€`


  viewerLoader.classList.remove('hidden')

  overlay.classList.remove('hidden')
  overlay.classList.add('active')
  sheet.classList.remove('hidden')
  sheetBackBtn.classList.remove('hidden')
  


  requestAnimationFrame(() => {
    sheet.classList.add('active')
  })

  initViewer(item, () => {
    viewerLoader.classList.add('hidden')
  })
}

overlay.addEventListener('click', (e) => {
  // si on clique directement sur le fond
  if (e.target === overlay) {
    closeOverlay()
  }
})


// ===============================
// ✅ VALIDATION DEPUIS OVERLAY
// ===============================
overlaySelectBtn.addEventListener('click', () => {
  if (!previewItem) return

  // reset toutes les cartes
  document.querySelectorAll('.card').forEach(card =>
    card.classList.remove('selected')
  )

  // retrouver la carte correspondante
  const cards = document.querySelectorAll('.card')
  cards.forEach(card => {
    const title = card.querySelector('h3')
    if (title && title.textContent === previewItem.title) {
      card.classList.add('selected')
    }
  })

  selectedItem = previewItem
  const stepKey = STEPS[stepIndex].key
selections[stepKey] = selectedItem

  previewItem = null
  hasSelection = true
  

  closeOverlay()
  updateFooter()
})


// ===============================
// ❌ FERMETURE OVERLAY
// ===============================
function closeOverlay() {
  overlay.classList.remove('active')

  sheetBackBtn.classList.add('hidden')
  
  setTimeout(() => {
    overlay.classList.add('hidden')
    sheet.classList.add('hidden')
  }, 300)
  
}


window.setSelectedItem = (item) => {
  selectedItem = item
  hasSelection = true

  const stepKey = STEPS[stepIndex].key
  selections[stepKey] = item 

  updateFooter()
}




// ===============================
// 🎬 TITRE ANIMÉ
// ===============================
function animateTitle(label) {
  stepPrefix.classList.remove('visible')
  stepTitle.classList.remove('visible')

  stepTitle.textContent = label

  setTimeout(() => stepPrefix.classList.add('visible'), 100)
  setTimeout(() => stepTitle.classList.add('visible'), 700)
}

// ===============================
// 🦶 FOOTER
// ===============================
function updateFooter() {
  if (hasSelection) {
    nextBtn.disabled = false
    nextBtn.textContent = 'Continuer'
  } else {
    nextBtn.disabled = true
    nextBtn.textContent = 'Faites un choix'
  }
}



// ===============================
// 👉 NAVIGATION
// ===============================
nextBtn.addEventListener('click', () => {
  if (!hasSelection) return
  goNext()
})




function goNext() {
  stepIndex++

  if (stepIndex >= STEPS.length) {
    console.log('Parcours terminé')
    return
  }

  startStep()
}

// ===============================
// 📱 AR BUTTON
// ===============================
const arBtn = document.getElementById('ar')

function isAppleDevice() {
  const ua = navigator.userAgent
  return (
    /iPhone|iPod/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

arBtn.addEventListener('click', () => {
  if (!previewItem) return

  // 🍎 Apple → Quick Look
  if (isAppleDevice()) {
    openQuickLook(previewItem.model)
  }
})

// ===============================
// 🍎 QUICK LOOK (USDZ)
// ===============================
function openQuickLook(modelName) {
  const usdz = modelName.replace('.glb', '.usdz')

  const link = document.createElement('a')
  link.setAttribute('rel', 'ar')
  link.setAttribute('href', `/models/${usdz}`)

  const img = document.createElement('img')
  img.src = '/images/ar.svg'
  img.style.display = 'none'

  link.appendChild(img)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


function renderRecap() {
  const grid = document.getElementById('menu-grid')
  grid.innerHTML = ''

  Object.entries(selections).forEach(([category, item]) => {
    const card = document.createElement('div')
    card.className = 'card recap-card'

    if (item) {
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="info">
          <span class="recap-category">${categoryLabel(category)}</span>
          <h3>${item.title}</h3>
          <span>${Number(item.price).toFixed(2)}€</span>
        </div>
      `
    } else {
      card.innerHTML = `
        <img src="/images/placeholder.webp" alt="Aucun ${categoryLabel(category)}">
        <div class="info">
          <span class="recap-category">${categoryLabel(category)}</span>
          <h3>Aucun ${categoryLabel(category).toLowerCase()} sélectionné</h3>
        </div>
      `
    }

    grid.appendChild(card)
  })
}

function categoryLabel(key) {
  switch (key) {
    case 'drink': return 'Boisson'
    case 'starter': return 'Starter'
    case 'pizza': return 'Plat'
    case 'dessert': return 'Dessert'
    default: return ''
  }
}

