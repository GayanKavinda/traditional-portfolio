import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/CustomCursor";
import ResumeButton from "@/components/ResumeButton";
import { ThemeProvider } from "@/context/ThemeProvider";
import Home from "./pages/Home";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";

import { PreLoader } from "@/components/PreLoader";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="gy-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PreLoader>
          <CustomCursor />
          <ResumeButton />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PreLoader>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
