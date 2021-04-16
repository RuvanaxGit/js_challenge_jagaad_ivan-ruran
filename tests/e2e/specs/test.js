// https://docs.cypress.io/api/introduction/api.html
import { ACTIVITIES_LIMIT } from '../../../src/helpers/constants'

const getStore = () => cy.window().its('store')

context('General', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/')
  })

  it('Header block is rendered', () => {
    cy.get('#app').find('header')
  })

  it('Main block is rendered', () => {
    cy.get('#app').find('main')
  })

  it('Footer block is rendered', () => {
    cy.get('#app').find('footer')
  })

  it('Headers bag and wishlist are seen', () => {
    cy.get('header').find('div[data-cy=bag-icon]')
    cy.get('header').find('div[data-cy=wishlist-icon]')
  })

  it('Page title is seen', () => {
    cy.get('header').find('h1[data-cy=page-title]').contains('BRAND')
  })

  it('Footer text is seen', () => {
    cy.get('footer').find('p[data-cy=footer-text]').contains('Footer')
  })

  it('Vuex store is initialized', () => {
    cy.window().should('have.property', 'store')
  })

  it('Store has availableActivities, activitiesCount, wishList and bagList properties', () => {
    getStore().its('state').should('have.keys', ['availableActivities', 'activitiesCount', 'wishList', 'bagList'])
  })
})

context('App testing', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/')
  })

  it('Activities list is requested', () => {
    cy.route('GET', `https://sandbox.musement.com/api/v3/activities?limit=${ACTIVITIES_LIMIT}&offset=0`).as('getActivities')
    cy.visit('/')
    cy.wait('@getActivities')
  })

  it('Paginator is rendered', () => {
    cy.get('main').find('nav[data-cy=paginator]')
  })

  it('Active page has special class', () => {
    cy.get('nav[data-cy=paginator]').find('li[data-cy=paginator-item]').first().should(($p) => {
      expect($p).to.have.class('active__item')
    })
  })

  it('The next group of activities is requested by clicking on the next page', () => {
    cy.get('nav[data-cy=paginator]').find('li[data-cy=paginator-item]').contains(2).click()
    cy.route('GET', `https://sandbox.musement.com/api/v3/activities?limit=${ACTIVITIES_LIMIT}&offset=0`).as('getActivities')
    cy.visit('/')
    cy.wait('@getActivities')
  })

  it('Activities list is rendered', () => {
    cy.get('main').find('div[data-cy=product-list]')
  })

  it('It\'s rendered only limited count of items', () => {
    cy.get('main').find('div[data-cy=product-item]').should(($p) => {
      expect($p).to.have.length(ACTIVITIES_LIMIT)
    })
  })

  it('Counter of bag is updated when click on add to cart button', () => {
    cy.get('button[data-cy=product-update-bag-button]').first().click()
    cy.get('span[data-cy=bag-item-counter]', { timeout: 6000 }).should(($p) => {
      expect($p).to.contain(1)
    })
  })

  it('Total value is updated when clicking on item', () => {
    cy.get('button[data-cy=product-update-bag-button]').first().click()
    cy.get('button[data-cy=product-update-bag-button]').its(3).click()
    getStore().then(store => {
      cy.get('div[data-cy=total-bag-price]', { timeout: 5000 }).should(($p) => {
        expect($p).to.contain(store.getters.totalBagPrice)
      })
    })
  })

  it('Text and class is changed when clicking on add to cart button', () => {
    cy.get('button[data-cy=product-update-bag-button]').first().click()
    cy.get('button[data-cy=product-update-bag-button]', { timeout: 6000 }).should(($p) => {
      expect($p).to.contain('IN CART')
      expect($p).to.have.class('button--in-cart')
    })
  })

  it('Counter of wishlist is updated when click on star button', () => {
    cy.get('button[data-cy=product-update-wish-list-button]').first().click()
    cy.get('span[data-cy=wishlist-item-counter]', { timeout: 5000 }).should(($p) => {
      expect($p).to.contain(1)
    })
  })

  it('Class is changed when clicking on star button', () => {
    cy.get('button[data-cy=product-update-wish-list-button]').first().click()
    cy.get('svg[data-cy=add-wishlist-icon]', { timeout: 5000 }).should(($p) => {
      expect($p).to.have.class('icon-active')
    })
  })
})

context('Bag testing', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('/')
    cy.get('button[data-cy=product-update-bag-button]').first().click()
    cy.get('div[data-cy=bag-icon]', { timeout: 5000 }).click()
  })

  it('It routes to bag on clicking its icon', () => {
    cy.get('div[data-cy=bag-icon]').click()
    cy.get('div[data-cy=bag-route]', { timeout: 5000 }).should(($p) => {
      expect($p).to.exist
    })
  })

  it('Bag is not empty when clicking on any item and bag list in store is updated', () => {
    getStore().its('state.bagList').should('have.length', 1)
    cy.get('div[data-cy=bag-list]', { timeout: 5000 }).should(($p) => {
      expect($p).to.exist
    })
  })

  it('Total value in mini bag is calculated', () => {
    getStore().then(store => {
      cy.get('div[data-cy=total-of-mini-bag]', { timeout: 5000 }).should(($p) => {
        expect($p).to.contain(store.getters.totalBagPrice)
      })
    })
  })

  it('Item is deleted when clicking and bag become empty', () => {
    cy.get('div[data-cy=delete-from-bug-button]').first().click()
    getStore().its('state.bagList').should('have.length', 0)
    cy.get('div[data-cy=bag-list]', { timeout: 5000 }).should(($p) => {
      expect($p).not.to.exist
    })
  })

  it('It routes back to product list when clicking on title', () => {
    cy.get('header').find('h1[data-cy=page-title]').click()
    cy.get('div[data-cy=product-list]', { timeout: 5000 }).should(($p) => {
      expect($p).to.exist
    })
  })
})
