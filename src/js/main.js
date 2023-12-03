import Alpine from "alpinejs";

import {
  getImageUrl,
  fetchProfile,
  fetchSkills,
  fetchFeaturedProjects,
} from "./sanity";

window.Alpine = Alpine;

const profile = await fetchProfile();
const skills = await fetchSkills();
const projects = await fetchFeaturedProjects();

function getThumbnailUrl(image) {
  return getImageUrl(image).width(600).url();
}

Alpine.store("darkMode", {
  init() {
    this.on = window.matchMedia("(prefers-color-scheme: dark)").matches;
  },

  on: false,

  toggle() {
    this.on = !this.on;
  },
});

Alpine.store("data", {
  skills: skills || [],
  profile: profile,
  image: profile.image ? getThumbnailUrl(profile.image) : "#",
  projects: projects || [],
  getThumbnailUrl,
});

Alpine.start();

console.log(skills)