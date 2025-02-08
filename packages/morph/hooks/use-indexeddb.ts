import { useEffect, useState, useCallback } from "react"

interface NoteData {
  vaultId: string
  fileId: string
  content: string
  updatedAt: number
}

const DB_NAME = "morph"
const STORE_NAME = "notes"

export function useIndexedDB(vaultId: string, fileId: string) {
  const [db, setDb] = useState<IDBDatabase | null>(null)
  const [content, setContent] = useState("")

  const loadContent = useCallback(
    async (db: IDBDatabase) => {
      const transaction = db.transaction(STORE_NAME, "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const index = store.index("vault_file")

      const request = index.get([vaultId, fileId])
      request.onsuccess = () => {
        if (request.result) {
          setContent(request.result.content)
        }
      }
    },
    [fileId, vaultId],
  )

  const saveContent = async (content: string) => {
    if (!db) return

    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index("vault_file")

    // Check for existing entry
    const getRequest = index.get([vaultId, fileId])
    getRequest.onsuccess = () => {
      const data: NoteData = {
        vaultId,
        fileId,
        content,
        updatedAt: Date.now(),
      }

      if (getRequest.result) {
        // Update existing
        store.put({ ...getRequest.result, ...data })
      } else {
        // Add new
        store.add(data)
      }
    }
  }

  const deleteContent = async () => {
    if (!db) return

    const transaction = db.transaction(STORE_NAME, "readwrite")
    const store = transaction.objectStore(STORE_NAME)
    const index = store.index("vault_file")

    const request = index.getKey([vaultId, fileId])
    request.onsuccess = () => {
      if (request.result) {
        store.delete(request.result)
      }
    }
  }

  useEffect(() => {
    const request = indexedDB.open(DB_NAME)

    request.onsuccess = () => {
      const db = request.result
      setDb(db)
      // Load initial content
      loadContent(db)
    }

    request.onerror = () => {
      console.error("IndexedDB error:", request.error)
    }
  }, [loadContent])

  return { content, saveContent, deleteContent }
}
