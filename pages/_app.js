import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import "../styles/globals.css";

export const UserContext = createContext();

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const { data: session } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
