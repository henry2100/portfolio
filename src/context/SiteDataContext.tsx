import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getSiteData, SiteData } from "../services/siteData";

interface SiteDataContextValue {
  siteData: SiteData | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteDataContext = createContext<SiteDataContextValue>({
  siteData: null,
  loading: true,
  refresh: async () => {},
});

export const useSiteData = () => useContext(SiteDataContext);

export const SiteDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      setLoading(true);
      const data = await getSiteData();
      setSiteData(data);
    } catch (error) {
      setSiteData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <SiteDataContext.Provider value={{ siteData, loading, refresh }}>
      {children}
    </SiteDataContext.Provider>
  );
};
