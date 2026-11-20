import { Help } from "@/widgets/help";
import { About } from "@/widgets/about";
import { Donation } from "@/widgets/donation";
import { FeaturedPets } from "@/widgets/featured-pets";
import { FirstScreen } from "@/widgets/hero";

export default function Home() {
  return (
    <main>
      <FirstScreen />
      <About />
      <FeaturedPets />
      <Help />
      <Donation />
    </main>
  );
}
