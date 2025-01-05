import { pack } from "repomix";

function summaryTool() {
  const result =  pack({
    name: "summaryTool",
    version: "1.0.0",
    description: "A tool to summarize text",
    main: "index.js",
    scripts: {
      test: "echo \"Error: no test specified\" && exit 1",
    },
    keywords: ["summary", "tool"],});
}