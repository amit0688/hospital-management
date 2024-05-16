import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  

function Card() {
  return (
    <div>
        <Carousel>
  <CarouselContent>
    <CarouselItem><img src="" alt="not available" /></CarouselItem>
    <CarouselItem>PELU</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>

    </div>
  )
}

export default Card