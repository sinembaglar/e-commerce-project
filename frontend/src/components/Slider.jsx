import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Slider({ slides }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index) => emblaApi?.scrollTo(index), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi])

  return (
    <div className="relative flex flex-col gap-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollPrev}
        aria-label="Önceki"
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 text-slate-900 lg:flex"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Sonraki"
        className="absolute right-2 top-1/2 hidden -translate-y-1/2 text-slate-900 lg:flex"
      >
        <ChevronRight size={28} />
      </button>

      <div className="flex items-center justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            aria-label={`${index + 1}. slayta git`}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? 'w-6 bg-sky-500' : 'w-2 bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
