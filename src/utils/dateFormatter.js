export default function dateFormatter(isoDate) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString('en-US', options);
}
