import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/layout/CustomCursor";
import ResumeButton from "@/components/common/ResumeButton";
import { ThemeProvider } from "@/context/ThemeProvider";

// ── Pages ─────────────────────────────────────────────────────────────────────
import Home          from "./pages/Home";
import AllProjects   from "./pages/AllProjects";
import ProjectDetail from "./pages/ProjectDetail";   // NEW
import BlogList      from "./pages/BlogList";         // NEW
import BlogPost      from "./pages/BlogPost";         // NEW
import { Now }       from "./pages/NowAndUses";       // NEW
import { Uses }      from "./pages/NowAndUses";       // NEW
import NotFound      from "./pages/NotFound";

import { PreLoader } from "@/components/layout/PreLoader";

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
              {/* Core */}
              <Route path="/"                       element={<Home />} />
              <Route path="/projects"               element={<AllProjects />} />
              <Route path="/projects/:slug"         element={<ProjectDetail />} />

              {/* Blog */}
              <Route path="/blog"                   element={<BlogList />} />
              <Route path="/blog/:slug"             element={<BlogPost />} />

              {/* Personal pages */}
              <Route path="/now"                    element={<Now />} />
              <Route path="/uses"                   element={<Uses />} />

              {/* Catch-all */}
              <Route path="*"                       element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PreLoader>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
