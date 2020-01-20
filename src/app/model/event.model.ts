export class AppEvent<T> {
  constructor(public name: string, public data: T) {}
}
