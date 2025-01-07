interface Note {
  id: number;
  title: string;
  content: string;
}

const sampleNotes: Note[] = [
  { id: 1, title: "Note 1", content: "This is the first note." },
  { id: 2, title: "Note 2", content: "This is the second note." },
  { id: 3, title: "Note 3", content: "This is the third note." },
  { id: 4, title: "Note 4", content: "This is the fourth note." },
  { id: 5, title: "Note 5", content: "This is the fifth note." }
];

export function NotesPanel() {
  return (
    <div className="notes-panel">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <div className="space-y-4">
        {sampleNotes.map((note) => (
          <div key={note.id} className="border-b pb-3">
            <h3 className="font-semibold mb-1">{note.title}</h3>
            <p className="text-sm text-gray-600">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}