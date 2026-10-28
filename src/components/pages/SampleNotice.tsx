import { Container } from "@/components/ui/Container";
import { ta } from "@/lib/i18n/ta";

/** Shown above the hero while a page still carries placeholder wording. */
export function SampleNotice() {
  return (
    <Container className="mb-6">
      <p className="bg-flame-tint px-[18px] py-3.5 text-[15px] font-semibold text-flame-text">
        {ta.staticPage.sampleNotice}
      </p>
    </Container>
  );
}
