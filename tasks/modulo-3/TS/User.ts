export class User {
  private name: string;
  private lastName: string;
  private id: string;

  constructor(name: string, lastName: string, id: string) {
    this.name = name;
    this.lastName = lastName;
    this.id = id
  }

  getID(): string {
    return this.id;
  }
}