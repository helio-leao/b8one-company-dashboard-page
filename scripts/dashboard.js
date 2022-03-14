/* Global Variables */
let chart = null

/* Buttons Config */
function configLogoutButton() {
  const logoutButton = document.querySelector('.user-menu-dropdown__logout-button')

  logoutButton.addEventListener('click', () => {
    setLoggedOutState()
    redirectNotLoggedUser()
  })
}

function configSideBarDisplay() {
  const displayButton = document.querySelector('.hamburger-button')
  const sideBar = document.querySelector('.side-bar')

  displayButton.addEventListener('click', () => {
    sideBar.classList.toggle('side-bar--show')
  })

  document.addEventListener('click', event => {
    if(!sideBar.contains(event.target) && !displayButton.contains(event.target)) {
      sideBar.classList.remove('side-bar--show')
    }
  })
}

/* Chart */
function createChart(data) {
  const options = {
    maintainAspectRatio: false,
    borderWidth: 2,
    // animation: false,

    plugins: {

      legend: {
        display: true,
        position: 'bottom',
        align: 'start',

        labels: {
          usePointStyle: true,
          boxWidth: 6,
        },
      }
    }

  }

  const config = {
    type: 'line',
    data: data,
    options,
  }

  chart = new Chart(document.getElementById('chart'), config)
}

function updateChart(data) {
  chart.destroy()
  createChart(data)
}

/* Listener for Navigation Tabs Buttons */
function createTabulationButtonsListeners(buttonsClass, buttonActiveClass, buttonFunction) {
  const tabsButtons = Array.from(document.querySelectorAll('.' + buttonsClass))

  tabsButtons.forEach(button => {
    button.addEventListener('click', () => {
      renderSelectedTabButton(button, tabsButtons, buttonActiveClass)
      buttonFunction(button)
    })
  })
}

/* Selected Tabs Rendering */
function renderSelectedTabButton(selectedButton, buttonsList, activeClass) {
  if (selectedButton.classList.contains(activeClass)) return

  const previouslySelectedButton = buttonsList.find(button => {
    return button.classList.contains(activeClass)
  })

  previouslySelectedButton.classList.remove(activeClass)
  selectedButton.classList.add(activeClass)
}

/* Sidebar Buttons Navigation */
function configMenuTabsNavigation() {
  const buttonsClass = 'menu-button-final'
  const buttonActiveClass = 'menu-button-final--active'

  createTabulationButtonsListeners(buttonsClass, buttonActiveClass, button => {
    console.log('to do function - menu nav button clicked')
  })

  /* dropdown buttons */
  const dropdownButtons = Array.from(document.querySelectorAll('.menu-button-dropdown'))

  dropdownButtons.forEach(button => {
    button.addEventListener('click', () => {

      const previouslySelectedDropdown = dropdownButtons.find(aux => {
        return (button !== aux) && (aux.classList.contains('menu-button-dropdown--active'))
      })

      if (previouslySelectedDropdown) previouslySelectedDropdown.classList.remove('menu-button-dropdown--active')

      button.classList.toggle('menu-button-dropdown--active')
      
    })
  })
}

/* Period Tabs Navigation */
function configPeriodsFilterTabsNavigation() {
  const buttonsClass = 'report-filter__button'
  const buttonActiveClass = 'report-filter__button--active'

  createTabulationButtonsListeners(buttonsClass, buttonActiveClass, button => {
    console.log('to do function - period tab nav button clicked')
  })
}

/* Chart Report Type Navigation */
function configReportsChartsNavigation() {
  const buttonsClass = 'report-type__button'
  const buttonActiveClass = 'report-type__button--active'

  createTabulationButtonsListeners(buttonsClass, buttonActiveClass, button => {
    const selectedButtonId = button.id

    const reportDataCards = document.querySelector('.report-data-cards')

    const resellerFilterSelect = document.querySelector('.resellers-filter')
    const resellerRankingsCard = document.querySelector('.report-column-two')


    switch (selectedButtonId) {
      case 'vendas':
        reportDataCards.style.display = 'block'
        resellerFilterSelect.classList.add('resellers-filter--hidden')
        resellerRankingsCard.style.display = 'none'
        updateChart(Charts.sales)
        break
      case 'pedidos':
        reportDataCards.style.display = 'none'
        resellerFilterSelect.classList.add('resellers-filter--hidden')
        resellerRankingsCard.style.display = 'none'
        updateChart(Charts.orders)
        break
      case 'revendedores':
        reportDataCards.style.display = 'none'
        resellerFilterSelect.classList.remove('resellers-filter--hidden')
        resellerRankingsCard.style.display = 'block'
        updateChart(Charts.resellers)
        break
    }
  })
}

