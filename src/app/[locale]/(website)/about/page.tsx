import { Award, Gem, Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";

export default function About() {
  const t = useTranslations();

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-rose-50 dark:bg-zinc-950 transition-colors duration-500">
      <main className="flex flex-col flex-1 items-center mx-auto w-full">
        {/* HERO */}
        <section className="w-full mb-24">
          <div
            className="relative flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-8 px-6 text-center overflow-hidden
              bg-[linear-gradient(160deg,rgba(20,5,8,0.95)_0%,rgba(60,10,20,0.88)_50%,rgba(20,5,8,0.97)_100%),url('/images/red-rose.jpg')]
              bg-cover bg-center"
          >
            {/* top glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(244,37,89,0.18),transparent)]" />

            {/* bottom fade into page bg */}
            <div className="pointer-events-none absolute bottom-0 inset-x-0 h-8 bg-gradient-to-b from-transparent to-rose-50 dark:to-zinc-950" />

            {/* eyebrow */}
            <div className="relative z-10 flex items-center gap-3">
              <span className="block w-10 h-px bg-gradient-to-r from-transparent to-rose-400" />
              <span className="text-[0.6rem] font-semibold tracking-[0.28em] text-rose-300/80 uppercase">
                Notre Histoire
              </span>
              <span className="block w-10 h-px bg-gradient-to-l from-transparent to-rose-400" />
            </div>

            {/* headline */}
            <div className="relative z-10 flex flex-col gap-5 max-w-3xl">
              <h1
                className="text-5xl md:text-7xl font-black leading-tight tracking-tight
                bg-gradient-to-br from-white via-rose-100 to-rose-400 bg-clip-text text-transparent"
              >
                {t("aboutHeroTitle")}
              </h1>
              <p className="text-base md:text-lg font-light leading-relaxed text-white/60 max-w-xl mx-auto">
                {t("aboutHeroDescription")}
              </p>
            </div>

            {/* CTAs */}
            <div className="relative z-10 flex flex-wrap gap-4 justify-center mt-2">
              <button className="group relative h-12 min-w-[160px] px-7 overflow-hidden border border-rose-500/60 text-white text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:border-rose-400 hover:shadow-[0_0_24px_rgba(244,37,89,0.3)]">
                <span className="absolute inset-0 bg-gradient-to-r from-rose-700 to-rose-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10">{t("aboutHeroViewHistory")}</span>
              </button>
              <button className="h-12 min-w-[160px] px-7 border border-white/20 text-white/70 text-xs font-bold tracking-[0.12em] uppercase transition-all duration-300 hover:border-white/50 hover:text-white hover:bg-white/5">
                {t("aboutHeroOurVision")}
              </button>
            </div>

            {/* scroll hint */}
            <div className=" z-10 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
              <div className="w-px h-10 bg-gradient-to-b from-transparent to-rose-400" />
              <span className="text-[0.55rem] tracking-[0.2em] text-white/60 uppercase">
                Scroll
              </span>
            </div>
          </div>
        </section>

        {/* BRAND VALUES*/}
        <section className="relative mb-32 w-full max-w-5xl px-6">
          {/* ambient glows */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-rose-400/5 dark:bg-rose-500/5 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-rose-400/5 dark:bg-rose-500/5 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Award size={26} />,
                titleKey: "aboutValueQualityTitle",
                descKey: "aboutValueQualityDescription",
              },
              {
                icon: <Gem size={26} />,
                titleKey: "aboutValueEleganceTitle",
                descKey: "aboutValueEleganceDescription",
              },
              {
                icon: <Smile size={26} />,
                titleKey: "aboutValueJoyTitle",
                descKey: "aboutValueJoyDescription",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative text-center p-10
                  border border-rose-200/70 dark:border-white/[0.07]
                  bg-white/70 dark:bg-white/[0.02]
                  backdrop-blur-sm rounded-sm
                  hover:border-rose-400/60 dark:hover:border-rose-500/40
                  hover:-translate-y-1
                  hover:shadow-[0_20px_60px_rgba(244,37,89,0.09)] dark:hover:shadow-[0_20px_60px_rgba(244,37,89,0.14)]
                  transition-all duration-300"
              >
                {/* top accent */}
                <span className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                {/* icon ring */}
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-6 flex items-center justify-center
                  bg-rose-100 dark:bg-rose-500/10
                  border border-rose-300/50 dark:border-rose-500/25
                  text-rose-500 dark:text-rose-400
                  group-hover:bg-rose-200/80 dark:group-hover:bg-rose-500/20
                  group-hover:shadow-[0_0_20px_rgba(244,37,89,0.2)]
                  transition-all duration-300"
                >
                  {item.icon}
                </div>

                <h3
                  className="text-[0.68rem] font-bold tracking-[0.22em] uppercase mb-3
                  text-rose-700 dark:text-rose-300"
                >
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm font-light leading-relaxed text-zinc-500 dark:text-white/50">
                  {t(item.descKey)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/*   JOURNEY HEADLINE */}
        <section className="text-center mb-20 px-4 w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-400 dark:to-rose-500" />
            <div className="w-[6px] h-[6px] rotate-45 bg-rose-500 shrink-0" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-400 dark:to-rose-500" />
          </div>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-5
            text-rose-900 dark:text-white/90"
          >
            {t("aboutJourneyTitle")}
          </h2>
          <div className="w-12 h-[3px] bg-gradient-to-r from-rose-500 to-pink-400 mx-auto rounded-full" />
        </section>

        {/* TIMELINE */}
        <section className="mb-32 max-w-2xl mx-auto w-full px-6">
          {[
            {
              year: "2018",
              titleKey: "aboutEvent2018Title",
              descKey: "aboutEvent2018Description",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT51YggXETwMlF2VJX7W4XAimNlTDgc0BQZwzWfADcD9bREsVfHej0L8e8LP2wn_n968CWxv3ZC0d098az8ty5-3dSdjCGuyL1SNHIvb_9kHp0BIsZyNjSFfrEdfqyvhqjSMHZwaZs_TEwksJ2x3zlgKwD6Az_YmgVJAI7M61zevtGvsUXvTAeMB6G146qpbuur8HK-PhXCTt6lU7nnf2ri51lRn29IsHcdkaT6_Jnbq_tNXQXW1fJHuTrGCzAMMO0mvdg-kamTnU",
              active: false,
            },
            {
              year: "2020",
              titleKey: "aboutEvent2020Title",
              descKey: "aboutEvent2020Description",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAq7h8byW2dkRjT3UDFsVEVqmYWeLISk9cJT7XETe_Bx5FLamIyqmvg8KAD-2Wako_onAd9NFBTJRnsjmTv9b1UQoUlzKQYZ6IQoc8NhO_hfOwJy7-5FAqTBdx-F5w67tYAUaG9skAMIZjAFAopHb_p_N6bNf7XWY9207m-VwLsiizH31zRTx3Z9QFm9rCLdFL6KsOHljmFxDzWhgOmW-92DYhw1FSkBYGGNY5wOPj8DlFIRw4SQbnLuCNIPgmaVNJwyc850gEcLF0",
              active: false,
            },
            {
              year: "2022",
              titleKey: "aboutEvent2022Title",
              descKey: "aboutEvent2022Description",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCE1hkkli36b3Pube3-VTzluvpFWJ-LomrIN6dakh3Q4kTfeLiaBUTjmh35gSCeSQmN8-m7zXI92thG9Q6bV5VpAwceh4N8VhFtOHOcXPa2KTt9rev-jLRdDQXXLDM4RH9w1p-85DPlWTP2OM6UGhq-8bW93MExNn1fbpajfgXFoOjKkMr9A-CZKYcN3EkntvaK_FoS9nlYOK9xFRYEkeLFXCWua5Jc8NnS1iZsAG7UrIVsEOTCc0hdasbPE3FxPQkkLd7IQQ84MWc",
              active: false,
            },
            {
              year: String(new Date().getFullYear()),
              titleKey: "aboutEventCurrentTitle",
              descKey: "aboutEventCurrentDescription",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmNXWI5Zqs81JeSOT7b02FEzVctOI4fzs_Ye3K7YRQv3Al8pOknHUj4tEGU7wNprtdKy1cNYDbrF-yMf1VenHIstbip7Trn6Wo5n0DwK7o67Ci5w9eHX0qaFbaO7EGZxAq0_rgEdR7AXtHZ6B-l0jqHuInAKad9ytfak7GAtyNAEqx0ynOwn0O1utku5KUEf7u5nJPYK3GHVLjwZL95Lw1T4RK3DuH21EUEhWlVhq4wS87V78KOyVsNIHG9jySOJDdFj38hy3i8NI",
              active: true,
            },
          ].map((event, i, arr) => (
            <div key={i} className="grid grid-cols-[36px_1fr] gap-x-7">
              {/* spine column */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300
                    ${
                      event.active
                        ? "bg-rose-500/20 dark:bg-rose-500/25 border border-rose-500/80 shadow-[0_0_16px_rgba(244,37,89,0.4)]"
                        : "bg-rose-100 dark:bg-rose-500/10 border border-rose-300/50 dark:border-rose-500/30"
                    }`}
                >
                  <Image
                    src={event.img}
                    alt=""
                    className="w-[22px] h-[22px] rounded-full object-cover"
                    width={22}
                    height={22}
                  />
                </div>
                {i < arr.length - 1 && (
                  <div className="w-px flex-1 mt-2 min-h-[80px] bg-gradient-to-b from-rose-400/50 dark:from-rose-500/40 to-transparent" />
                )}
              </div>

              {/* content column */}
              <div className={`pt-[2px] ${i < arr.length - 1 ? "pb-12" : ""}`}>
                <p className="text-[0.62rem] font-bold tracking-[0.18em] uppercase text-rose-500 dark:text-rose-400 mb-1">
                  {event.year}
                </p>
                <p className="text-xl font-bold leading-snug mb-2 text-rose-800 dark:text-white/90">
                  {t(event.titleKey)}
                </p>
                <p className="text-sm font-light leading-relaxed text-zinc-500 dark:text-white/45">
                  {t(event.descKey)}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/*  TEAM */}
        <section className="mb-32 w-full max-w-5xl px-6">
          {/* heading */}
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-400 dark:to-rose-500" />
              <div className="w-[6px] h-[6px] rotate-45 bg-rose-500 shrink-0" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-400 dark:to-rose-500" />
            </div>
            <h2 className="text-4xl font-black tracking-tight text-rose-900 dark:text-white/90">
              {t("aboutTeamTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: "/images/member-1.png", roleKey: "aboutRoleFounder" },
              { img: "/images/member-2.png", roleKey: "aboutRoleCreative" },
              { img: "/images/member-3.png", roleKey: "aboutRoleOperations" },
            ].map((member, i) => (
              <div
                key={i}
                className="group border border-rose-200/70 dark:border-white/[0.06] rounded-sm overflow-hidden
                  bg-white/60 dark:bg-white/[0.02] backdrop-blur-sm
                  hover:border-rose-400/60 dark:hover:border-rose-500/35
                  hover:-translate-y-1.5
                  hover:shadow-[0_24px_60px_rgba(244,37,89,0.1)] dark:hover:shadow-[0_24px_60px_rgba(244,37,89,0.18)]
                  transition-all duration-500"
              >
                <div
                  className="aspect-[4/5] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                  style={{ backgroundImage: `url("${member.img}")` }}
                />
                <div className="px-6 py-5 text-center border-t border-rose-100/60 dark:border-white/[0.05]">
                  <p className="text-[0.62rem] font-bold tracking-[0.22em] uppercase text-rose-500 dark:text-rose-400">
                    {t(member.roleKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
