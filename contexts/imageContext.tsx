import { createContext, useContext, useState, ReactNode } from "react";

type ImageContextType = {
  uri: string | null;
  setUri: (uri: string | null) => void;
};

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageProvider({ children }: { children: ReactNode }) {
  const [uri, setUri] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ uri, setUri }}>
      {children}
    </ImageContext.Provider>
  );
}

export function useImage() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
}
