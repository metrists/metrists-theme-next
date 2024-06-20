import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <Button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      Toggle Mode
    </Button>
  );
}
