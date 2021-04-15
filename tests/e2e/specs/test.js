// https://docs.cypress.io/api/introduction/api.html
import { ACTIVITIES_LIMIT } from '../../../src/helpers/constants'

context('Test App', () => {
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

  it('Vuex store is initialized', () => {
    cy.window().should('have.property', 'store')
  })

  const getStore = () => cy.window().its('store')

  it('Store has availableActivities, activitiesCount, wishList and bagList properties', () => {
    getStore().its('state').should('have.keys', ['availableActivities', 'activitiesCount', 'wishList', 'bagList'])
  })

  it('Activities is requested', () => {
    cy.route('GET', `https://sandbox.musement.com/api/v3/activities?limit=${ACTIVITIES_LIMIT}&offset=0`).as('getActivities')
    cy.visit('/')
    cy.wait('@getActivities')
  })

  it('Paginator is rendered', () => {
    cy.get('main').find('nav[data-cy=paginator]')
  })

  it('The next group of activities is requested by clicking on the next page', () => {
    cy.get('nav[data-cy=paginator]').find('li[data-cy=paginator-item]').contains(2).click()
    cy.route('GET', `https://sandbox.musement.com/api/v3/activities?limit=${ACTIVITIES_LIMIT}&offset=0`).as('getActivities')
    cy.visit('/')
    cy.wait('@getActivities')
  })

  it('Product list is rendered', () => {
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

  it('Counter of wishlist is updated when click on star button', () => {
    cy.get('button[data-cy=product-update-wish-list-button]').first().click()
    cy.get('span[data-cy=wishlist-item-counter]', { timeout: 5000 }).should(($p) => {
      expect($p).to.contain(1)
    })
  })
})