/* Insights Table Navigation */
function configInsightsTabsNavigation() {
  const buttonsClass = 'insights-table-navigation__button'
  const buttonActiveClass = 'insights-table-navigation__button--active'

  createTabulationButtonsListeners(buttonsClass, buttonActiveClass, button => {
    console.log('to do function - insights table nav button clicked')
  })


  /* prev next buttons */
  const tabsButtons = Array.from(document.querySelectorAll('.insights-table-navigation__button'))

  const insightsTabsButtonsPrev = document.querySelector('.insights-table-navigation__button-prev')
  const insightsTabsButtonsNext = document.querySelector('.insights-table-navigation__button-next')


  insightsTabsButtonsPrev.addEventListener('click', () => {
    const selectedButtonIndex = tabsButtons.findIndex(button => {
      return button.classList.contains('insights-table-navigation__button--active')
    })

    if (selectedButtonIndex === 0) return

    tabsButtons[selectedButtonIndex - 1].click()
  })

  insightsTabsButtonsNext.addEventListener('click', () => {
    const selectedButtonIndex = tabsButtons.findIndex(button => {
      return button.classList.contains('insights-table-navigation__button--active')
    })

    if (selectedButtonIndex === tabsButtons.length - 1) return

    tabsButtons[selectedButtonIndex + 1].click()
  })

}

/* Load Information */
async function fetchData(route) {
  const response = await fetch(API_URI + route)
  const responseJson = await response.json()
  return responseJson
}

async function loadUser() {
  const data = await fetchData('/user')

  /* organization */
  const organizationLink = document.querySelector('.organization-link')

  let organizationLogoElement = ''

  if (data.organizationLogo == null) {
    organizationLogoElement = createPhotoPlaceholderStringElement(data.organization, 'organization-link-logo-placeholder')
  } else {
    organizationLogoElement = `<img src="${data.organizationLogo}" alt="organization logo" class="organization__avatar">`
  }

  const organizationLinkElements = `${organizationLogoElement}
                                    <span class="organization-link__name">${data.organization}</span>`

  organizationLink.insertAdjacentHTML("beforeend", organizationLinkElements)


  /* user */
  const userMenuButton = document.querySelector('.user-menu__button')

  let userAvatarElement = ''

  if (data.photo == null) {
    userAvatarElement = createPhotoPlaceholderStringElement(data.username, 'user-menu-button-photo-placeholder')
  } else {
    userAvatarElement = `<img src="${data.photo}" alt="user avatar" class="user-menu__avatar">`
  }

  const userMenuButtonElements = `${userAvatarElement}
                                  <span class="user-menu__name">${data.username}</span>`

  userMenuButton.insertAdjacentHTML("beforeend", userMenuButtonElements)
}

function getSubmenuStringBlock(menuName) {
  let submenuItems = ''

  Submenus[menuName].forEach(submenu => {
    submenuItems += `<li class="dropdown-menu__item">
                          <button class="dropdown-menu__button menu-button-final">
                              ${submenu}
                          </button>
                      </li>`
  })

  const submenuBlock = `<div class="dropdown-menu">
                          <ul class="dropdown-menu__list">
                              ${submenuItems}
                          </ul>
                        </div>`

  return submenuBlock
}

