import Hero from "@/components/landing/Hero";
import NewsFeed from "@/components/landing/NewsFeed";
import FeaturedArtists from "@/components/landing/FeaturedArtists";
import About from "@/components/landing/About";
import UpcomingEvents from "@/components/landing/UpcomingEvents";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedArtists />
      <UpcomingEvents />
      <NewsFeed />
      <About />
    </>
  );
}
