"use client";
import { useEffect, useState } from "react";
import { unsplashAPI } from "../../lib/unsplashAPI";
import { CheckIcon, Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constance/images";
import Link from "next/link";
import FormErrors from "./FormErrors";

type TFormPicker = {
  id: string;
  errors?: Record<string, string[]> | undefined;
};

const FormPicker = ({ id, errors }: TFormPicker) => {
  const { pending } = useFormStatus();
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageID, setSelectedImageID] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplashAPI.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const images = result.response as Array<Record<string, any>>;
          setImages(images);
        }
      } catch (error) {
        setImages(defaultImages);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin h-6 w-6 text-sky-700" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            onClick={() => {
              if (pending) return;
              setSelectedImageID(image.id);
            }}
            key={image.id}
            className={cn(
              "relative aspect-video cursor-pointer transition bg-muted group hover:opacity-75",
              pending && "bg-muted-foreground hover:opacity-55"
            )}
          >
            <Image
              alt="unsplash img"
              src={image.urls.thumb}
              fill
              className="object-cover rounded-sm"
            />
            <input
              type="radio"
              id={image.id}
              className="hidden"
              checked={selectedImageID === image.id}
              disabled={pending}
              name={id}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            {selectedImageID === image.id && (
              <div className="absolute text-white inset-0 flex items-center justify-center backdrop-blur-sm">
                <CheckIcon className="h-4 w-4" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 bg-black/20 group-hover:opacity-100 absolute left-2 bottom-0 w-full text-xs truncate text-neutral-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors errors={errors} id={"iamge"} />
    </div>
  );
};

export default FormPicker;
