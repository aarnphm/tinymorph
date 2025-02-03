import { useState } from "react"
import { Copy, Settings, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SettingsPanel } from "./settings-panel"

interface ToolbarProps {
  toggleNotes: () => void;
  exportMarkdown: () => void;
  exportPDF: () => void;  // New function for exporting as PDF
}

export function Toolbar({ toggleNotes, exportMarkdown, exportPDF }: ToolbarProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown visibility

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">

          {/* Download Button - Opens Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Download className="h-3 w-3" width={16} height={16} />
            </Button>

            {/* Dropdown Menu for Download Options */}
            {isDropdownOpen && (
              <div
              className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50"
            >
              <button 
                className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                onClick={() => {
                  exportMarkdown();
                  setIsDropdownOpen(false);
                }}
              >
                Download as .md
              </button>
              <button 
                className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                onClick={() => {
                  exportPDF();
                  setIsDropdownOpen(false);
                }}
              >
                Download as PDF
              </button>
            </div>)}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-3 w-3" width={16} height={16} />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={toggleNotes}>
            <Copy className="h-3 w-3" width={16} height={16} />
          </Button>
        </div>
      </div>
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  )
}
