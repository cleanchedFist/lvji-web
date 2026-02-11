export default function scrollYTo(y: number) {
  setTimeout(() => {
    window.scrollTo(0, y);
  });
}
