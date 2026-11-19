import { Button } from "../Button";
import { HeroFan } from "./HeroFan";
import { HeroRoom } from "./HeroRoom";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-castel-ink pt-24 sm:pt-28">
      <HeroRoom />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8">
        <span className="rounded-full bg-castel-red px-4 py-1.5 text-sm font-medium text-castel-ink">
          Studio indépendant à Avignon
        </span>
        <h1 className="mt-6 font-display text-[44px] font-bold text-white sm:text-7xl lg:text-[96px]">
          Jeux, apps et sites
          <br />faits avec le cœur.
        </h1>
        <p className="mt-6 max-w-xl text-base text-[#A1A1AA] sm:text-xl">
          Studio Castel conçoit et développe des jeux, des apps et des sites, de A à Z.
        </p>
        <div className="mt-8">
          <Button href="#jeux" variant="red">Voir les jeux</Button>
        </div>
      </div>

      <div className="relative">
        <HeroFan />
      </div>
    </section>
  );
}
