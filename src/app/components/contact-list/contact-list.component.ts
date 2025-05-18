import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  @Output() edit = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {}

ngOnInit() {
  this.contactService.getContacts().subscribe(); // inicializa a lista
  this.contactService.contacts$.subscribe(updated => {
    this.contacts = updated;
  });
}

  onEdit(contact: Contact) {
    this.edit.emit(contact);
  }

  onDelete(contact: Contact): void {
    if (confirm(`Tem certeza que deseja excluir ${contact.first_name}?`)) {
      this.contactService.deleteContact(contact.id).subscribe(() => {
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
      });
    }
}
}