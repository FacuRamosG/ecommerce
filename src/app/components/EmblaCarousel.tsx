'use client'
import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel-react'
import {
  DotButton,
  PrevButton,
  NextButton
} from './EmblaCarouselArrowsDotsButtons'


type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  imageByIndex:{
    secure_url:string
    id: string
}[]
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, imageByIndex} = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])
  return (
    <>
      <div className="embla sm:min-w-[400px]">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (   
              <div className="embla__slide flex justify-center" key={index}>
                <div className="embla__slide__number">
                  <span>{index + 1}</span>
                </div>
                <img
                  className="h-[400px] md:w-full  object-contain"
                  src={imageByIndex[index].secure_url}
                  alt="Your alt text"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="embla__buttons flex justify-between w-full">
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </>
  )
}

export default EmblaCarousel
