describe('Issue details deleting', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click()
        
    });
})
    it('Should be able to delete issue', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => {  
            cy.get('[data-testid="icon:trash"]').click()})
                 
        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.get('button').eq(0).contains('button' , 'Delete issue').click() })
                 
        cy.get('[data-testid="modal:confirm"]').should('not.exist') 
        cy.reload()
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
              .should('have.length', '3').and('not.contain' , 'This is an issue of type: Task.')})
              
        
        
    })

    it('Should be able to cancel deletion of issue', () => {
        cy.get('[data-testid="modal:issue-details"]').within(() => { 
            cy.get('[data-testid="icon:trash"]').click()})
              
        cy.get('[data-testid="modal:confirm"]').within(() => {
            cy.get('button').eq(1).contains('button' , 'Cancel').click()}) 
       
        cy.get('[data-testid="modal:confirm"]').should('not.exist') 

        cy.get('[data-testid="modal:issue-details"]').within(() => {
            cy.get('[data-testid="icon:close"]').eq(0).click()})
                  
        cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
            cy.get('[data-testid="list-issue"]')
              .should('have.length', '4')
              .contains('This is an issue of type: Task.')})
        
    })
     
})