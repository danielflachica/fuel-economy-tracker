import { supabase } from "./supabase";
import { getClientSlug } from "./clientSlug";

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
  private toDB: (entity: Omit<TApp, "id">) => Omit<TDB, "id">;

  constructor(
    table: string,
    fromDB: (row: TDB) => TApp,
    toDB: (entity: Omit<TApp, "id">) => Omit<TDB, "id">,
  ) {
    this.table = table;
    this.fromDB = fromDB;
    this.toDB = toDB;
  }

  // Get client slug per call (not in constructor) from URL or local storage
  private get clientSlug(): string {
    return getClientSlug();
  }

  async getAll(orderBy?: string): Promise<TApp[]> {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("client_slug", this.clientSlug)
      .order(orderBy ?? "id", { ascending: false });
    if (error) throw error;
    return data.map((row) => this.fromDB(row as TDB));
  }

  async get(id: number): Promise<TApp> {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .eq("client_slug", this.clientSlug)
      .single();
    if (error) throw error;
    return this.fromDB(data as TDB);
  }

  async create(entity: Omit<TApp, "id">): Promise<TApp> {
    const { data, error } = await supabase
      .from(this.table)
      .insert({ ...this.toDB(entity), client_slug: this.clientSlug } as any)
      .select()
      .single();
    if (error) throw error;
    return this.fromDB(data as TDB);
  }

  async update(entity: TApp): Promise<TApp> {
    const { data, error } = await supabase
      .from(this.table)
      .update(this.toDB(entity) as any)
      .eq("id", entity.id)
      .eq("client_slug", this.clientSlug)
      .select()
      .single();
    if (error) throw error;
    return this.fromDB(data as TDB);
  }

  async delete(id: number): Promise<void> {
    const { error, count } = await supabase
      .from(this.table)
      .delete({ count: "exact" })
      .eq("id", id)
      .eq("client_slug", this.clientSlug);
    if (error) throw error;
    if (count === 0) throw new Error(`Record with id ${id} not found.`);
  }
}

const createSupabaseService = <TDB extends Entity, TApp extends Entity>(
  table: string,
  fromDB: (row: TDB) => TApp,
  toDB: (entity: Omit<TApp, "id">) => Omit<TDB, "id">,
) => new SupabaseService(table, fromDB, toDB);

export default createSupabaseService;
