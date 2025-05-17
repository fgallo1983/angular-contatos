import { Component } from '@angular/core';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactFormComponent, ContactListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    template: `
    <app-contact-form [contactToEdit]="selectedContact"></app-contact-form>
    <app-contact-list (edit)="onEditContact($event)"></app-contact-list>
  `
})
export class AppComponent {
  selectedContact: Contact | null = null;

  onEditContact(contact: Contact) {
    this.selectedContact = contact;
  }
}