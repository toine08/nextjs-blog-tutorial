import { supabase } from "./supabaseClient";

export async function getProfil(id) {}
export async function createProfil(id, first_name, last_name, username) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .insert([{ id, first_name, last_name, username }]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}
