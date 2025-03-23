import { EleventyRenderPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);

  eleventyConfig.addPassthroughCopy("css/*.css");
  eleventyConfig.addPassthroughCopy("assets/js/*.js");
  eleventyConfig.addPassthroughCopy("assets/typography/*.woff2");
  eleventyConfig.addPassthroughCopy("assets/*.svg");
  eleventyConfig.addPassthroughCopy("assets/*.png");
  eleventyConfig.addPassthroughCopy("assets/*.ico");
  eleventyConfig.addPassthroughCopy("assets/*.webmanifest");
  // the default is "copy"
  eleventyConfig.setServerPassthroughCopyBehavior("passthrough");
}
