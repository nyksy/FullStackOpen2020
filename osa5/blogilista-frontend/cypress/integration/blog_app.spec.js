describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Juho Nykänen',
      username: 'nykanen',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('login')
  })

  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type('nykanen')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()

    cy.contains('Juho Nykänen logged in')
  })

  it('login fails with wrong credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('nykanen')
    cy.get('#password').type('väärä')
    cy.get('#login-button').click()

    cy.get('html').should('not.contain', 'Juho Nykänen logged in')
  })
  
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'nykanen', password: 'salainen' })
      cy.createBlog({
        title: 'test',
        author: 'Juho Nykänen',
        url: 'www.github.com',
        likes: '0'
      })
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('new blog')
      cy.get('#author').type('Juho Nykänen')
      cy.get('#url').type('www.github.com')
      cy.get('#add-button').click()

      cy.contains('test')
      cy.contains('Juho Nykänen')
    })
    it('A like can be added', function () {
      cy.get('#view-button').click()
      cy.get('#like-button').click()

      cy.contains('test')
      cy.contains('Juho Nykänen')
      cy.contains('www.github.com')
      cy.contains(1)
    })

    it('A blog can be removed', function () {
      cy.get('#view-button').click()
      cy.get('#delete-button').click()

      cy.get('html').should('not.contain', 'test')
    })

    it('Blogs are in right, descending order', function () {
      cy.createBlog({
        title: 'ten likes',
        author: 'Juho Nykänen',
        url: 'www.com',
        likes: 10
      })
      cy.createBlog({
        title: 'twenty likes',
        author: 'Juho Nykänen',
        url: 'www.com',
        likes: 20
      })
      cy.createBlog({
        title: 'thirty likes',
        author: 'Juho Nykänen',
        url: 'www.com',
        likes: 30
      })

      cy.get('#likeElement').then(likes => {
        cy.wrap(likes[0])
        const copy = likes
        cy.wrap(likes).should("equal", copy.sort());
      })
    })
  })
})