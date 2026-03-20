import dynamic from "next/dynamic";

const IconCloud = dynamic(() => import("./IconCloud"), { ssr: false });

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export default function IconCloudDemo() {
  return (
    <div className="relative flex w-full max-w-lg items-center justify-center overflow-hidden bg-transparent py-4" style={{ margin: "0 auto" }}>
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}
