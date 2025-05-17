import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [
    { id: 1, name: 'João Silva', email: 'joao@email.com', phone: '11999999999' }
  ];

  private contactsSubject = new BehaviorSubject<Contact[]>(this.contacts);

  getContacts(): Observable<Contact[]> {
    return this.contactsSubject.asObservable();
  }

  addContact(contact: Contact): void {
    contact.id = Date.now(); // Gera um ID único simples
    this.contacts.push(contact);
    this.contactsSubject.next(this.contacts);  // Emite o novo array para os inscritos
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === updatedContact.id);
    if (index !== -1) {
      this.contacts[index] = { ...updatedContact };
      this.contactsSubject.next(this.contacts);  // Emite o array atualizado
    }
  }
  deleteContact(id: number): void {
  this.contacts = this.contacts.filter(contact => contact.id !== id);
  this.contactsSubject.next(this.contacts); // emite a lista atualizada
}
}