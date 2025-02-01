import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EditorContent() {
  return (
    <div className="p-6 prose prose-slate max-w-none">
      <h1 className="text-[#1e293b] text-4xl font-bold mb-4">Heading 1</h1>
      <h2 className="text-[#1e293b] text-3xl font-bold mb-4">Heading 2</h2>
      <h3 className="text-[#1e293b] text-2xl font-bold mb-4">Heading 3</h3>
      <h4 className="text-[#1e293b] text-xl font-bold mb-4">Heading 4</h4>
      <h5 className="text-[#1e293b] text-lg font-bold mb-4">Heading 5</h5>
      <h6 className="text-[#1e293b] text-base font-bold mb-4">Heading 6</h6>

      <h2 className="text-[#1e293b] text-2xl font-bold mb-4">Chapter 1, The History</h2>

      <p className="mb-4 text-[#475569] leading-relaxed">
        The city, a kaleidoscope of digital billboards and holographic projections, is in a state of perpetual twilight,
        casting an ethereal glow on its inhabitants.
      </p>

      <p className="mb-4 text-[#475569] leading-relaxed">
        X_AE_B-22's mission is to locate the source of a mysterious signal that has been disrupting the neural networks
        of both humans and synthetics alike. This signal, rumored to be the work of a rogue faction known as the Shadow
        Code, has the potential to rewrite the very fabric of consciousness.
      </p>

      <p className="mb-4 text-[#475569] leading-relaxed">
        X_AE_B-22's pursuit leads it to the subterranean depths of the city, where forgotten tunnels and abandoned
        cyber-labs hide secrets long buried by time. Each step forward unravels more of the intricate web spun by the
        Shadow Code, revealing a plot to seize control of the entire megacity.
      </p>

      <p className="text-[#475569] leading-relaxed">
        Amidst the neon-lit chaos, X_AE_B-22 encounters a diverse cast of allies and adversaries, each with their own
        agendas and secrets. There is Luna, a rebellious hacker with a vendetta against the megacorporations, and Kyro,
        a seasoned detective with a cybernetic arm who has seen too much in his lifetime.
      </p>

      <Button size="icon" className="fixed bottom-4 right-4 rounded-full shadow-lg">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}

