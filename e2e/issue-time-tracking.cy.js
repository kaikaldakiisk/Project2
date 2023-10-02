describe('Issue time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
            cy.get('[data-testid="modal:issue-create"]').within(() => {
                cy.get('.ql-editor').type('Time tracking');
                cy.get('input[name="title"]').type('Track time');
                cy.get('button[type="submit"]').click()
        })
        })
})
     
    it('Should be able to add estimated time on issue', () => {
        
        cy.get('[data-testid="list-issue"]').eq(0).click()
        cy.get('input[placeholder="Number"]').should('have.value' , 8).click()
            .clear()
        cy.get('input[placeholder="Number"]').should('be.empty')
        cy.get('input[placeholder="Number"]').type(15)
        cy.get('input[placeholder="Number"]').should('have.value' , 15)
        cy.get('input[placeholder="Number"]').clear()
        cy.get('input[placeholder="Number"]').type(13)
        cy.get('input[placeholder="Number"]').should('have.value' , 13)
        cy.get('[data-testid="icon:close"]').eq(0).click()
        cy.get('[data-testid="board-list:backlog').should('be.visible')

    })

    it('Should be able to cover time-logging functionality', () => {
        
        cy.get('[data-testid="list-issue"]').eq(0).click()
        cy.get('[data-testid="icon:stopwatch"]').should('be.visible').click()
        
        cy.get('[data-testid="modal:tracking"]').should('be.visible').within(() => {

            cy.get('input[placeholder="Number"]').eq(0).should('have.value' , 4).clear()
            cy.get('input[placeholder="Number"]').eq(0).should('be.empty')
            cy.get('input[placeholder="Number"]').eq(0).type(6)
            cy.get('input[placeholder="Number"]').eq(0).should('have.value' , 6)
            cy.get('input[placeholder="Number"]').eq(1).should('be.empty')
            cy.get('input[placeholder="Number"]').eq(1).type(2)
            cy.get('input[placeholder="Number"]').eq(1).should('have.value' , 2)
            cy.get('button').should('contain' , 'Done').click()
           
        })
        cy.get('[data-testid="modal:tracking"]').should('not.exist')
        cy.get('[data-testid="modal:issue-details"]').should('be.visible').within(() => {
        cy.get('[data-testid="icon:stopwatch"]').should('be.visible').next('contain' , '6h logged')
        cy.get('[data-testid="icon:close"]').eq(0).click()
    })
        cy.get('[data-testid="board-list:backlog').should('be.visible')

    })
})