export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6">
      <h1 className="font-serif text-5xl font-semibold text-charcoal">
        Aletheia
      </h1>
      <p className="font-sans text-charcoal/70 max-w-md text-center">
        A guide for CS students — built to make the field make sense.
      </p>
      <button className="bg-ember-500 hover:bg-ember-700 text-cream font-sans px-6 py-3 rounded-md transition-colors">
        Get Started
      </button>
      <span className="text-pistachio-700 font-sans text-sm">
        pistachio accent test
      </span>
    </main>
  );
}