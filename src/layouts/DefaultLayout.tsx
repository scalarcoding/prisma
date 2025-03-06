import React, { ReactNode } from "react";
import Navbar from "@/components/ui/navbar/Navbar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [session, setSession] = useState<Session | null>(null);

  // useEffect(() => {
  //     // Function to fetch the session
  //     const fetchSession = async () => {
  //         try {
  //             const { data: { session } } = await supabase.auth.getSession();
  //             setSession(session);
  //             console.log('Session:', session);
  //         } catch (error) {
  //             console.error('Error fetching session:', error);
  //         }
  //     };

  //     fetchSession();
  // }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <header className="py-2">
        <Navbar/>

      </header>
      <main className="pt-4">
        <div className="mx-auto max-w-full p-4 md:p-6 2xl:p-2">{children}</div>
      </main>
    </div>
  );
};

export default DefaultLayout;
