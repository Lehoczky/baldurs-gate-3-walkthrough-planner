// Not worth to scrape these, they likely won't change,
// and the DOM on the companion page is a mess.

import type { Companion } from "@bg3-walkthrough-planner/types"

// https://bg3.wiki/wiki/Companions
export function getCompanions(): Companion[] {
  return [
    {
      name: "Astarion",
      icon: "https://bg3.wiki/w/images/thumb/1/1b/Portrait_Astarion.png/180px-Portrait_Astarion.png",
      wikiLink: "https://bg3.wiki/wiki/Astarion",
    },
    {
      name: "Gale",
      icon: "https://bg3.wiki/w/images/thumb/1/11/Portrait_Gale.png/180px-Portrait_Gale.png",
      wikiLink: "https://bg3.wiki/wiki/Gale",
    },
    {
      name: "Karlach",
      icon: "https://bg3.wiki/w/images/thumb/b/b2/Portrait_Karlach.png/180px-Portrait_Karlach.png",
      wikiLink: "https://bg3.wiki/wiki/Karlach",
    },
    {
      name: "Lae'zel",
      icon: "https://bg3.wiki/w/images/thumb/8/86/Portrait_Lae%27zel.png/180px-Portrait_Lae%27zel.png",
      wikiLink: "https://bg3.wiki/wiki/Lae%27zel",
    },
    {
      name: "Shadowheart",
      icon: "https://bg3.wiki/w/images/thumb/7/7e/Portrait_Shadowheart.png/180px-Portrait_Shadowheart.png",
      wikiLink: "https://bg3.wiki/wiki/Shadowheart",
    },
    {
      name: "Wyll",
      icon: "https://bg3.wiki/w/images/thumb/6/6d/Portrait_Wyll.png/180px-Portrait_Wyll.png",
      wikiLink: "https://bg3.wiki/wiki/Wyll",
    },
    {
      name: "Halsin",
      icon: "https://bg3.wiki/w/images/thumb/f/fe/Portrait_Halsin.png/180px-Portrait_Halsin.png",
      wikiLink: "https://bg3.wiki/wiki/Halsin",
    },
    {
      name: "Minthara",
      icon: "https://bg3.wiki/w/images/thumb/8/8e/Portrait_Minthara_%28263%29.png/120px-Portrait_Minthara_%28263%29.png",
      wikiLink: "https://bg3.wiki/wiki/Minthara",
    },
    {
      name: "Minsc",
      icon: "https://bg3.wiki/w/images/thumb/d/d6/Portrait_Minsc.png/180px-Portrait_Minsc.png",
      wikiLink: "https://bg3.wiki/wiki/Minsc",
    },
    {
      name: "Jaheira",
      icon: "https://bg3.wiki/w/images/thumb/a/a8/Portrait_Jaheira.png/180px-Portrait_Jaheira.png",
      wikiLink: "https://bg3.wiki/wiki/Jaheira",
    },
  ]
}
