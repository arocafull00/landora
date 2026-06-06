import type { IconName } from "@/lib/dashboard-data";

const paths: Record<IconName, string> = {
  web: "M4 6h16v12H4V6Zm2 2v8h12V8H6Zm3 12h6v2H9v-2Z",
  folder: "M3 6h7l2 2h9v12H3V6Zm2 4v8h16v-8H5Z",
  settings:
    "M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8.5 3 .1 1.5-2.1.5-.8 1.9 1.2 1.8-1.1 1.1-1.8-1.2-1.9.8-.5 2.1h-1.5l-.5-2.1-1.9-.8-1.8 1.2-1.1-1.1 1.2-1.8-.8-1.9-2.1-.5V13l2.1-.5.8-1.9-1.2-1.8 1.1-1.1 1.8 1.2 1.9-.8.5-2.1h1.5l.5 2.1 1.9.8 1.8-1.2 1.1 1.1-1.2 1.8.8 1.9 2.1.5Z",
  profile:
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5Z",
  bell:
    "M12 22a2.5 2.5 0 0 0 2.4-2h-4.8A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5-6.7V3a2 2 0 0 0-4 0v1.3A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z",
  help: "M11 18h2v-2h-2v2Zm1-16a7 7 0 0 0-7 7h2a5 5 0 1 1 7.8 4.1c-1.5 1-2.8 1.9-2.8 3.9h2c0-1 .7-1.5 2-2.4A7 7 0 0 0 12 2Z",
  search:
    "M10 4a6 6 0 1 1-4.2 10.2A6 6 0 0 1 10 4Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5 8 5 5-1.4 1.4-5-5L15 14Z",
  add: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z",
  more: "M5 12a2 2 0 1 0 0 .1V12Zm7 0a2 2 0 1 0 0 .1V12Zm7 0a2 2 0 1 0 0 .1V12Z",
  document: "M6 2h9l5 5v15H6V2Zm8 2H8v18h12V8h-6V4Z",
  drag: "M8 5h2v2H8V5Zm6 0h2v2h-2V5ZM8 11h2v2H8v-2Zm6 0h2v2h-2v-2ZM8 17h2v2H8v-2Zm6 0h2v2h-2v-2Z",
  link: "M7.5 14.5 6 13l5-5a4 4 0 0 1 5.7 5.7l-1.6 1.6-1.4-1.4 1.6-1.6A2 2 0 1 0 12.4 9L7.5 14.5Zm1.4 1.4 1.6-1.6 1.4 1.4-1.6 1.6A4 4 0 1 1 4.6 11.6L6.2 10l1.4 1.4-1.6 1.6a2 2 0 1 0 2.9 2.9Z",
  image:
    "M4 5h16v14H4V5Zm2 2v9l4-4 3 3 2-2 3 3V7H6Zm3 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  grid: "M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z",
  upload: "M11 16h2V8l3 3 1.4-1.4L12 4 6.6 9.6 8 11l3-3v8Zm-7 2h16v2H4v-2Z",
  copy: "M8 8h12v14H8V8Zm2 2v10h8V10h-8ZM4 2h12v4h-2V4H6v10H4V2Z",
  download:
    "M11 4h2v8l3-3 1.4 1.4L12 16l-5.4-5.6L8 9l3 3V4ZM4 18h16v2H4v-2Z",
  trash: "M8 7H5V5h5V3h4v2h5v2h-3v15H8V7Zm2 0v13h4V7h-4Z",
  chevron: "m9 6 6 6-6 6-1.4-1.4L12.2 12 7.6 7.4 9 6Z",
  palette:
    "M12 3a9 9 0 0 0 0 18h1.2a2.2 2.2 0 0 0 1.5-3.7 1.2 1.2 0 0 1 .8-2.1H17a6 6 0 0 0 0-12h-5Zm-4 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4-3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z",
  save: "M5 3h14l2 2v16H3V3h2Zm2 2v6h10V5H7Zm0 14h10v-6H7v6Z",
  publish: "M12 3 4 12h5v9h6v-9h5L12 3Z",
};

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d={paths[name]} />
    </svg>
  );
}
