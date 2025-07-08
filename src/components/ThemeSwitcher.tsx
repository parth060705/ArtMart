import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun } from "lucide-react";
export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
  
    return (
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="ml-2 rounded-full p-2 hover:bg-muted transition-colors"
        aria-label="Toggle theme"
        type="button"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-600" />
        )}
      </button>
    );
  }