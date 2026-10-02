import type { ArtName } from "@/content/types";
import {
  BookingArt,
  CertificateArt,
  CoupleArt,
  DraftingArt,
  FadingArt,
  FoundationArt,
  GrowthArt,
  HomeArt,
  IntegrityArt,
  LivedArt,
  PaperworkArt,
  SlidesArt,
  TailoredArt,
  TeamArt,
  TrustArt,
} from "./section-art";
import { DeliverArt, DesignArt, DiscoverArt, OnlineArt, ProgramArt, WorkshopArt } from "./step-art";

const ART: Record<ArtName, () => React.JSX.Element> = {
  discover: DiscoverArt,
  design: DesignArt,
  deliver: DeliverArt,
  workshop: WorkshopArt,
  program: ProgramArt,
  online: OnlineArt,
  fading: FadingArt,
  slides: SlidesArt,
  tailored: TailoredArt,
  lived: LivedArt,
  trust: TrustArt,
  integrity: IntegrityArt,
  growth: GrowthArt,
  drafting: DraftingArt,
  foundation: FoundationArt,
  booking: BookingArt,
  team: TeamArt,
  couple: CoupleArt,
  paperwork: PaperworkArt,
  certificate: CertificateArt,
  home: HomeArt,
};

/** Renders a named illustration, so content can choose art by name (CMS-friendly). */
export function Art({ name }: { name: ArtName }) {
  const Component = ART[name];
  return <Component />;
}
