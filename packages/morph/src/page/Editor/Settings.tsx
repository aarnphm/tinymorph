import React, { useState, useEffect} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";  
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface SettingsProps {
  onVimBindingToggle: (enabled: boolean) => void;
}

const Settings: React.FC<SettingsProps> = ({ onVimBindingToggle }) => {
  const [activeTab, setActiveTab] = useState("general");
  const [vimBinding, setVimBinding] = useState(false);
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    if (theme !== "system") {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
  }, [theme]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };
  const handleVimBindingChange = (checked: boolean) => {
    setVimBinding(checked);
    onVimBindingToggle(checked);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <i className="las la-cog text-lg" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="settings-dialog-title">Settings</DialogTitle>
        </DialogHeader>
        <div className="settings-container">
          <div className="settings-tabs">
            <button
              className={`settings-tab flex items-center gap-2 ${activeTab === "general" ? "active" : ""}`}
              onClick={() => setActiveTab("general")}
            >
              <i className="las la-sliders-h" />
              General
            </button>
            <button
              className={`settings-tab flex items-center gap-2 ${activeTab === "suggestions" ? "active" : ""}`}
              onClick={() => setActiveTab("suggestions")}
            >
              <i className="las la-magic" />
              Suggestions
            </button>
          </div>
          <div className="settings-content">
            {activeTab === "general" && (
              <div>
                <div className="settings-item mt-[-0.4rem]">
                  <span>Theme</span>
                    <Select value={theme} onValueChange={handleThemeChange}>
                        <SelectTrigger className="w-[90px] border-none hover:bg-[#ececec] shadow-none focus:outline-none focus:ring-0">
                            <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent className="select-content">
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="settings-item">
                  <span>Vim Binding</span>
                  <Switch
                    checked={vimBinding}
                    onCheckedChange={handleVimBindingChange}
                  />
                </div>
              </div>
            )}
            {activeTab === "suggestions" && (
              <div>
                <div className="settings-item">
                    <span>Style</span>
                </div>
                <div className="settings-item">
                    <span>Tonality</span>
                </div>
                <div className="settings-item">
                    <span>Strength</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;