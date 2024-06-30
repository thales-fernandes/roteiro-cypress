describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Muda uma tarefa e verifica a mudança', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .dblclick();

    cy.get('.todo-list li .edit')
      .clear()
      .type('TP2 de ES atualizado{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES atualizado');
  });

  it('Marca uma tarefa como completa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    cy.get('.todo-list li .toggle')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.class', 'completed');
  });

  it('Alterna entre tarefa completa e não completa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}');

    // Marca a tarefa como completa
    cy.get('.todo-list li .toggle')
      .click();
    cy.get('.todo-list li')
      .first()
      .should('have.class', 'completed');

    // Desmarca a tarefa como completa
    cy.get('.todo-list li .toggle')
      .click();
    cy.get('.todo-list li')
      .first()
      .should('not.have.class', 'completed');

    // Marca novamente a tarefa como completa
    cy.get('.todo-list li .toggle')
      .click();
    cy.get('.todo-list li')
      .first()
      .should('have.class', 'completed');

    // Desmarca novamente a tarefa como completa
    cy.get('.todo-list li .toggle')
      .click();
    cy.get('.todo-list li')
      .first()
      .should('not.have.class', 'completed');
  });
});
