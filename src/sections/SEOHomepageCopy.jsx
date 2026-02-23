/**
 * SEOHomepageCopy
 *
 * Crawlable, keyword-rich homepage copy for Google indexability.
 * All internal links point to real on-page section IDs (SPA-safe).
 *
 * Section IDs available (from App.jsx):
 *   #Home | #Shop | #comparison | #testimonials | #About | #cta | #Contact
 *
 * Word count: ~310 words  |  Internal links: 7
 */
const SEOHomepageCopy = () => {
    return (
        <article
            aria-label="About GOD WEAR"
            className="seo-copy-section bg-black text-white/80 px-6 sm:px-10 lg:px-20 py-16 sm:py-20 max-w-5xl mx-auto"
        >
            {/* ── Intro ──────────────────────────────────────────── */}
            <section className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 tracking-tight">
                    India&apos;s Premium Gym Wear Brand
                </h2>
                <p className="text-base sm:text-lg leading-relaxed font-body text-white/75">
                    GOD WEAR® is built on a single belief: your training gear should feel like{' '}
                    <strong className="text-white">your second layer of skin</strong>. Engineered for
                    athletes who refuse to compromise, our{' '}
                    <a href="#Shop" className="text-gold-400 underline underline-offset-2 hover:text-gold-300 transition-colors">
                        premium gym wear
                    </a>{' '}
                    combines cutting-edge fabric technology with bold Indian design to elevate every rep,
                    every run, and every moment in between.
                </p>
            </section>

            {/* ── Why Choose Us ──────────────────────────────────── */}
            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 tracking-tight">
                    Why Choose GOD WEAR?
                </h2>
                <p className="text-base sm:text-lg leading-relaxed font-body text-white/75 mb-4">
                    We design{' '}
                    <a href="#comparison" className="text-gold-400 underline underline-offset-2 hover:text-gold-300 transition-colors">
                        compression wear
                    </a>{' '}
                    that works as hard as you do. Our 4-way stretch fabric locks your muscles in place,
                    reduces fatigue, and wicks sweat away the moment it forms — keeping you dry, focused,
                    and powerful through your toughest sessions.
                </p>
                <p className="text-base sm:text-lg leading-relaxed font-body text-white/75">
                    Beyond the gym, our athleisure range transitions effortlessly from a morning workout
                    to everyday wear — because your performance lifestyle shouldn&apos;t stop when you leave
                    the gym floor. See what{' '}
                    <a href="#testimonials" className="text-gold-400 underline underline-offset-2 hover:text-gold-300 transition-colors">
                        10,000+ athletes
                    </a>{' '}
                    have to say about wearing GOD WEAR in real training.
                </p>
            </section>

            {/* ── Our Collection ─────────────────────────────────── */}
            <section className="mb-10">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 tracking-tight">
                    Explore the Collection
                </h2>
                <p className="text-base sm:text-lg leading-relaxed font-body text-white/75 mb-6">
                    From high-intensity training to active recovery, GOD WEAR has gear for every phase of
                    your fitness journey. Each piece is rigorously tested by real athletes across cardio,
                    strength, and combat disciplines.
                </p>
                <nav aria-label="Page sections">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
                        {[
                            { href: '#Shop', label: 'Shop Compression T-Shirts' },
                            { href: '#Shop', label: 'Browse Athletic Wear' },
                            { href: '#comparison', label: 'See Performance Features' },
                            { href: '#About', label: 'Our Story & Mission' },
                            { href: '#Contact', label: 'Get in Touch' },
                        ].map(({ href, label }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="flex items-center gap-2 text-base font-semibold text-gold-400 hover:text-gold-300 transition-colors group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 group-hover:scale-125 transition-transform" />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>

            {/* ── Trust & CTA ────────────────────────────────────── */}
            <section>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 tracking-tight">
                    Trusted by 10,000+ Athletes Across India
                </h2>
                <p className="text-base sm:text-lg leading-relaxed font-body text-white/75">
                    With a 4.5★ average rating and free shipping pan-India, GOD WEAR is the go-to{' '}
                    <strong className="text-white">athletic wear brand</strong> for bodybuilders, crossfit
                    athletes, runners, and fitness enthusiasts. Experience the difference of gear that
                    treats performance as non-negotiable.{' '}
                    <a href="#Shop" className="text-gold-400 underline underline-offset-2 hover:text-gold-300 transition-colors font-semibold">
                        Shop the full collection
                    </a>{' '}
                    and discover why thousands of athletes call GOD WEAR their second layer of skin.
                </p>
            </section>
        </article>
    );
};

export default SEOHomepageCopy;
