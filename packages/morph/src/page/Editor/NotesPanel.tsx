interface DataPoint {
  x: string;
  y: number;
}

interface Note {
  id: number;
  title: string;
  content: string;
  graph?: DataPoint[];
}

const sampleNotes: Note[] = [
  { 
    id: 1, 
    title: "Note 1", 
    content: "This is the first note. It provides overview of important details.",
    graph: [
      { x: 'a', y: 0.2 },
      { x: 'b', y: 0.5 },
      { x: 'c', y: 0.3 },
      { x: 'd', y: 0.8 },
    ]
  },
  { 
    id: 2, 
    title: "Note 2", 
    content: "This is the second note, and it includes slightly more details about the topic.",
    graph: [
      { x: 'a', y: 0.5 },
      { x: 'b', y: 0.7 },
      { x: 'c', y: 0.6 },
      { x: 'd', y: 0.4 },
    ]
  },
  { 
    id: 3, 
    title: "Note 3", 
    content: "This is the third note. It's concise and straight to the point.",
    graph: [
      { x: 'a', y: 0.3 },
      { x: 'b', y: 0.4 },
      { x: 'c', y: 0.6 },
      { x: 'd', y: 0.8 },
    ]
  },
  { 
    id: 4, 
    title: "Note 4", 
    content: "This is the fourth note. Here, we discuss some related ideas without going too in depth.",
    graph: [
      { x: 'a', y: 0.1 },
      { x: 'b', y: 0.3 },
      { x: 'c', y: 0.5 },
      { x: 'd', y: 0.4 },
    ]
  },
  { 
    id: 5, 
    title: "Note 5", 
    content: "This is the fifth note. It's much shorter than the others.",
    graph: [
      { x: 'a', y: 0.4 },
      { x: 'b', y: 0.6 },
      { x: 'c', y: 0.8 },
      { x: 'd', y: 0.7 },
    ]
  }
];


export function NotesPanel() {
  const leftColumnNotes = sampleNotes.filter((_, index) => index % 2 === 0);
  const rightColumnNotes = sampleNotes.filter((_, index) => index % 2 === 1);

  return (
    <div className="notes-panel">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      <div className="notes-columns">
        <div className="notes-column">
          {leftColumnNotes.map((note) => (
            <div 
              key={note.id} 
              className="note-item"
            >
              <h3 className="font-semibold mb-2">{note.title}</h3>
              <p className="text-sm text-gray-600">{note.content}</p>
            </div>
          ))}
        </div>
        <div className="notes-column">
          {rightColumnNotes.map((note) => (
            <div 
              key={note.id} 
              className="note-item"
            >
              <h3 className="font-semibold mb-2">{note.title}</h3>
              <p className="text-sm text-gray-600">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}