describe('help', () => {
  beforeEach(() => {
    cy.visit('/lab');
  });

  it('Should open the pachyderm docs from the help menu.', () => {
    cy.findAllByText('Help').first().click();
    cy.findByText('Pachyderm Docs');
  });

  it.only('Should open contact support modal from the help menu.', () => {
    cy.findAllByText('Help').first().click();
    cy.findAllByText('Contact Pachyderm Support').click();
    cy.findByText('Chat with us on');
    cy.findByText('Slack')
      .should('have.prop', 'href')
      .and('include', 'https://slack.pachyderm.io');
    cy.findByText('Email us at');
    cy.findByText('support@pachyderm.com').should(
      'have.prop',
      'href',
      'mailto:support@pachyderm.com',
    );
  });
});
