import { supabase } from "./supabase";

interface Entity {
  id: number;
}

/**
 * TDB = Generic Entity Type for Database Row
 * TApp = Generic Entity Type for App Object
 */
class SupabaseService<TDB extends Entity, TApp extends Entity> {
  private table: string;
  private fromDB: (row: TDB) => TApp;
  private toDB: (entity: TApp) => TDB;

  constructor(
    table: string,
    fromDB: (row: TDB) => TApp,
    toDB: (entity: TApp) => TDB,
  ) {
    this.table = table;
    this.fromDB = fromDB;
    this.toDB = toDB;
  }

  async getAll(orderBy?: string): Promise<TApp[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .order(orderBy ?? "id", { ascending: false });
    if (error) throw error;
    return data.map((row) => this.fromDB(row as TDB));
  }

  async get(entity: TApp): Promise<TApp> {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("id", entity.id)
      .single();
    if (error) throw error;
    return this.fromDB(data as TDB);
  }

  async create(entity: TApp): Promise<TApp> {
    const { data, error } = await supabase
      .from(this.table)
      .insert(this.toDB(entity))
      .select()
      .single();
    if (error) throw error;
    return this.fromDB(data as TDB);
  }

  async update(entity: TApp): Promise<TApp> {
    const { data, error } = await supabase
      .from(this.table)
      .update(this.toDB(entity))
      .eq("id", entity.id)
      .select()
      .single();
    if (error) throw error;
    return this.fromDB(data as TDB);
  }

  async delete(id: number): Promise<void> {
    const { error } = await supabase.from(this.table).delete().eq("id", id);
    if (error) throw error;
  }
}

const createSupabaseService = <TDB extends Entity, TApp extends Entity>(
  table: string,
  fromDB: (row: TDB) => TApp,
  toDB: (entity: TApp) => TDB,
) => new SupabaseService(table, fromDB, toDB);

export default createSupabaseService;
