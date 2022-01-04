import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AsyncStorageService {

  constructor() { }

  public query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || [];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(entities);
      }, delay);
    });
  }

  get(entityType, entityId) {
    return this.query(entityType).then((entities: (User|Contact)[]) =>
      entities.find((entity) => entity._id === entityId)
    );
  }

  public post(entityType, newEntity) {
    newEntity._id = this._makeId(12);
    return this.query(entityType).then((entities:any[]) => {
      entities.push(newEntity);
      this._save(entityType, entities);
      return newEntity;
    });
  }

  put(entityType, updatedEntity) {
    return this.query(entityType).then((entities:any[]) => {
      const idx = entities.findIndex(
        (entity) => entity._id === updatedEntity._id
      );
      entities.splice(idx, 1, updatedEntity);
      this._save(entityType, entities);
      return updatedEntity;
    });
  }

  public remove(entityType, entityId) {
    return this.query(entityType).then((entities:any[]) => {
      const idx = entities.findIndex((entity) => entity._id === entityId);
      if (idx < 0) throw new Error(`Unknown Entity ${entityId}`);
      entities.splice(idx, 1);
      this._save(entityType, entities);
    });
  }

  private _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities));
  }

  private _makeId(length = 5) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
