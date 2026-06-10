export default function ScrollDownIndicator() {
  const handleClick = () => {
    const nextSection = document.getElementById("products");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
      aria-label="Scroll to products section"
    >
      <div className="relative w-px h-10 bg-cream-100/30 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-cream-100 rounded-full animate-scroll-orb" />
      </div>
    </button>
  );
}
