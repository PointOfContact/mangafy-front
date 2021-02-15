import * as qs from 'query-string';

export class LinkCreator {
  static query(object) {
    return qs.stringify(object);
  }

  static toQuery(object, path = '/') {
    const query = this.query(object);
    return `${path}?${query}`;
  }
}
