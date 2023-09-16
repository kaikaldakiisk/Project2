import { faker } from '@faker-js/faker';

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  const title = faker.lorem.word()
  const description = faker.lorem.words()

  it('Should create an issue and validate it successfully', () => {
    
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Story"]')
        .trigger('click');

      cy.get('.ql-editor').type('TEST_DESCRIPTION');
     
      cy.get('input[name="title"]').type('TEST_TITLE');

      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('button[type="submit"]').click();

    });
    
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains('TEST_TITLE');
      
      cy.get('[data-testid="avatar:Lord Gaben"]').should('be.visible');
      cy.get('[data-testid="icon:story"]').should('be.visible');

    });
  })


  it('Create second issue and validate it successfully, use faker', () => {
    
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      cy.get('[data-testid="select:type"]').click().type('Bug')
      cy.get('[data-testid="select-option:Bug"]').trigger('click');
      cy.get('.ql-editor').type(description)
      cy.get('input[name="title"]').type(title)
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:priority"]').click().type('Highest')
      cy.get('[data-testid="select-option:Highest"]').click()
      cy.get('button[type="submit"]').click();

    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {

      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains(title);

      cy.get('[data-testid="icon:arrow-up"]').should('be.visible');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
    });

  });

  it('Create third issue with faker and validate it successfully', () => {
    
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      cy.get('.ql-editor').type(description)
      cy.get('input[name="title"]').type(title)
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:priority"]').click()
      cy.get('[data-testid="select-option:Low"]').click()
      cy.get('button[type="submit"]').click();

    });

    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');
    
    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      
      cy.get('[data-testid="list-issue"]')
        .should('have.length', '5')
        .first()
        .find('p')
        .contains(title);
      
      cy.get('[data-testid="icon:task"]').should('be.visible');
      cy.get('[data-testid="icon:arrow-down"]').should('be.visible')

    });

  });


  it('Should validate title is required field if missing', () => {
    
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');

    });
  });
})