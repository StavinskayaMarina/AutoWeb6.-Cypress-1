const book1 = {
  title: "Человек, который не спал по ночам",
  description:
    "Почему кто-то не хочет, чтобы мемуары увидели свет? Писателю предстоит распутать уходящую в прошлое историю, обернувшуюся кровавой развязкой в настоящем.",
  author: "Дэвид Хэндлер",
};

const book2 = {
  title: "Что делать, когда не знаешь, что делать",
  description:
    "Многих людей смущают разговоры о высоких целях, о моральных принципах. Они считают эти темы пафосными. Однако, не определив для себя жизненные ценности, вы не сможете расставить приоритеты и принять правильное для вас решение во многих ситуациях.",
  author: "Джонатан Херринг",
};

describe("test favorites book", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.login("bropet@mail.ru", "123");
  });

  //добавление новых книг

  it("add a new book", () => {
    cy.addBook(book1);
    cy.contains("Человек, который не спал по ночам").should("be.visible");
    cy.addBook(book2);
    cy.contains("Что делать, когда не знаешь, что делать").should("be.visible");
  });

  //добавление книг в избранное

  it("adding a book 1 to favorites", () => {
    cy.addFavorite(book1);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", book1.title);
  });

  it("adding a book 2 to favorites", () => {
    cy.addFavorite(book2);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", book2.title);
  });

  //удаление книги из избранного

  it("removing a book from favorites", () => {
    cy.visit("/favorites");
    cy.contains(book1.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(book1.title).should("not.exist");
  });

  //открытие карточки книги в избранном

  it("opening a book card in favorites", () => {
    cy.visit("/favorites");
    cy.contains(book2.title)
      .should("be.visible")
      .within(() => cy.get("div.card-body").click({ force: true }));
    cy.contains("Dowload book").should("be.visible");
  });
});
