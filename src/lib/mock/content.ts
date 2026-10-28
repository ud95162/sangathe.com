import type { Article, Author, Category, Gallery, HomePlacements, Tag } from "@/lib/domain";
import type { Photo } from "@/lib/types";
import { ta } from "@/lib/i18n/ta";
import { daysAgoAt, hoursAgo, minutesAgo } from "@/lib/mock/time";

/** Sample photos for development only; real images come from the CMS media library. */
const photos = {
  reservoir: { src: "/images/photos/reservoir-spill-gates.jpg", alt: "நீர்த்தேக்கத்தின் வான்கதவுகளிலிருந்து வெளியேறும் வெள்ளநீர்" },
  checkpoint: { src: "/images/photos/security-checkpoint.jpg", alt: "சோதனைச் சாவடியில் பாதுகாப்புப் படையினர்" },
  harbour: { src: "/images/photos/cargo-ship-harbour.jpg", alt: "சூரிய உதயத்தில் துறைமுகத்தில் சரக்குக் கப்பல்" },
  beach: { src: "/images/photos/beach-cleanup.jpg", alt: "கடற்கரைச் சுத்திகரிப்புத் திட்டத்தில் பங்கேற்ற தன்னார்வலர்கள்" },
  technology: { src: "/images/photos/technology.jpg", alt: "தொழில்நுட்பம்" },
  townRain: { src: "/images/photos/town-rain.jpg", alt: "மழையில் நனையும் நகரம்" },
} satisfies Record<string, Photo>;

const cat = (slug: string, name: string, tone: Category["tone"], description?: string): Category => ({
  id: `cat-${slug}`,
  slug,
  name,
  tone,
  description,
});

export const categories = {
  sriLanka: cat("sri-lanka", "இலங்கை", "flame", "இலங்கையின் அனைத்துப் பகுதிகளிலிருந்தும் சமீபத்திய செய்திகள்"),
  world: cat("world", "உலகம்", "sunset", "உலகெங்குமிருந்து முக்கியச் செய்திகளும் பகுப்பாய்வுகளும்"),
  politics: cat("politics", "அரசியல்", "charcoal", "அரசியல் நிகழ்வுகள், அறிக்கைகள் மற்றும் பகுப்பாய்வுகள்"),
  business: cat("business", "வணிகம்", "sunset", "பொருளாதாரம், சந்தை மற்றும் வர்த்தகச் செய்திகள்"),
  sports: cat("sports", "விளையாட்டு", "leaf", "விளையாட்டுச் செய்திகள், முடிவுகள் மற்றும் போட்டி அட்டவணைகள்"),
  cinema: cat("cinema", "சினிமா", "flame", "திரைப்படம், இசை மற்றும் கலைச் செய்திகள்"),
  technology: cat("technology", "தொழில்நுட்பம்", "golden", "தொழில்நுட்பம், புத்தாக்கம் மற்றும் இணையச் செய்திகள்"),
  community: cat("community", "சமூகம்", "flame", "சமூகச் செய்திகள் மற்றும் மக்கள் முயற்சிகள்"),
  culture: cat("culture", "கலாசாரம்", "sunset", "கலை, பண்பாடு மற்றும் திருவிழாச் செய்திகள்"),
  education: cat("education", "கல்வி", "leaf", "கல்வி மற்றும் பரீட்சைச் செய்திகள்"),
  digest: cat("digest", "செய்திச் சுருக்கம்", "sunset", "நாளின் முக்கியச் செய்திகள் ஒரே இடத்தில்"),
};

const sub = (slug: string, name: string, parent: Category): Category => ({
  ...cat(slug, name, parent.tone),
  id: `sub-${parent.slug}-${slug}`,
  parentId: parent.id,
});

export const subcategories = {
  north: sub("north", "வடக்கு", categories.sriLanka),
  east: sub("east", "கிழக்கு", categories.sriLanka),
  hillCountry: sub("hill-country", "மலையகம்", categories.sriLanka),
  colombo: sub("colombo", "கொழும்பு", categories.sriLanka),
  sriLankaWeather: sub("weather", "வானிலை", categories.sriLanka),
};

const tag = (slug: string, name: string): Tag => ({ id: `tag-${slug}`, slug, name });
export const tags = {
  jaffna: tag("jaffna", "யாழ்ப்பாணம்"),
  weather: tag("weather", "வானிலை"),
  cricket: tag("cricket", "கிரிக்கெட்"),
  education: tag("education", "கல்வி"),
  flood: tag("flood", "வெள்ளம்"),
  eastern: tag("eastern-province", "கிழக்கு மாகாணம்"),
  dmc: tag("disaster-management", "அனர்த்த முகாமைத்துவம்"),
  tea: tag("tea", "தேயிலை"),
  cinema: tag("cinema", "சினிமா"),
};

