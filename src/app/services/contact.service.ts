import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '11999999999' }
  ];

  getContacts(): Observable<Contact[]> {
    return of(this.contacts);
  }

  addContact(contact: Contact): void {
    contact.id = Date.now(); // Gera um ID simples e único
    this.contacts.push(contact);
  }
}