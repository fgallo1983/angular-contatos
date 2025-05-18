import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = 'https://reqres.in/api/users';
  private apiKey = 'reqres-free-v1';

  private contacts: Contact[] = [];
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<any>(this.apiUrl, {
      headers: { 'x-api-key': this.apiKey },
    }).pipe(
      map(response =>
        response.data.map((user: any) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar: user.avatar,
        }))
      ),
      map(mappedContacts => {
        this.contacts = mappedContacts;
        this.contactsSubject.next(this.contacts);
        return mappedContacts;
      })
    );
  }

  addContact(contact: Contact): Observable<Contact> {
    const newContact = {
      ...contact,
      id: Date.now(), // ID fake já que a API não salva
    };

    // Simula POST
    return this.http.post<Contact>(this.apiUrl, newContact, {
      headers: { 'x-api-key': this.apiKey },
    }).pipe(
      map(() => {
        this.contacts.push(newContact);
        this.contactsSubject.next([...this.contacts]);
        return newContact;
      })
    );
  }
}

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

