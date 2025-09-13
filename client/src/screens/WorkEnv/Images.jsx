import { Box } from "@mui/material";
import {
  MaofLogo,
  TikshuvLogo,
  PakarLogo,
  LotemLogo,
  SaarSign,
} from "@assets/images";

const images = [
  {
    alt: "רקע רפואה",
    src: SaarSign,
    isStatic: true,
    options: {
      height: "100%",
      width: "100%",
    },
  },
  {
    alt: "לוגו אגף התקשוב",
    src: TikshuvLogo,
    options: {
      left: 50,
      top: 50,
      height: 100,
    },
  },
  {
    alt: "לוגו פיקוד העורף",
    src: PakarLogo,
    options: {
      right: 50,
      top: 50,
      height: 100,
    },
  },
  {
    alt: "לוגו יחידת לוטם",
    src: LotemLogo,
    options: {
      left: 50,
      bottom: 50,
      height: 100,
    },
  },
  {
    alt: "לוגו יחידת מעוף",
    src: MaofLogo,
    options: {
      right: 50,
      bottom: 50,
      height: 100,
    },
  },
];

const Img = ({ alt, src, isStatic, options }) => (
  <Box
    component="img"
    alt={alt}
    src={src}
    sx={{
      position: "absolute",
      ...options,
      transition: !isStatic && "transform 1s ease-in-out",
      ":hover": !isStatic && { transform: "rotateY(360deg)" },
    }}
  />
);

function Images() {
  return (
    <>
      {images.map((image) => (
        <Img
          key={image.alt}
          alt={image.alt}
          src={image.src}
          isStatic={image.isStatic}
          options={image.options}
        />
      ))}
    </>
  );
}

export default Images;
