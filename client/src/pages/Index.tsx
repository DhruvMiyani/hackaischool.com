import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const events = [
  {
    date: "Jun 16",
    name: "Cluely Afterparty",
    hosts: "Cluely - Roy",
    type: "Invite‑only",
    notes: "DM for link",
  },
  {
    date: "Jun 16",
    name: "Anthropic HQ Afterparty",
    hosts: "Anthropic",
    type: "Exclusive",
    notes: "Claude panel, boba",
  },
  {
    date: "Jun 16–17",
    name: "Corgi Hacker‑House",
    hosts: "Corgi Insurance (YC S24)",
    type: "Hacker‑house",
    notes: "RSVP via Partiful, resume/project roast",
    link: "https://partiful.com/e/P3J3LJmJeAa96wmffgVA",
  },
  {
    date: "Jun 16–17",
    name: "Josh Locke Afterparty",
    hosts: "Josh Locke",
    type: "Technical founders",
    notes: "No salespeople",
  },
  {
    date: "Jun 16–17",
    name: "Party #19 of 21 (Duck9 / Luma)",
    hosts: "Larry Chiang, Duck9",
    type: "Unofficial apartment",
    notes: "RSVP via Luma",
  },
  {
    date: "Jun 16–17",
    name: "Startup School Afterparty",
    hosts: "Comulate, Perplexity, Wispr, Warp, Conversion",
    type: "Multi‑startup",
    notes: "Food, swag, interns",
  },
  {
    date: "Jun 18",
    name: "Stanford Founders Afterparty",
    hosts: "Stanford founders",
    type: "Unofficial",
    notes: "Music, demos",
  },
];

function getTypeBadge(type: string) {
  switch (type) {
    case "Invite‑only":
      return <Badge className="bg-blue-200 text-blue-900">{type}</Badge>;
    case "Exclusive":
      return <Badge className="bg-red-200 text-red-900">{type}</Badge>;
    case "Technical founders":
      return <Badge className="bg-emerald-200 text-emerald-900">{type}</Badge>;
    case "Unofficial apartment":
      return <Badge className="bg-yellow-100 text-yellow-700">{type}</Badge>;
    case "Multi‑startup":
      return <Badge className="bg-violet-200 text-violet-900">{type}</Badge>;
    case "Hacker‑house":
      return <Badge className="bg-cyan-200 text-cyan-900">{type}</Badge>;
    case "Unofficial":
      return <Badge className="bg-gray-300 text-gray-800">{type}</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
}

const highlightKeywords = (notes: string) => {
  let out = notes;
  out = out.replace(/\b(DM for link)\b/gi, `<span class="font-medium bg-blue-100 text-blue-900 px-2 py-1 rounded">DM for link</span>`);
  out = out.replace(/\b(RSVP (via [^\s,]+))\b/gi, `<span class="font-medium bg-yellow-50 text-yellow-800 px-2 py-1 rounded">$1</span>`);
  out = out.replace(/\b(No salespeople)\b/gi, `<span class="font-semibold bg-gray-100 text-gray-700 px-2 py-1 rounded">No salespeople</span>`);
  out = out.replace(/\b(Claude panel)\b/gi, `<span class="italic text-indigo-700">Claude panel</span>`);
  out = out.replace(/\b(Food|swag|interns)\b/gi, `<span class="bg-green-50 text-green-700 px-2 py-1 rounded">$1</span>`);
  out = out.replace(/\b(resume\/project roast)\b/gi, `<span class="bg-cyan-50 text-cyan-700 px-2 py-1 rounded">$1</span>`);
  return out;
};

function getActionButton(notes: string, hosts: string, link?: string) {
  const RSVPMatch = notes.match(/\b(RSVP)\b/i);
  const DMMatch = notes.match(/\b(DM)\b/i);
  if (RSVPMatch) {
    const isCorgi = hosts.includes("Corgi Insurance");
    if (isCorgi && link) {
      return (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-3 py-1 rounded" size="sm" variant="secondary">
            RSVP
          </Button>
        </a>
      );
    }
    return (
      <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold px-3 py-1 rounded" size="sm" variant="secondary">
        RSVP
      </Button>
    );
  }
  if (DMMatch) {
    const isCluely = hosts.includes("Cluely - Roy");
    if (isCluely) {
      return (
        <a 
          href="https://www.linkedin.com/in/roy-lee-goat/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-3 py-1 rounded" size="sm" variant="secondary">
            DM Host
          </Button>
        </a>
      );
    }
    return (
      <Button className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold px-3 py-1 rounded" size="sm" variant="secondary">
        DM Host
      </Button>
    );
  }
  return (
    <Button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1 rounded" size="sm" variant="outline">
      Details
    </Button>
  );
}

const Index = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-zinc-50 via-white to-blue-50 py-12 px-6 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-8">
        {/* HERO HEADER SECTION */}
        <section className="flex flex-col items-center gap-2 mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-900 tracking-tight text-center">
            hackaischool.com
          </h1>
          <span className="mt-2 text-lg md:text-xl font-medium text-cyan-900 text-center tracking-wide">
            AI Hackathon - events resource page
          </span>
        </section>

        {/* Existing event table/card */}
        <header className="mb-4">
          <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">
            YC AI School after party Events
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Upcoming afterparties, hacker houses, and unofficial events at a glance.
          </p>
        </header>
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-zinc-200">
          <ScrollArea className="w-full max-h-[520px]">
            <Table>
              <TableHeader className="bg-gradient-to-r from-blue-100/50 via-indigo-50 to-cyan-50">
                <TableRow>
                  <TableHead className="w-[120px] text-lg font-semibold text-zinc-700">Date</TableHead>
                  <TableHead className="min-w-[220px] text-lg font-semibold text-zinc-700">Event Name</TableHead>
                  <TableHead className="min-w-[180px] text-lg font-semibold text-zinc-700">Host(s)</TableHead>
                  <TableHead className="w-[120px] text-lg font-semibold text-zinc-700">Type</TableHead>
                  <TableHead className="min-w-[200px] text-lg font-semibold text-zinc-700">Notes</TableHead>
                  <TableHead className="w-[130px] text-lg font-semibold text-zinc-700">Apply/RSVP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((evt, i) => (
                  <TableRow
                    key={evt.name}
                    className={`transition hover:bg-blue-50 ${
                      i % 2 === 0 ? "bg-zinc-50" : "bg-white"
                    }`}
                  >
                    <TableCell className="text-base font-semibold text-sky-900">{evt.date}</TableCell>
                    <TableCell className="font-medium">{evt.name}</TableCell>
                    <TableCell className="text-zinc-700">{evt.hosts}</TableCell>
                    <TableCell>{getTypeBadge(evt.type)}</TableCell>
                    <TableCell>
                      <span
                        className="text-slate-700"
                        dangerouslySetInnerHTML={{ __html: highlightKeywords(evt.notes) }}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {getActionButton(evt.notes, evt.hosts, evt.link)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <footer className="pt-6 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            For the latest links and more info, check event chats or reach out to hosts.
          </span>
        </footer>
      </div>
    </div>
  );
};

export default Index;
