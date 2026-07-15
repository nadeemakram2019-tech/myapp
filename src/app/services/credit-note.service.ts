import { Injectable, signal } from '@angular/core';
import { BaseDataService } from './base-data.service';

export interface CreditNote {
  id: string;
  credit_note_id: string;
  customer_id: string;
  customer_name: string;
  customer_avatar: string;
  amount: number;
  currency: string;
  reason: string;
  status: 'Issued' | 'Applied' | 'Expired' | 'Draft';
  invoice_ref: string;
  issued_date: string;
  applied_date?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditNoteService {
  creditNotes = signal<CreditNote[]>([]);
  loading = signal(false);

  constructor(private db: BaseDataService) {}

  async loadAll() {
    this.loading.set(true);
    try {
      const data = await this.db.getAll<CreditNote>('credit_notes', 'created_at');
      this.creditNotes.set(data);
    } catch (err) {
      console.error('Error loading credit notes:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async add(note: Partial<CreditNote>): Promise<CreditNote | null> {
    try {
      const newNote = await this.db.insert<CreditNote>('credit_notes', note);
      this.creditNotes.update(list => [newNote, ...list]);
      return newNote;
    } catch (err) {
      console.error('Error adding credit note:', err);
      return null;
    }
  }

  async remove(creditNoteId: string): Promise<boolean> {
    try {
      await this.db.delete('credit_notes', 'credit_note_id', creditNoteId);
      this.creditNotes.update(list => list.filter(cn => cn.credit_note_id !== creditNoteId));
      return true;
    } catch (err) {
      console.error('Error deleting credit note:', err);
      return false;
    }
  }
}