/** Fictional sample newsroom for the demo. Real reporters come from the CMS user accounts. */
const sampleReporters = [
  {
    name: "கார்த்திகா சிவகுமார்",
    role: "மூத்த செய்தியாளர்",
    bio: "வடக்கு, கிழக்கு மற்றும் மலையகச் செய்திகளைப் பத்தாண்டுகளுக்கும் மேலாக எழுதி வருகிறார். மக்களின் அன்றாட வாழ்வியல் பிரச்சினைகளிலும் பண்பாட்டு நிகழ்வுகளிலும் கவனம் செலுத்துகிறார்.",
  },
  {
    name: "ரமேஷ் பிரபாகரன்",
    role: "வணிக மற்றும் அரசியல் செய்தியாளர்",
    bio: "பொருளாதாரம், சந்தை மற்றும் நாடாளுமன்றச் செய்திகளை ஆழமாக ஆராய்ந்து எளிய மொழியில் வழங்குகிறார்.",
  },
  {
    name: "நிரோஷா ஜெயராஜ்",
    role: "சர்வதேச விவகாரச் செய்தியாளர்",
    bio: "உலகச் செய்திகளையும் சமூக முயற்சிகளையும் தமிழ் வாசகர்களுக்கு நெருக்கமாகக் கொண்டுவருகிறார். காலநிலை மற்றும் புலம்பெயர் சமூகங்கள் குறித்து அதிகம் எழுதுகிறார்.",
  },
  {
    name: "சுரேஷ் தர்மலிங்கம்",
    role: "விளையாட்டு மற்றும் கல்விச் செய்தியாளர்",
    bio: "பாடசாலை முதல் தேசிய மட்டம் வரையிலான விளையாட்டுப் போட்டிகளையும் பரீட்சை, கல்விச் செய்திகளையும் தொடர்ந்து பின்தொடர்கிறார்.",
  },
  {
    name: "அனுஷா பாலசுப்பிரமணியம்",
    role: "கலை மற்றும் தொழில்நுட்பச் செய்தியாளர்",
    bio: "திரைப்படம், இசை மற்றும் புத்தாக்கத் தொழில்நுட்பச் செய்திகளை எழுதுகிறார். இளையோரின் படைப்புகளுக்கு முக்கியத்துவம் அளிக்கிறார்.",
  },
];

const reporterNamed = (n: number): Author => {
  const sample = sampleReporters[n - 1];
  const slug = n === 1 ? "reporter" : `reporter-${n}`;
  return {
    id: `author-${n}`,
    slug,
    name: sample.name,
    role: sample.role,
    bio: sample.bio,
    avatar: { src: `/images/authors/reporter-${n}.jpg`, alt: sample.name },
  };
};

const reporter = reporterNamed(1);
/** Sample newsroom: each reporter covers a couple of categories. */
const reportersByCategory: Record<string, Author> = {
  "sri-lanka": reporter,
  culture: reporter,
  business: reporterNamed(2),
  politics: reporterNamed(2),
  world: reporterNamed(3),
  community: reporterNamed(3),
  sports: reporterNamed(4),
  education: reporterNamed(4),
  cinema: reporterNamed(5),
  technology: reporterNamed(5),
};

/**
 * Built per call so publish times are always relative to now (the demo never shows stale
 * "25 minutes ago" labels). The real data layer replaces this with database queries.
 */
