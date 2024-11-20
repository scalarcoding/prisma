import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DropZone from "@/components/ui/dropzone/dropzone";

interface ProductPhotoCarouselProps {
  regNumber:string;
  files: File[];
}

export function ProductPhotoCarousel({ files, regNumber }: ProductPhotoCarouselProps) {


  const handleFileUpload = (file: File, index: number) => {
    const updatedFiles = [...files];
    updatedFiles[index] = file; // Update the file at the given index
    console.log(`File uploaded for regNumber: ${regNumber}`, file);
    // Note: files is a prop and cannot be directly updated; use an external state manager or callback to handle updates.
  };


  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div>
              <Card className="flex justify-center align-middle items-center">
                <CardContent className="flex aspect-square items-center justify-center align-middle">
                  {index < files.length && files[index] ? (
                    <img
                      src=""
                      alt={`Uploaded file ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <DropZone
                    title=""
                      file={files[index]}
                      id={index.toString()}
                      onFileUpload={(file) => handleFileUpload(file, index)}
                    />
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
