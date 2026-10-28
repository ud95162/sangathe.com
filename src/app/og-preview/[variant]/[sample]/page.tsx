import Image from "next/image";
import { notFound } from "next/navigation";
import { FlameStripe } from "@/components/ui/FlameStripe";

// Design preview of the share image (1200x630). Development only: it is replaced by the
// generated per-article image once the client approves a template.
export const instant = false;

const samples = {
  lead: {
    category: "இலங்கை · வானிலை",
    title: "கனமழை காரணமாக நீர்த்தேக்கங்களின் வான்கதவுகள் திறப்பு",
    image: "/images/photos/reservoir-spill-gates.jpg",
  },
  tea: {
    category: "வணிகம்",
    title: "தேயிலை ஏற்றுமதிக்குப் புதிய சந்தைகளைத் தேடும் இலங்கை",
    image: "/images/photos/cargo-ship-harbour.jpg",
  },
  long: {
    category: "உலகம்",
    title: "மத்திய கிழக்கில் பதற்றம்: சோதனைச் சாவடிகளில் பாதுகாப்பு அதிகரிப்பு; பயணக் கட்டுப்பாடுகள் விதிப்பு",
    image: "/images/photos/security-checkpoint.jpg",
  },
} as const;

type Sample = (typeof samples)[keyof typeof samples];

/** Longer headlines get a smaller size so they always fit instead of being cut off. */
function headlineSize(title: string, sizes: [number, number, number, number]) {
  const n = title.length;
  return n <= 45 ? sizes[0] : n <= 65 ? sizes[1] : n <= 85 ? sizes[2] : sizes[3];
}

function Logo({ height }: { height: number }) {
  return (
    <div className="w-fit" style={{ height }}>
      <Image
        src="/logo/sangathe-logo-light.png"
        alt="Sangathe Digital"
        width={800}
        height={431}
        priority
        style={{ height, width: "auto" }}
      />
    </div>
  );
}

/** A: the photo fills the card; the headline sits on a frosted glass panel. */
function LayoutA({ s }: { s: Sample }) {
  return (
    <div className="relative h-[630px] w-[1200px] overflow-hidden bg-charcoal text-white">
      <Image src={s.image} alt="" fill sizes="1200px" priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/0 to-charcoal/45" />

      <span className="absolute left-12 top-10 bg-flame px-6 py-2.5 text-[24px] font-bold">{s.category}</span>
      <div className="absolute right-12 top-8 rounded-[0_20px_0_20px] glass-dark px-6 py-3">
        <Logo height={58} />
      </div>

      <div className="absolute inset-x-10 bottom-12 flex flex-col gap-5 rounded-[0_36px_0_36px] glass-dark px-12 py-9">
        <h1 className="font-serif font-bold leading-[1.45]" style={{ fontSize: headlineSize(s.title, [58, 52, 46, 40]) }}>
          {s.title}
        </h1>
        <div className="flex items-center justify-between">
          <FlameStripe className="h-1.5 w-40" />
          <span className="font-poppins text-[22px] font-semibold tracking-[1px] text-fog">sangathe.com</span>
        </div>
      </div>
      <FlameStripe className="absolute inset-x-0 bottom-0 h-3" />
    </div>
  );
}

/** B: a dark editorial panel with the headline, and the photo on the right with a leaf-cut corner. */
function LayoutB({ s }: { s: Sample }) {
  return (
    <div className="relative flex h-[630px] w-[1200px] overflow-hidden bg-charcoal text-white">
      <div className="relative z-10 flex w-[740px] shrink-0 flex-col justify-between bg-charcoal bg-[radial-gradient(90%_100%_at_0%_100%,rgb(249_115_22/0.3)_0%,rgb(225_29_46/0.16)_42%,rgb(31_41_55/0)_75%)] px-12 pb-14 pt-12">
        <Logo height={64} />
        <div className="flex flex-col gap-5">
          <span className="text-[24px] font-bold text-golden">{s.category}</span>
          <h1 className="font-serif font-bold leading-[1.45]" style={{ fontSize: headlineSize(s.title, [58, 50, 44, 38]) }}>
            {s.title}
          </h1>
        </div>
        <div className="flex items-center justify-between">
          <FlameStripe className="h-1.5 w-40" />
          <span className="font-poppins text-[22px] font-semibold tracking-[1px] text-fog">sangathe.com</span>
        </div>
      </div>
      <div className="relative -ml-[1px] h-full flex-1 overflow-hidden rounded-tl-[120px]">
        <Image src={s.image} alt="" fill sizes="520px" priority className="object-cover" />
      </div>
      <FlameStripe className="absolute inset-x-0 bottom-0 z-20 h-3" />
    </div>
  );
}

export default async function OgPreviewPage({ params }: PageProps<"/og-preview/[variant]/[sample]">) {
  if (process.env.NODE_ENV === "production") notFound();
  const { variant, sample } = await params;
  const s = samples[sample as keyof typeof samples];
  if (!s || (variant !== "a" && variant !== "b")) notFound();
  return (
    <>
      {/* Keeps the Next dev badge out of the exported image. */}
      <style>{"nextjs-portal{display:none!important}"}</style>
      {variant === "a" ? <LayoutA s={s} /> : <LayoutB s={s} />}
    </>
  );
}