export function buildMockContent() {
  let seq = 0;
  function article(
    slug: string,
    title: string,
    category: Category,
    publishedAt: Date,
    extra: Partial<Omit<Article, "id" | "slug" | "title" | "category" | "publishedAt">> = {},
  ): Article {
    return { id: `a${++seq}`, slug, title, category, publishedAt, tags: [], views: 1200, ...extra };
  }

  const articles: Record<string, Article> = {};
  const add = (key: string, a: Article) => ((articles[key] = a), a);

  add("lead", article("reservoir-spill-gates-opened", "கனமழை காரணமாக நீர்த்தேக்கங்களின் வான்கதவுகள் திறப்பு", categories.sriLanka, minutesAgo(25), {
    summary: "தாழ்நிலப் பகுதிகளில் வசிப்பவர்கள் அவதானமாக இருக்குமாறு அனர்த்த முகாமைத்துவ நிலையம் அறிவுறுத்தியுள்ளது.",
    kicker: "இலங்கை · வானிலை", image: photos.reservoir, author: reporter, views: 24800,
    subcategory: subcategories.sriLankaWeather,
    tags: [tags.flood, tags.weather, tags.eastern, tags.dmc],
    updatedAt: minutesAgo(10),
    imageCaption: "கனமழையால் நிரம்பிய நீர்த்தேக்கத்தின் வான்கதவுகளிலிருந்து நீர் வெளியேறுகிறது.",
    imageCredit: "[புகைப்படக் கலைஞர்]",
  }));
  add("rel1", article("flood-warning-vulnerable-areas", "வெள்ள எச்சரிக்கை: பாதிக்கப்படக்கூடிய பகுதிகள்", categories.sriLanka, minutesAgo(40)));
  add("rel2", article("emergency-phone-numbers", "அவசர உதவிக்கான தொலைபேசி இலக்கங்கள்", categories.sriLanka, minutesAgo(50)));

  articles.lead.body = [
    { type: "paragraph", text: "கடந்த சில நாட்களாகப் பெய்துவரும் கனமழை காரணமாக, கிழக்கு மாகாணத்தின் பல நீர்த்தேக்கங்களின் நீர்மட்டம் வேகமாக உயர்ந்துள்ளது. இதனையடுத்து, பாதுகாப்பு நடவடிக்கையாகப் பல வான்கதவுகள் இன்று காலை திறக்கப்பட்டன." },
    { type: "paragraph", text: "நீர்த்தேக்கங்களுக்குக் கீழ்ப்பகுதியில் உள்ள தாழ்நிலப் பகுதிகளில் வசிப்பவர்கள் மிகுந்த அவதானத்துடன் இருக்குமாறு அனர்த்த முகாமைத்துவ நிலையம் அறிவுறுத்தியுள்ளது." },
    { type: "alsoRead", articleId: articles.rel1.id },
    { type: "heading", text: "பாதிக்கப்படக்கூடிய பகுதிகள்" },
    { type: "paragraph", text: "ஆற்றங்கரையோரங்களிலும் வயல் நிலங்களுக்கு அருகிலும் வசிப்பவர்கள், தேவை ஏற்படின் பாதுகாப்பான இடங்களுக்குச் செல்லத் தயாராக இருக்க வேண்டும் என அதிகாரிகள் தெரிவித்துள்ளனர்." },
    { type: "quote", text: "மக்கள் பதற்றமடைய வேண்டாம்; ஆனால் அதிகாரிகளின் அறிவுறுத்தல்களைக் கவனமாகப் பின்பற்றுங்கள்.", attribution: "[அதிகாரியின் பெயர்], அனர்த்த முகாமைத்துவ நிலையம்" },
    { type: "paragraph", text: "எதிர்வரும் 24 மணி நேரத்தில் மேலும் மழை பெய்யக்கூடும் என வளிமண்டலவியல் திணைக்களம் எதிர்வுகூறியுள்ளது." },
    { type: "image", image: photos.townRain, caption: "மழையில் நனையும் நகர வீதி.", credit: "[புகைப்படக் கலைஞர்]" },
    { type: "heading", text: "அவசர உதவி" },
    { type: "paragraph", text: "அவசர உதவி தேவைப்படுவோர் அனர்த்த முகாமைத்துவ நிலையத்தின் அவசர இலக்கத்தை [அவசர இலக்கம்] அழைக்கலாம்." },
    { type: "youtube", youtubeId: "Yx2k8fLWd-c", title: "இலங்கையின் பிரதான செய்திகள் | 27.10.2026" },
  ];

  add("checkpoint", article("middle-east-tension-checkpoints", "மத்திய கிழக்கில் பதற்றம்: சோதனைச் சாவடிகளில் பாதுகாப்பு அதிகரிப்பு", categories.world, minutesAgo(65), {
    summary: "பிராந்தியத்தில் பயணக் கட்டுப்பாடுகள் விதிக்கப்பட்டுள்ளன.", image: photos.checkpoint,
  }));
  add("tea", article("tea-exports-new-markets", "தேயிலை ஏற்றுமதிக்குப் புதிய சந்தைகளைத் தேடும் இலங்கை", categories.business, minutesAgo(125), {
    summary: "ஏற்றுமதியை அதிகரிக்கப் புதிய வர்த்தக ஒப்பந்தங்கள் குறித்துப் பேச்சுவார்த்தை நடைபெறுகிறது.", image: photos.harbour, tags: [tags.tea], views: 15600,
  }));

  add("floodEast", article("flood-warning-eastern-province", "கிழக்கு மாகாணத்தில் வெள்ள எச்சரிக்கை", categories.sriLanka, minutesAgo(18), { kicker: "வானிலை", image: photos.townRain, tags: [tags.weather], views: 18200 }));
  add("exam", article("advanced-level-results-today", "உயர்தரப் பரீட்சை முடிவுகள் இன்று வெளியீடு", categories.education, minutesAgo(30), { tags: [tags.education] }));
  add("stock", article("colombo-stock-market-opens-higher", "கொழும்பு பங்குச் சந்தை இன்று உயர்வுடன் ஆரம்பம்", categories.business, minutesAgo(45), { image: photos.harbour }));
  add("train", article("colombo-jaffna-train-resumes", "கொழும்பு-யாழ்ப்பாணம் ரயில் சேவை நாளை முதல் வழமைக்கு", categories.sriLanka, minutesAgo(55), { tags: [tags.jaffna] }));
  add("schoolSports", article("national-school-games-begin", "தேசிய பாடசாலை விளையாட்டுப் போட்டிகள் நாளை ஆரம்பம்", categories.sports, minutesAgo(60)));
  add("thunder", article("northern-thunderstorm-forecast", "வடக்கில் இன்று மாலை இடியுடன் கூடிய மழைக்கு வாய்ப்பு", categories.sriLanka, minutesAgo(120), { tags: [tags.weather] }));
  add("film", article("new-tamil-film-release", "புதிய தமிழ்த் திரைப்படம் இன்று வெளியீடு", categories.cinema, minutesAgo(122), { tags: [tags.cinema] }));

  add("football", article("jaffna-football-final", "யாழ். மாவட்ட உதைபந்தாட்டத் தொடரின் இறுதிப் போட்டி இன்று", categories.sports, hoursAgo(3), { image: photos.townRain }));
  add("aiSouthAsia", article("ai-in-south-asia-sri-lanka", "தெற்காசியாவில் செயற்கை நுண்ணறிவு: இலங்கைக்கான வாய்ப்புகள்", categories.technology, hoursAgo(4), { image: photos.technology }));
  add("filmTheatres", article("tamil-film-in-theatres", "புதிய தமிழ்த் திரைப்படம் இன்று திரையரங்குகளில் வெளியீடு", categories.cinema, hoursAgo(5), { image: photos.checkpoint, tags: [tags.cinema] }));
  add("npc", article("northern-provincial-council-session", "வட மாகாண சபை அமர்வு இன்று கூடுகிறது", categories.politics, hoursAgo(6), { image: photos.beach }));
  add("rupee", article("rupee-small-gain", "இலங்கை ரூபாவின் பெறுமதியில் சிறிய உயர்வு", categories.business, hoursAgo(7), { image: photos.harbour }));
  add("climate", article("climate-conference-begins", "காலநிலை மாற்றம் தொடர்பான சர்வதேச மாநாடு இன்று ஆரம்பம்", categories.world, hoursAgo(8), { image: photos.reservoir }));
  add("library", article("jaffna-public-library-opens", "யாழ்ப்பாணத்தில் புதிய பொது நூலக வளாகம் திறப்பு", categories.sriLanka, hoursAgo(9), { image: photos.technology, tags: [tags.jaffna] }));
  add("cricketSquad", article("sri-lanka-cricket-squad", "இலங்கை கிரிக்கெட் அணி அறிவிப்பு", categories.sports, hoursAgo(10), { image: photos.checkpoint, tags: [tags.cricket] }));

  add("beachProject", article("beach-cleanup-marine-protection", "கடல் சூழலைப் பாதுகாக்கக் கடற்கரைச் சுத்திகரிப்புத் திட்டம்", categories.sriLanka, hoursAgo(3), { image: photos.beach }));
  add("batticaloaHarbour", article("batticaloa-fishermen-harbour", "மட்டக்களப்பில் மீனவர்களுக்கான புதிய துறைமுக வசதிகள்", categories.sriLanka, hoursAgo(6), { image: photos.harbour }));
  add("trincoTourists", article("trincomalee-tourist-arrivals", "திருகோணமலைக் கடற்கரைக்குச் சுற்றுலாப் பயணிகளின் வருகை அதிகரிப்பு", categories.sriLanka, hoursAgo(8), { image: photos.beach }));
  add("hillHousing", article("hill-country-housing-scheme", "மலையகத் தோட்டத் தொழிலாளர்களுக்குப் புதிய வீட்டுத் திட்டம்", categories.sriLanka, daysAgoAt(1, 18, 30), { image: photos.townRain }));

  add("asiaTrade", article("asia-trade-conference-singapore", "ஆசிய நாடுகளுக்கிடையிலான வர்த்தக மாநாடு சிங்கப்பூரில் ஆரம்பம்", categories.world, hoursAgo(5), { image: photos.harbour }));
  add("unClimate", article("un-general-assembly-climate-finance", "ஐ.நா. பொதுச் சபையில் காலநிலை நிதி குறித்துக் கலந்துரையாடல்", categories.world, hoursAgo(7), { image: photos.reservoir }));
  add("indiaRail", article("india-high-speed-rail", "இந்தியாவில் புதிய அதிவேக ரயில் சேவை அறிமுகம்", categories.world, hoursAgo(9), { image: photos.technology }));
  add("africaSolar", article("africa-solar-expansion", "ஆபிரிக்காவில் சூரிய மின்சக்தித் திட்டங்கள் விரிவாக்கம்", categories.world, daysAgoAt(1, 21, 15), { image: photos.technology }));

  add("tourismIncome", article("tourism-revenue-rises", "சுற்றுலாத் துறை வருமானம் அதிகரிப்பு", categories.business, hoursAgo(4), { image: photos.beach }));
  add("smeLoan", article("sme-new-loan-scheme", "சிறு தொழில் முயற்சியாளர்களுக்குப் புதிய கடன் திட்டம்", categories.business, hoursAgo(10), { image: photos.harbour }));
  add("coconut", article("coconut-price-change", "தேங்காய் விலையில் மாற்றம்", categories.business, daysAgoAt(3, 9, 0), { image: photos.townRain }));

  add("northCheckpoints", article("north-checkpoints-security", "வடக்கில் சோதனைச் சாவடிகளில் பாதுகாப்பு அதிகரிப்பு", categories.sriLanka, hoursAgo(11), { image: photos.checkpoint, views: 11900 }));
  add("trincoCleanup", article("trincomalee-volunteers-cleanup", "திருகோணமலை கடற்கரையில் தன்னார்வலர்கள் சுத்திகரிப்புப் பணி", categories.community, hoursAgo(12), { image: photos.beach, views: 9400 }));
  add("aiTamil", article("ai-in-tamil-new-opportunities", "தமிழில் செயற்கை நுண்ணறிவு: புதிய வாய்ப்புகள்", categories.technology, hoursAgo(13), { image: photos.technology, views: 7100 }));

  // Real public YouTube videos (third-party, for the client demo only). Titles are the originals;
  // durations come from YouTube. In the CMS the editor writes the headline and pastes the link.
  const video = (key: string, slug: string, title: string, category: Category, youtubeId: string, duration: string) =>
    add(key, article(slug, title, category, hoursAgo(14), { video: { youtubeId, duration } }));
  video("videoFeatured", "main-news-27-10-2026", "இலங்கையின் பிரதான செய்திகள் | 27.10.2026 | Sri Lanka Tamil News", categories.digest, "Yx2k8fLWd-c", "20:55");
  video("video1", "news-first-tamil-news-27-10-2026", "இலங்கை பிரதான செய்திகள் | 27.10.2026 | News 1st", categories.digest, "WgrHs5J2pco", "14:06");
  video("video2", "evening-news-27-10-2026", "இலங்கையின் பிரதான செய்திகள் | Sri Lanka Evening News", categories.digest, "Z9X7zZpmf1w", "20:44");
  video("video3", "sri-lankan-tamil-caste-podcast", "சாதி? | A Sri Lankan Tamil Edition | Podcast", categories.culture, "brM_tbM8GEQ", "25:24");
  video("video4", "shanthi-life-in-sri-lanka", "Shanthi Opens Up About Life In Sri Lanka", categories.sriLanka, "Kt0Id8HaOH4", "48:54");

  const samplePhotoList = Object.values(photos);
  const gallery = (
    slug: string,
    title: string,
    photoCount: number,
    offset: number,
    hoursBack: number,
    description?: string,
  ): Gallery => {
    // Sample galleries reuse the six development photos; real ones come from the media library.
    const list = Array.from({ length: photoCount }, (_, i) => {
      const base = samplePhotoList[(offset + i) % samplePhotoList.length];
      return {
        image: { src: base.src, alt: `${title}: படம் ${i + 1}` },
        caption: `[படத்தின் விளக்கம் ${i + 1}]`,
        credit: "[புகைப்படக் கலைஞர்]",
      };
    });
    return {
      id: `gal-${slug}`,
      slug,
      title,
      description,
      photoCount,
      cover: list[0].image,
      photos: list,
      publishedAt: hoursAgo(hoursBack),
    };
  };
  const galleries: Record<string, Gallery> = {
    nallur: gallery("nallur-festival", "நல்லூர்த் திருவிழா", 24, 5, 20, "நல்லூர்க் கந்தசுவாமி கோவில் திருவிழாவின் சிறப்புக் காட்சிகள்."),
    vanni: gallery("vanni-harvest", "வன்னியில் அறுவடை", 18, 2, 44, "அறுவடைக் காலத்தில் வன்னி வயல்வெளிகளின் காட்சிகள்."),
    library: gallery("jaffna-library-opening", "யாழ். நூலகத் திறப்பு விழா", 12, 4, 70, "புதிய பொது நூலக வளாகத் திறப்பு விழாவின் படங்கள்."),
    trinco: gallery("trincomalee-beach", "திருகோணமலைக் கடற்கரை", 15, 0, 96, "திருகோணமலைக் கடற்கரையின் காலை நேரக் காட்சிகள்."),
    fort: gallery("jaffna-fort", "யாழ். கோட்டைச் சுற்றுலா", 14, 1, 120, "வரலாற்றுச் சிறப்புமிக்க யாழ். கோட்டையின் படங்கள்."),
    tea: gallery("hill-country-tea", "மலையகத் தேயிலைத் தோட்டங்கள்", 21, 3, 150, "மலையகத் தேயிலைத் தோட்டங்களில் ஒரு நாள்."),
    lagoon: gallery("batticaloa-lagoon-evening", "மட்டக்களப்பு வாவி மாலை", 16, 5, 190, "மட்டக்களப்பு வாவியின் மாலை நேர அழகு."),
    science: gallery("student-science-fair", "மாணவர் அறிவியல் கண்காட்சி", 30, 4, 240, "மாணவர்களின் அறிவியல் படைப்புகள் இடம்பெற்ற கண்காட்சி."),
  };

  const ids = (...keys: string[]) => keys.map((k) => articles[k].id);

  /** Mock "homepage placement", the choices the News Editor will make in the CMS. */
  const placements: HomePlacements = {
    ticker: ["floodEast", "exam", "train"].map((k) => articles[k].id),
    trendingTags: Object.values(tags).map((t) => t.id),
    lead: articles.lead.id,
    leadRelated: ids("rel1", "rel2"),
    middle: ids("checkpoint", "tea"),
    latest: ids("floodEast", "exam", "stock", "train", "schoolSports", "thunder", "film"),
    moreTop: ids("football", "aiSouthAsia", "filmTheatres", "npc", "rupee", "climate", "library", "cricketSquad"),
    featuredVideo: articles.videoFeatured.id,
    upNextVideos: ids("video1", "video2", "video3", "video4"),
    categorySections: [
      { categoryId: categories.sriLanka.id, tone: "flame", leadId: articles.beachProject.id, listIds: ids("batticaloaHarbour", "trincoTourists", "hillHousing") },
      { categoryId: categories.world.id, tone: "sunset", leadId: articles.asiaTrade.id, listIds: ids("unClimate", "indiaRail", "africaSolar") },
      { categoryId: categories.business.id, tone: "leaf", leadId: articles.stock.id, listIds: ids("tourismIncome", "smeLoan", "coconut") },
    ],
    mostRead: ids("lead", "floodEast", "tea", "northCheckpoints", "trincoCleanup", "aiTamil"),
    trending: ids("northCheckpoints", "lead", "floodEast", "tea", "trincoCleanup", "aiTamil"),
    galleries: [galleries.nallur, galleries.vanni, galleries.library, galleries.trinco].map((g) => g.id),
  };

  // Place existing Sri Lanka stories under their sub-category.
  const { north, east, hillCountry, colombo, sriLankaWeather } = subcategories;
  const placeIn: Record<string, Category> = {
    rel1: sriLankaWeather, rel2: sriLankaWeather, thunder: sriLankaWeather,
    floodEast: east, beachProject: east, batticaloaHarbour: east, trincoTourists: east,
    train: north, library: north, northCheckpoints: north,
    hillHousing: hillCountry,
  };
  for (const [key, subcategory] of Object.entries(placeIn)) articles[key].subcategory = subcategory;

  // Sample stories so category pages have enough to list and paginate.
  const samplePhotos = Object.values(photos);
  let fillerIndex = 0;
  const filler = (category: Category, subcategory: Category | undefined, items: [string, string, string?][]) => {
    for (const [slug, title, summary] of items) {
      const i = fillerIndex++;
      add(`filler-${slug}`, article(slug, title, category, hoursAgo(12 + i * 9), {
        summary,
        subcategory,
        image: samplePhotos[i % samplePhotos.length],
        views: 300 + ((i * 137) % 900),
      }));
    }
  };
  filler(categories.sriLanka, north, [
    ["kilinochchi-seed-paddy", "கிளிநொச்சியில் விதைநெல் விநியோகம் ஆரம்பம்", "பெரும்போகத்துக்கான விதைநெல் விவசாயிகளுக்கு வழங்கப்படுகிறது."],
    ["mannar-new-ferry-service", "மன்னாரில் புதிய படகுச் சேவை அறிமுகம்", "தீவுப் பகுதி மக்களின் போக்குவரத்து எளிதாகும் என எதிர்பார்க்கப்படுகிறது."],
    ["vavuniya-hospital-new-ward", "வவுனியா வைத்தியசாலையில் புதிய சிகிச்சைப் பிரிவு திறப்பு", "நோயாளர்களுக்கான வசதிகள் மேம்படுத்தப்பட்டுள்ளன."],
  ]);
  filler(categories.sriLanka, east, [
    ["ampara-elephant-fence", "அம்பாறையில் யானை வேலி அமைக்கும் பணிகள் தீவிரம்", "மனித-யானை மோதலைக் குறைக்கும் நடவடிக்கையின் ஒரு பகுதியாக இது முன்னெடுக்கப்படுகிறது."],
    ["batticaloa-lagoon-cleanup", "மட்டக்களப்பு வாவியைத் தூய்மைப்படுத்தும் திட்டம் ஆரம்பம்", "உள்ளூர் அமைப்புகள் இணைந்து இத்திட்டத்தை முன்னெடுக்கின்றன."],
    ["trincomalee-school-renovation", "திருகோணமலையில் பாடசாலைக் கட்டடங்கள் புதுப்பிப்பு", "மழைக்காலத்துக்கு முன் பணிகளை நிறைவு செய்ய அதிகாரிகள் திட்டமிட்டுள்ளனர்."],
  ]);
  filler(categories.sriLanka, hillCountry, [
    ["nuwara-eliya-vegetable-prices", "நுவரெலியாவில் மரக்கறி விலைகளில் வீழ்ச்சி", "அறுவடை அதிகரிப்பால் விவசாயிகள் நெருக்கடியை எதிர்நோக்குகின்றனர்."],
    ["badulla-estate-wages", "பதுளைத் தோட்டத் தொழிலாளர்களின் சம்பளம் குறித்துப் பேச்சு", "தொழிற்சங்கப் பிரதிநிதிகள் நிர்வாகத்துடன் கலந்துரையாடினர்."],
    ["kandy-landslide-warning", "கண்டி மாவட்டத்தில் மண்சரிவு எச்சரிக்கை நீடிப்பு", "அபாயப் பகுதிகளில் வசிப்பவர்கள் அவதானமாக இருக்க வேண்டும் எனக் கோரப்பட்டுள்ளது."],
  ]);
  filler(categories.sriLanka, colombo, [
    ["colombo-traffic-plan", "கொழும்பில் போக்குவரத்து நெரிசலைக் குறைக்கப் புதிய திட்டம்", "முக்கிய சந்திகளில் சமிக்ஞை முறைமை மேம்படுத்தப்படவுள்ளது."],
    ["colombo-port-city-conference", "கொழும்புத் துறைமுக நகரத்தில் முதலீட்டு மாநாடு", "பல நாடுகளின் வர்த்தகப் பிரதிநிதிகள் பங்கேற்றனர்."],
    ["colombo-dengue-awareness", "கொழும்பில் டெங்கு ஒழிப்பு விழிப்புணர்வு நடவடிக்கை", "வீடுகள் மற்றும் பொது இடங்களில் பரிசோதனைகள் இடம்பெறுகின்றன."],
  ]);
  filler(categories.sriLanka, sriLankaWeather, [
    ["sea-conditions-fishermen", "கடல் சீற்றம்: மீனவர்களுக்கு எச்சரிக்கை", "ஆழ்கடலுக்குச் செல்வதைத் தவிர்க்குமாறு திணைக்களம் அறிவித்துள்ளது."],
    ["temperature-rise-northeast", "வடகிழக்குப் பகுதிகளில் வெப்பநிலை அதிகரிப்பு", "பகல் வேளையில் வெளியில் செல்வோர் நீர் அருந்துமாறு ஆலோசனை வழங்கப்பட்டுள்ளது."],
  ]);
  filler(categories.world, undefined, [
    ["us-tech-regulation-bill", "தொழில்நுட்ப நிறுவனங்களுக்கான புதிய கட்டுப்பாட்டுச் சட்டம் அறிமுகம்"],
    ["europe-heatwave-warning", "ஐரோப்பாவில் வெப்ப அலை எச்சரிக்கை"],
    ["japan-population-policy", "ஜப்பானில் மக்கள்தொகை வீழ்ச்சியைச் சமாளிக்கப் புதிய கொள்கை"],
  ]);
  filler(categories.politics, undefined, [
    ["parliament-budget-debate", "வரவு செலவுத் திட்ட விவாதம் நாடாளுமன்றில் ஆரம்பம்"],
    ["local-council-election-date", "உள்ளூராட்சித் தேர்தல் திகதி குறித்து ஆணைக்குழு கலந்துரையாடல்"],
    ["constitution-amendment-committee", "அரசியலமைப்புத் திருத்தக் குழு கூடுகிறது"],
  ]);
  filler(categories.sports, undefined, [
    ["football-league-semi-finals", "உதைபந்தாட்டக் கழகங்களுக்கிடையிலான அரையிறுதிப் போட்டிகள்"],
    ["athletics-national-record", "தடகளப் போட்டியில் புதிய தேசிய சாதனை"],
    ["cricket-practice-match-win", "பயிற்சிப் போட்டியில் இலங்கை அணி வெற்றி"],
  ]);
  filler(categories.cinema, undefined, [
    ["tamil-film-festival-jaffna", "யாழ்ப்பாணத்தில் தமிழ்த் திரைப்பட விழா"],
    ["music-album-release", "புதிய இசைத் தொகுப்பு இன்று வெளியீடு"],
    ["actor-interview-new-role", "புதிய கதாபாத்திரம் குறித்து நடிகர் பகிர்ந்த அனுபவம்"],
  ]);
  filler(categories.technology, undefined, [
    ["mobile-payments-growth", "இலங்கையில் கைப்பேசிப் பணப்பரிமாற்றம் அதிகரிப்பு"],
    ["school-coding-programme", "பாடசாலைகளில் நிரலாக்கப் பயிற்சித் திட்டம்"],
    ["cyber-safety-tips", "இணையப் பாதுகாப்புக்கான எளிய வழிமுறைகள்"],
  ]);

  // Spread authors and tags over the sample stories so author and tag pages have something to list.
  const dedupe = (a: Article, ...extra: Tag[]) => {
    a.tags = [...a.tags, ...extra.filter((t) => !a.tags.some((x) => x.id === t.id))];
  };
  for (const a of Object.values(articles)) {
    if (a.video) continue;
    a.author ??= reportersByCategory[a.category.slug] ?? reporter;
    if (a.subcategory?.slug === "weather") dedupe(a, tags.weather);
    if (a.subcategory?.slug === "east") dedupe(a, tags.eastern);
    if (a.subcategory?.slug === "north") dedupe(a, tags.jaffna);
    if (a.category.slug === "cinema") dedupe(a, tags.cinema);
    if (a.category.slug === "education") dedupe(a, tags.education);
    if (a.slug === "cricket-practice-match-win") dedupe(a, tags.cricket);
  }

  // Every non-video sample story gets a photo so lists never show empty boxes.
  Object.values(articles).forEach((a, i) => {
    if (!a.image && !a.video) a.image = samplePhotos[i % samplePhotos.length];
  });

  // Articles without a hand-written body get placeholder text (and their video, for video articles).
  for (const a of Object.values(articles)) {
    if (a.body) continue;
    a.body = [
      ...(a.video ? [{ type: "youtube" as const, youtubeId: a.video.youtubeId, title: a.title }] : []),
      ...(a.summary ? [{ type: "paragraph" as const, text: a.summary }] : []),
      ...ta.article.placeholderBody.map((text) => ({ type: "paragraph" as const, text })),
    ];
  }

  return { articles, galleries, placements };
}
