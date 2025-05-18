import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://reqres.in/api/users';
  private apiKey = 'reqres-free-v1';

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<any>(this.apiUrl, {
      headers: { 'x-api-key': this.apiKey },
    }).pipe(
      map(response =>
        response.data.map((user: any) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          avatar: user.avatar,
        }))
      )
    );
  }
}

//   addContact(contact: Contact): void {
//     contact.id = Date.now();
//     this.contacts.push(contact);
//     this.contactsSubject.next([...this.contacts]);  // Notifica atualização
//   }

//   updateContact(updatedContact: Contact): void {
//     const index = this.contacts.findIndex(c => c.id === updatedContact.id);
//     if (index !== -1) {
//       this.contacts[index] = { ...updatedContact };
//       this.contactsSubject.next([...this.contacts]);  // Notifica atualização
//     }
//   }
//   deleteContact(id: number): void {
//     this.contacts = this.contacts.filter(c => c.id !== id);
//     this.contactsSubject.next([...this.contacts]);  // Notifica atualização
// }
// }

