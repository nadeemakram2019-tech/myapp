import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase.service';

@Injectable({
  providedIn: 'root'
})
export class BaseDataService {
  constructor(private supabase: SupabaseService) {}

  /**
   * Fetch all records from a table
   */
  async getAll<T>(table: string, orderBy?: string): Promise<T[]> {
    let query = this.supabase.client.from(table).select('*');
    if (orderBy) {
      query = query.order(orderBy, { ascending: false });
    }
    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as T[];
  }

  /**
   * Fetch a single record by ID column and value
   */
  async getById<T>(table: string, idColumn: string, idValue: string): Promise<T | null> {
    const { data, error } = await this.supabase.client
      .from(table)
      .select('*')
      .eq(idColumn, idValue)
      .single();
    if (error) throw error;
    return data as T;
  }

  /**
   * Fetch records by a column value (e.g. all invoices for a customer)
   */
  async getByColumn<T>(table: string, column: string, value: string): Promise<T[]> {
    const { data, error } = await this.supabase.client
      .from(table)
      .select('*')
      .eq(column, value)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as T[];
  }

  /**
   * Insert a new record
   */
  async insert<T>(table: string, record: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase.client
      .from(table)
      .insert([record as any])
      .select()
      .single();
    if (error) throw error;
    return data as T;
  }

  /**
   * Update a record by ID column
   */
  async update<T>(table: string, idColumn: string, idValue: string, updates: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase.client
      .from(table)
      .update(updates as any)
      .eq(idColumn, idValue)
      .select()
      .single();
    if (error) throw error;
    return data as T;
  }

  /**
   * Delete a record by ID column
   */
  async delete(table: string, idColumn: string, idValue: string): Promise<void> {
    const { error } = await this.supabase.client
      .from(table)
      .delete()
      .eq(idColumn, idValue);
    if (error) throw error;
  }

  /**
   * Search records by searching across multiple columns
   */
  async search<T>(table: string, searchTerm: string, columns: string[]): Promise<T[]> {
    const { data, error } = await this.supabase.client
      .from(table)
      .select('*')
      .or(columns.map(col => `${col}.ilike.%${searchTerm}%`).join(','))
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data || []) as T[];
  }
}
