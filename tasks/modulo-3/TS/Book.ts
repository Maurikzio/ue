export class Book {
  private title: string;
  private author: string;
  private yearOfPublication: number;
  private genre: string;
  private availableCopies: number;

  constructor(
    title: string,
    author: string,
    yearOfPublication: number,
    genre: string,
    availableCopies: number
  ) {
    this.title = title;
    this.author = author;
    this.yearOfPublication = yearOfPublication;
    this.genre = genre;
    this.availableCopies = availableCopies;
  }

  decreaseAvailableCopies() {
    this.availableCopies--;
  }

  increaseAvailableCopeis() {
    this.availableCopies++;
  }

  getBookInformation() {
    return `Title: ${this.title}
    Author: ${this.author}
    Year: ${this.yearOfPublication}
    Genre: ${this.genre}
    Available Copies: ${this.availableCopies}`;
  }

  getTitle() {
    return this.title;
  }

  isAvailable(): boolean {
    return this.availableCopies > 0;
  }
};

export class HorrorBook extends Book {
  numberOfPeopleFainted: number = 0;

  constructor(title: string, author: string, yearOfPublication: number, availableCopies: number) {
    super(title, author, yearOfPublication, "Horror", availableCopies)
  }

  increaseNumberOfPeopleFainted() {
    this.numberOfPeopleFainted++;
  }

  override getBookInformation(): string {
    const originalInfo = super.getBookInformation();
    return `${originalInfo}
      People Fainted: ${this.numberOfPeopleFainted}
    `
  }
}