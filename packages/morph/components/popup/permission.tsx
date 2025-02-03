"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface FileSystemPermissionPromptProps {
  onPermissionGranted: () => void
}

export function FileSystemPermissionPrompt({
  onPermissionGranted,
}: FileSystemPermissionPromptProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasPrompted = localStorage.getItem("fileSystemPermissionPrompted")
    if (!hasPrompted) {
      setIsOpen(true)
    }
  }, [])

  const handleRequestPermission = async () => {
    try {
      // If we get here, permission was granted
      localStorage.setItem("fileSystemPermissionGranted", "true")
      onPermissionGranted()
    } catch (error) {
      console.error("Permission denied or dialog dismissed:", error)
    } finally {
      localStorage.setItem("fileSystemPermissionPrompted", "true")
      setIsOpen(false)
    }
  }

  const handleClose = () => {
    localStorage.setItem("fileSystemPermissionPrompted", "true")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>File System Access Permission</DialogTitle>
          <DialogDescription>
            morph would like to access your file system. Note that we won't store any data you have
            locally. Would you like to grant permission now?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Not Now
          </Button>
          <Button onClick={handleRequestPermission}>Grant Permission</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
