import { Component } from '@angular/core';
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
  contact: Contact = {
    id: 0,
    name: '',
    email: '',
    phone: ''
  };

  constructor(private contactService: ContactService) {} 

  onSubmit() {
    this.contactService.addContact(this.contact);
    console.log('Contato adicionado:', this.contact);
    console.log('Todos os contatos:', this.contactService.getContacts());

    this.contact = {
      id: 0,
      name: '',
      email: '',
      phone: ''
    };
  }
}