async function loadMenu() {
  const data = await fetchData('/menu')
  const sideBarMenuList = document.querySelector('.menu__list')

  data.menuTree.forEach((menu, index) => {
    const sideBarMenuItem = `<li class="menu__item">
                                <button class="menu__button ${menu.hasChildren ? 'menu-button-dropdown' : 'menu-button-final'} ${!menu.hasChildren && index === 0 ? 'menu-button-final--active' : ''}">
                                    ${Icons[menu.name]}
                                    ${menu.name}
                                    ${menu.hasChildren ? `<svg class="menu__dropdown-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                              <path d="M16.4998 14.2496L11.9998 9.74963L7.49976 14.2496" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                          </svg> ` : ''}                                    
                                </button>
                                ${menu.hasChildren ? getSubmenuStringBlock(menu.name) : ''}
                            </li>
    `
    sideBarMenuList.insertAdjacentHTML('beforeend', sideBarMenuItem)
  })

}

async function loadBestSellingProducts() {
  const data = await fetchData('/products/more-sold')

  const tableBody = document.querySelector('.table-body')

  for (let i = 0; i < data.products.length; i++) {
    const tableRow = `<tr class="insights-table__row">
                        <td class="insights-table-data insights-table-data--count">
                          ${i + 1}
                        </td>
                        <td class="insights-table-data insights-table-data--product">
                            <div class="product">
                                <img src="${data.products[i].image}" alt="product-image" class="insights-table-data__image">
                                <span class="insights-table-data__description">${data.products[i].name}</span>
                            </div>
                        </td>
                        <td class="insights-table-data insights-table-data--count-responsive">
                          ${i + 1}
                        </td>
                        <td class="insights-table-data insights-table-data--number">
                          ${data.products[i].orderId}
                        </td>
                        <td class="insights-table-data insights-table-data--department">
                          ${data.products[i].department}
                        </td>
                        <td class="insights-table-data insights-table-data--price">
                          ${centsToReal(data.products[i].price)}
                        </td>
                      </tr>`

    tableBody.insertAdjacentHTML('beforeend', tableRow)
  }
}

async function loadResellersRanking() {
  const data = await fetchData('/resellers/ranking')

  const resellersRankingList = document.querySelector('.resellers-ranking__list')

  data.resellers.forEach((reseller, index) => {
    const isPercentageNegative = reseller.percentage.includes('-')

    let avatarElement = ''
    if (reseller.photo == null) {
      avatarElement = createPhotoPlaceholderStringElement(reseller.name, 'resellers-ranking-placeholder')
    } else {
      avatarElement = `<img src="${reseller.photo}" alt="reseller avatar" class="resellers-ranking__img">`
    }

    const resellerItem = `<li class="resellers-ranking__item">
                            <span class="resellers-ranking__position">
                                ${index + 1}º
                            </span>
                            
                            ${avatarElement}
                                
                            <div class="resellers-ranking-data">
                                <span class="resellers-ranking-data__name">
                                    ${reseller.name}
                                </span>
                                <div class="resellers-ranking-data-sales ${isPercentageNegative ? 'resellers-ranking-data-sales--negative' : ''}">
                                    <span class="resellers-ranking-data__requests">
                                        ${reseller.ordersCount} pedidos
                                    </span>
                                    <span class="resellers-ranking-data__performance">
                                        ${reseller.percentage}
                                    </span>
                                    <svg class="resellers-ranking-data__performance-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.9998 9.5L7.99976 6.5L4.99976 9.5" stroke="#158F2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                                                
                                </div>
                            </div>
                        </li>`

    resellersRankingList.insertAdjacentHTML('beforeend', resellerItem)
  })
}

function createPhotoPlaceholderStringElement(name, className) {
  return `<div class="${className}">
            <span class="${className + '__initials'}">
                ${getNameInitials(name)}
            </span>
          </div>`
}

function getNameInitials(name) {
  const separatedNames = name.split(' ')

  if (separatedNames.length > 1) return separatedNames[0].charAt(0) + separatedNames[1].charAt(0)

  return separatedNames[0].charAt(0)
}

async function loadSales() {
  const data = await fetchData('/sales')

  const revenueElement = document.querySelector('.report-data-cards-data__value--revenue')
  const totalSalesElement = document.querySelector('.report-data-cards-data__value--total-sales')
  const averageTicketElement = document.querySelector('.report-data-cards-data__value--average-ticket')

  revenueElement.innerHTML = centsToReal(data.revenues)
  totalSalesElement.innerHTML = data.totalSales
  averageTicketElement.innerHTML = centsToReal(data.averageTicket)
}

function centsToReal(totalCents) {
  const real = Math.floor(totalCents / 100)
  const cents = totalCents % 100
  
  return getRealFormattedString(real) + ',' + getCentsFormattedString(cents)
}

function getRealFormattedString(real) {
  return real.toLocaleString('pt-br')
}

function getCentsFormattedString(cents) {
  return cents === 0 ? '00' : cents
}

/* Main */
async function main() {
  redirectNotLoggedUser()

  document.body.style.cursor = 'wait'

  configLogoutButton()
  configSideBarDisplay()

  await loadUser()
  await loadMenu()
  await loadBestSellingProducts()
  await loadResellersRanking()
  await loadSales()

  createChart({})
  updateChart(Charts.sales)

  configMenuTabsNavigation()
  configPeriodsFilterTabsNavigation()
  configReportsChartsNavigation()
  configInsightsTabsNavigation()

  document.body.style.cursor = 'default'
}

main()