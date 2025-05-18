import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})

export class ContactFormComponent {
  @Input() contactToEdit: Contact | null = null;

  contact: Contact = { id: 0, first_name: '', last_name: '', email: '', avatar: '' };

  constructor(private contactService: ContactService) {}

  ngOnChanges() {
    if (this.contactToEdit) {
      this.contact = { ...this.contactToEdit };
    }
  }

  // onSubmit() {
  //   if (this.contact.id) {
  //     this.contactService.updateContact(this.contact);
  //   } else {
  //     this.contactService.addContact(this.contact);
  //   }
  //   this.clearForm();
  // }


  clearForm(): void {
    this.contact = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      avatar: ''
    };
    this.contactToEdit = null;
  }
}
