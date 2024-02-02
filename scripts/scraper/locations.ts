interface Location {
  name: string
  description: string
  act: string
  area: string
  icon: string
  wikiLink: string
}

// https://bg3.wiki/wiki/List_of_locations
export const locations: Location[] = [
  {
    name: "Blighted Village",
    description: "An abandoned village, now occupied by goblins ",
    icon: "https://bg3.wiki/w/images/thumb/0/01/Blighted_Village.jpg/400px-Blighted_Village.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Blighted_Village",
  },
  {
    name: "Emerald Grove",
    description:
      "A sacred grove and home to druids, and temporary refuge for a group of tiefling refugees",
    icon: "https://bg3.wiki/w/images/thumb/c/cd/Sacred_Pool.png/400px-Sacred_Pool.png",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Emerald_Grove",
  },
  {
    name: "Forest",
    description: "A patch of woodland west of the grove",
    icon: "https://bg3.wiki/w/images/thumb/3/3a/Forest.jpg/400px-Forest.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Forest",
  },
  {
    name: "Goblin Camp",
    description:
      "An old Selûnite temple in use as a base of operations for the Cult of the Absolute",
    icon: "https://bg3.wiki/w/images/thumb/3/32/Goblin_Camp.jpg/381px-Goblin_Camp.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Goblin_Camp",
  },
  {
    name: "Mountain Pass",
    description:
      "A trail at the edge of the wilderness, leading off to Rosymorn Monastery",
    icon: "https://bg3.wiki/w/images/thumb/d/d5/Mountain_Pass.jpg/376px-Mountain_Pass.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Mountain_Pass",
  },
  {
    name: "Overgrown Ruins",
    description:
      "A large ruin near to the grove, with the remnants of what was once a chapel",
    icon: "https://bg3.wiki/w/images/thumb/a/ad/Overgrown_Ruins.png/400px-Overgrown_Ruins.png",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Overgrown_Ruins",
  },
  {
    name: "Ravaged Beach",
    description:
      "A beach along the river Chionthar, now strewn with the remains of a crashed Nautiloid",
    icon: "https://bg3.wiki/w/images/thumb/a/a4/Ravaged_Beach.jpg/388px-Ravaged_Beach.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Ravaged_Beach",
  },
  {
    name: "Sunlit Wetlands",
    description:
      "Picturesque wetlands that give way to a Putrid Bog when held under scrutiny",
    icon: "https://bg3.wiki/w/images/thumb/9/98/Sunlit_Wetlands.jpg/359px-Sunlit_Wetlands.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Sunlit_Wetlands",
  },
  {
    name: "The Risen Road",
    description:
      "A long stretch of road that connects Elturel and Baldur's Gate, running parallel to the river Chionthar",
    icon: "https://bg3.wiki/w/images/thumb/d/d5/The_Risen_Road.jpg/373px-The_Risen_Road.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/The_Risen_Road",
  },
  {
    name: "Waukeen's Rest",
    description:
      "An inn on the Risen Road, in flames after an assault from the Absolute",
    icon: "https://bg3.wiki/w/images/thumb/c/c3/Waukeen%27s_Rest.jpg/378px-Waukeen%27s_Rest.jpg",
    act: "Act One",
    area: "Wilderness",
    wikiLink: "https://bg3.wiki/wiki/Waukeen%27s_Rest",
  },
  {
    name: "Rosymorn Monastery Trail",
    description:
      "A pilgrimage trail leading between the wilderness, Rosymorn Monastary and the Shadow-Cursed Lands",
    icon: "https://bg3.wiki/w/images/thumb/4/4f/Screen_Rosymorn_Monastery_Trail_Bridge_East.jpg/400px-Screen_Rosymorn_Monastery_Trail_Bridge_East.jpg",
    act: "Act One",
    area: "Rosymorn Monastery Trail",
    wikiLink: "https://bg3.wiki/wiki/Rosymorn_Monastery_Trail",
  },
  {
    name: "Rosymorn Monastery",
    description: "A seculded monastery for monks of Lathander",
    icon: "https://bg3.wiki/w/images/thumb/9/9b/Screen_View_South_Building_Rosymorn_Monastery.jpg/400px-Screen_View_South_Building_Rosymorn_Monastery.jpg",
    act: "Act One",
    area: "Rosymorn Monastery Trail",
    wikiLink: "https://bg3.wiki/wiki/Rosymorn_Monastery",
  },
  {
    name: "Creche Y'llek",
    description:
      "Rosymorn Monastery's living quarters, transformed into a githyanki base",
    icon: "https://bg3.wiki/w/images/thumb/1/11/Screen_Cr%C3%A8che_Y%27llek_Portrait_of_Vlaakith.jpg/400px-Screen_Cr%C3%A8che_Y%27llek_Portrait_of_Vlaakith.jpg",
    act: "Act One",
    area: "Rosymorn Monastery Trail",
    wikiLink: "https://bg3.wiki/wiki/Creche_Y%27llek",
  },
  {
    name: "Arcane Tower",
    description: "An isolated wizard tower protected by Arcane Cannons",
    icon: "https://bg3.wiki/w/images/thumb/7/7c/Arcane_Tower.jpg/375px-Arcane_Tower.jpg",
    act: "Act One",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/Arcane_Tower",
  },
  {
    name: "Ebonlake Grotto",
    description: "Home of the myconids, lead by Sovereign Spaw",
    icon: "https://bg3.wiki/w/images/thumb/f/fd/Ebonlake_Grotto_Overview.jpg/475px-Ebonlake_Grotto_Overview.jpg",
    act: "Act One",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/Ebonlake_Grotto",
  },
  {
    name: "Decrepit Village",
    description: "An abandoned village on a beach beside the Ebonlake",
    icon: "https://bg3.wiki/w/images/thumb/7/70/Decrepit_Village_2.jpg/417px-Decrepit_Village_2.jpg",
    act: "Act One",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/Decrepit_Village",
  },
  {
    name: "Dread Hollow",
    description: "A cavernous hollow growing a large Sussur tree",
    icon: "https://bg3.wiki/w/images/thumb/6/68/Dread_Hollow.jpg/393px-Dread_Hollow.jpg",
    act: "Act One",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/Dread_Hollow",
  },
  {
    name: "The Festering Cove",
    description: "A hidden cove, home to followers of BOOOAL",
    icon: "Act One",
    act: "https://bg3.wiki/w/images/thumb/c/c8/The_Festering_Cove.jpg/375px-The_Festering_Cove.jpg",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/The_Festering_Cove",
  },
  {
    name: "Selûnite Outpost",
    description:
      "An abandoned outpost which previously housed followers of Selûne",
    icon: "https://bg3.wiki/w/images/thumb/9/9e/Selunite_Outpost_Front.jpg/426px-Selunite_Outpost_Front.jpg",
    act: "Act One",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/Sel%C3%BBnite_Outpost",
  },
  {
    name: "Storehouse",
    description: "A lone storehouse with an elevator leading to the surface",
    icon: "https://bg3.wiki/w/images/thumb/2/25/Storehouse_South.png/400px-Storehouse_South.png",
    act: "Act One",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/Storehouse",
  },
  {
    name: "Grymforge",
    description:
      "The legendary Grymforge, built by Sharran worshippers in times past",
    icon: "https://bg3.wiki/w/images/thumb/4/41/Grymforge.jpg/375px-Grymforge.jpg",
    act: "Act One",
    area: "Under-world",
    wikiLink: "https://bg3.wiki/wiki/Grymforge",
  },
  {
    name: "Nautiloid",
    description:
      "A flying illithid ship visited during the prologue, travelling through the Hells",
    icon: "https://bg3.wiki/w/images/thumb/7/70/Nautiloid.webp/363px-Nautiloid.webp.png",
    act: "Act One",
    area: "Other planes",
    wikiLink: "https://bg3.wiki/wiki/Nautiloid",
  },
  {
    name: "Astral Plane",
    description: "A small section of the Astral Sea",
    icon: "https://bg3.wiki/w/images/thumb/9/99/Screen_Astral_Plane_South_East_A.jpg/400px-Screen_Astral_Plane_South_East_A.jpg",
    act: "Act One",
    area: "Other planes",
    wikiLink: "https://bg3.wiki/wiki/Astral_Plane",
  },
  {
    name: "Ruined Battlefield",
    description:
      "A large battlefield spanning half the region, with remnants of a conflict from before the shadow curse",
    icon: "https://bg3.wiki/w/images/thumb/9/96/Ruined_Battlefield.webp/375px-Ruined_Battlefield.webp.png",
    act: "Act Two",
    area: "Shadow-Cursed Lands",
    wikiLink: "https://bg3.wiki/wiki/Ruined_Battlefield",
  },
  {
    name: "Last Light Inn",
    description:
      "A sanctuary within the Shadow-Cursed Lands, currently occupied by Harpers and members of the Flaming Fist",
    icon: "https://bg3.wiki/w/images/thumb/a/a7/Last_Light_Inn.webp/349px-Last_Light_Inn.webp.png",
    act: "Act Two",
    area: "Shadow-Cursed Lands",
    wikiLink: "https://bg3.wiki/wiki/Last_Light_Inn",
  },
  {
    name: "Reithwin Town",
    description:
      "A now empty town, previously home to followers of Selûne and the Thorm family",
    icon: "https://bg3.wiki/w/images/thumb/9/93/Reithwin_Town.webp/407px-Reithwin_Town.webp.png",
    act: "Act Two",
    area: "Shadow-Cursed Lands",
    wikiLink: "https://bg3.wiki/wiki/Reithwin_Town",
  },
  {
    name: "Grand Mausoleum",
    description:
      "The Thorm family mausoleum, resting place of Melodia Thorm and entrance to the Gauntlet of Shar",
    icon: "https://bg3.wiki/w/images/thumb/6/6c/Grand_Mausoleum_Vestibule.jpg/400px-Grand_Mausoleum_Vestibule.jpg",
    act: "Act Two",
    area: "Shadow-Cursed Lands",
    wikiLink: "https://bg3.wiki/wiki/Grand_Mausoleum",
  },
  {
    name: "Moonrise Towers",
    description:
      "The seat of the Absolute and base of their operations, located south of Reithwin Town",
    icon: "https://bg3.wiki/w/images/thumb/4/47/Moonrise_Towers_Overview.jpg/400px-Moonrise_Towers_Overview.jpg",
    act: "Act Two",
    area: "Shadow-Cursed Lands",
    wikiLink: "https://bg3.wiki/wiki/Moonrise_Towers",
  },
  {
    name: "Shadowfell",
    description: "A plane of shadows and domain of Shar",
    icon: "https://bg3.wiki/w/images/thumb/3/36/Shadowfell.jpg/400px-Shadowfell.jpg",
    act: "Act Two",
    area: "Other planes",
    wikiLink: "https://bg3.wiki/wiki/Shadowfell",
  },
  {
    name: "Rivington",
    description:
      "The southern-most district of Baldur's Gate, located on the southern shore of the River Chionthar and south of of Wyrm's Crossing",
    icon: "https://bg3.wiki/w/images/thumb/8/87/Rivington.jpg/430px-Rivington.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/Rivington",
  },
  {
    name: "Arfur's Mansion",
    description: "The home of toymaker Arfur Gregorio",
    icon: "https://bg3.wiki/w/images/thumb/c/c0/Arfur%27s_Mansion.jpg/401px-Arfur%27s_Mansion.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/Arfur%27s_Mansion",
  },
  {
    name: "Circus of the Last Days",
    description: "An extraplanar circus run by ringmaster Lucretious",
    icon: "https://bg3.wiki/w/images/thumb/2/20/Circus_of_the_Last_Days.jpg/495px-Circus_of_the_Last_Days.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/Circus_of_the_Last_Days",
  },
  {
    name: "Open Hand Temple",
    description:
      "A temple dedicated to Ilmater, grieving after the loss of their head priest",
    icon: "https://bg3.wiki/w/images/thumb/0/03/Open_Hand_Temple_Front.jpg/400px-Open_Hand_Temple_Front.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/Open_Hand_Temple",
  },
  {
    name: "Requisitioned Barn",
    description:
      "A large barn, currently in use as storage for refugee requisitions",
    icon: "https://bg3.wiki/w/images/thumb/f/f8/Requisitioned_Barn.jpg/400px-Requisitioned_Barn.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/Requisitioned_Barn",
  },
  {
    name: "South Span Checkpoint",
    description:
      "An intermediate checkpoint between Rivington and Wyrm's Crossing",
    icon: "https://bg3.wiki/w/images/thumb/f/f2/South_Span_Checkpoint.jpg/408px-South_Span_Checkpoint.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/South_Span_Checkpoint",
  },
  {
    name: "Sword Coast Couriers",
    description: "Rivington's post office, complete with pigeon carriers",
    icon: "https://bg3.wiki/w/images/thumb/0/0c/SwordCoastCouriers_Exterior.jpg/401px-SwordCoastCouriers_Exterior.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/Sword_Coast_Couriers",
  },
  {
    name: "Rivington General",
    description:
      "A weapons and armour store, run by Gyldro Angleiron and his clerk Exxvikyap",
    icon: "https://bg3.wiki/w/images/thumb/9/92/Rivington_General.jpg/400px-Rivington_General.jpg",
    act: "Act Three",
    area: "Rivington",
    wikiLink: "https://bg3.wiki/wiki/Rivington_General",
  },
  {
    name: "Wyrm's Crossing",
    description:
      "A crossing between Rivington and the Lower City of Baldur's Gate",
    icon: "https://bg3.wiki/w/images/thumb/e/e2/Wyrm%27s_Crossing_Side.jpg/401px-Wyrm%27s_Crossing_Side.jpg",
    act: "Act Three",
    area: "Wyrm's Crossing",
    wikiLink: "https://bg3.wiki/wiki/Wyrm%27s_Crossing",
  },
  {
    name: "Danthelon's Dancing Axe",
    description:
      "A weapons and armour store owned by Entharl Danthelon, as well as a front to a Harper hideout",
    icon: "https://bg3.wiki/w/images/thumb/d/d7/Danthelon%27s_Dancing_Axe.jpg/357px-Danthelon%27s_Dancing_Axe.jpg",
    act: "Act Three",
    area: "Wyrm's Crossing",
    wikiLink: "https://bg3.wiki/wiki/Danthelon%27s_Dancing_Axe",
  },
  {
    name: "Sharess' Caress",
    description: "A house of pleasure run by Mamzell Amira and Kira",
    icon: "https://bg3.wiki/w/images/thumb/f/f4/Sharess%27_Caress.jpg/331px-Sharess%27_Caress.jpg",
    act: "Act Three",
    area: "Wyrm's Crossing",
    wikiLink: "https://bg3.wiki/wiki/Sharess%27_Caress",
  },
  {
    name: "Wyrm's Rock Fortress",
    description:
      "An island-fortress which serves as one of the Flaming Fist's headquarters",
    icon: "https://bg3.wiki/w/images/thumb/2/2b/Wyrm%27s_Rock_Fortress.jpg/400px-Wyrm%27s_Rock_Fortress.jpg",
    act: "Act Three",
    area: "Wyrm's Crossing",
    wikiLink: "https://bg3.wiki/wiki/Wyrm%27s_Rock_Fortress",
  },
  {
    name: "Lower City",
    description:
      "The mercantile hub and southernmost region of the port-side city of Baldur's Gate",
    icon: "https://bg3.wiki/w/images/thumb/e/e2/Lower_City.jpg/400px-Lower_City.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Lower_City",
  },
  {
    name: "Baldur's Mouth",
    description: "A print shop for news broadsheets, run by editor Ettvard",
    icon: "https://bg3.wiki/w/images/thumb/5/57/Baldur%27s_Mouth.jpg/400px-Baldur%27s_Mouth.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Baldur%27s_Mouth",
  },
  {
    name: "Basilisk Gate Barracks",
    description:
      "Barracks for the Flaming Fist and location of Heapside Prison",
    icon: "https://bg3.wiki/w/images/thumb/9/9e/Basilisk_gate_crossing.jpg/400px-Basilisk_gate_crossing.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Basilisk_Gate_Barracks",
  },
  {
    name: "Bloomridge Park",
    description: "A large park in the north of the Lower City",
    icon: "https://bg3.wiki/w/images/thumb/c/cf/Bloomridge_Park.jpg/400px-Bloomridge_Park.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Bloomridge_Park",
  },
  {
    name: "Candulhallow's Tombstones",
    description: "An unassuming funerary store nestled along a back street",
    icon: "https://bg3.wiki/w/images/thumb/2/2e/Candulhallows_Tombstones_Entrance.jpg/400px-Candulhallows_Tombstones_Entrance.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Candulhallow%27s_Tombstones",
  },
  {
    name: "Counting House",
    description:
      "A banking and storage facility found along the southern coast of the Lower City",
    icon: "https://bg3.wiki/w/images/thumb/b/be/Tim-coddens-tim-coddens-thecountinghouse-01.webp/400px-Tim-coddens-tim-coddens-thecountinghouse-01.webp.png",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Counting_House",
  },
  {
    name: "Devil's Fee",
    description: "A curio store run by Helsik",
    icon: "https://bg3.wiki/w/images/thumb/f/ff/Devil%27s_Fee.jpg/400px-Devil%27s_Fee.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Devil%27s_Fee",
  },
  {
    name: "Elerrathin's Home",
    description:
      "The home of Jaheira and her wards, with a large, lush basement cavern",
    icon: "https://bg3.wiki/w/images/thumb/5/5f/Elerrathins_Home.jpg/400px-Elerrathins_Home.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Elerrathin%27s_Home",
  },
  {
    name: "Elfsong Tavern",
    description:
      "A well-known tavern, popular with adventurers and independent operators",
    icon: "https://bg3.wiki/w/images/thumb/d/d2/Elfsong_Tavern_Street_View.jpg/460px-Elfsong_Tavern_Street_View.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Elfsong_Tavern",
  },
  {
    name: "Felogyr's Fireworks",
    description: "A fireworks store in the south-east of the city",
    icon: "https://bg3.wiki/w/images/thumb/f/f9/Jef-simons-jef-simons-bg3-citypropuse1.webp/400px-Jef-simons-jef-simons-bg3-citypropuse1.webp.png",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Felogyr%27s_Fireworks",
  },
  {
    name: "Flymm Cargo",
    description:
      "A dock-side warehouse and access point to the Lower City Sewers and Iron Throne",
    icon: "https://bg3.wiki/w/images/thumb/4/4f/Flymm_Cargo.jpg/400px-Flymm_Cargo.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Flymm_Cargo",
  },
  {
    name: "Forge of the Nine",
    description: "An outdoor smithy, possibly run by Dammon",
    icon: "https://bg3.wiki/w/images/thumb/9/94/Forge_of_the_Nine.jpg/400px-Forge_of_the_Nine.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Forge_of_the_Nine",
  },
  {
    name: "Graveyard (Lower City)",
    description:
      "The Lower City's graveyard, housing several mausoleums and a morgue",
    icon: "https://bg3.wiki/w/images/thumb/3/35/Graveyard_%28Lower_City%29.jpg/400px-Graveyard_%28Lower_City%29.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Graveyard_(Lower_City)",
  },
  {
    name: "House of Grief",
    description:
      "A healing house run by Sharran cultists, and aboveground facade to their cloister",
    icon: "https://bg3.wiki/w/images/thumb/3/3e/House_of_Grief.jpg/400px-House_of_Grief.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/House_of_Grief",
  },
  {
    name: "Lady Jannath's Estate",
    description:
      "The home of Lady Jannath and her husband, the artist Oskar Fevras",
    icon: "https://bg3.wiki/w/images/thumb/f/f0/Lady_Jannaths_Estate_Exterior.png/381px-Lady_Jannaths_Estate_Exterior.png",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Lady_Jannath%27s_Estate",
  },
  {
    name: "Lustrous Lass",
    description: "A cursed ship docked at Greyharbour",
    icon: "https://bg3.wiki/w/images/thumb/d/dc/Lustrous_Lass.jpg/400px-Lustrous_Lass.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Lustrous_Lass",
  },
  {
    name: "Old Garlow's Place",
    description:
      "A somewhat rundown house and hideout for a group of hag survivors",
    icon: "https://bg3.wiki/w/index.php?title=Special:Upload&wpDestFile=Old_Garlow%27s_Place.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Old_Garlow%27s_Place",
  },
  {
    name: "Philgrave's Mansion",
    description: "A waterside mansion and home of Mystic Carrion",
    icon: "https://bg3.wiki/w/images/thumb/0/06/Philgrave%27s_Mansion.jpg/340px-Philgrave%27s_Mansion.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Philgrave%27s_Mansion",
  },
  {
    name: "Steel Watch Foundry",
    description:
      "Factory for Gortash's Steel Watch, found near the Grey Harbour",
    icon: "https://bg3.wiki/w/images/thumb/4/41/Steel_Watch_Foundry.png/355px-Steel_Watch_Foundry.png",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Steel_Watch_Foundry",
  },
  {
    name: "Sorcerous Sundries",
    description:
      "A large magical marketplace, run by the renound wizard Lorroakan",
    icon: "https://bg3.wiki/w/images/thumb/1/11/Sorcerous_Sundries.jpg/400px-Sorcerous_Sundries.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Sorcerous_Sundries",
  },
  {
    name: "Stormshore Tabernacle",
    description: "A house of worship in the north-eastern part of the city",
    icon: "https://bg3.wiki/w/images/thumb/7/7a/Stormshore_tabernacle.jpg/400px-Stormshore_tabernacle.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Stormshore_Tabernacle",
  },
  {
    name: "Szarr Palace",
    description: "Palace of Cazador Szarr and home to his vampire spawn",
    icon: "https://bg3.wiki/w/images/thumb/a/aa/Olivier-mir-cazador-001.webp/416px-Olivier-mir-cazador-001.webp.png",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Szarr_Palace",
  },
  {
    name: "The Blushing Mermaid",
    description:
      "A large tavern with an old ship's bow protruding from the side",
    icon: "https://bg3.wiki/w/images/thumb/a/a4/Blushing_Mermaid_Outside.jpg/400px-Blushing_Mermaid_Outside.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/The_Blushing_Mermaid",
  },
  {
    name: "Wine Festival",
    description:
      "A small festival taking place on the Highberry's home porch, hosted by Cora Highberry",
    icon: "https://bg3.wiki/w/images/thumb/d/d3/Wine_Festival.jpg/400px-Wine_Festival.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Wine_Festival",
  },
  {
    name: "The Lodge",
    description:
      "Headquarters of the Society of Brilliance, perched high above the Greyharbour Docks",
    icon: "https://bg3.wiki/w/images/thumb/e/eb/The_Lodge.jpg/400px-The_Lodge.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/The_Lodge",
  },
  {
    name: "Water Queen's House",
    description:
      "An outdoor temple to Bitch Queen Umberlee, overseen by Wavemistress Allandra Grey",
    icon: "https://bg3.wiki/w/images/thumb/2/25/Water_Queen%27s_House_Sideview.jpg/400px-Water_Queen%27s_House_Sideview.jpg",
    act: "Act Three",
    area: "Baldur's Gate",
    wikiLink: "https://bg3.wiki/wiki/Water_Queen%27s_House",
  },
  {
    name: "Lower City Sewers",
    description: "A large sewerage network beneath the Lower City",
    icon: "https://bg3.wiki/w/images/thumb/f/f5/Lower_City_Sewers_North.jpg/400px-Lower_City_Sewers_North.jpg",
    act: "Act Three",
    area: "Underground",
    wikiLink: "https://bg3.wiki/wiki/Lower_City_Sewers",
  },
  {
    name: "Undercity Ruins",
    description:
      "The remains of an old city, located in a vast cavern beneath Baldur's Gate",
    icon: "https://bg3.wiki/w/images/thumb/8/80/Undercity_Ruins.jpg/400px-Undercity_Ruins.jpg",
    act: "Act Three",
    area: "Underground",
    wikiLink: "https://bg3.wiki/wiki/Undercity_Ruins",
  },
  {
    name: "Upper City",
    description:
      "A wealthy region in Baldur's Gate, home to its patriar families",
    icon: "https://bg3.wiki/w/images/thumb/4/43/Upper_City_Invasion.webp/400px-Upper_City_Invasion.webp.png",
    act: "Act Three",
    area: "Upper City",
    wikiLink: "https://bg3.wiki/wiki/Upper_City",
  },
  {
    name: "Astral Plane*",
    description: "A small section of the Astral Sea",
    icon: "https://bg3.wiki/w/images/thumb/9/99/Screen_Astral_Plane_South_East_A.jpg/400px-Screen_Astral_Plane_South_East_A.jpg",
    act: "Act Three",
    area: "Other planes",
    wikiLink: "https://bg3.wiki/wiki/Astral_Plane",
  },
  {
    name: "House of Hope",
    description: "Raphael's home in the hells",
    icon: "https://bg3.wiki/w/images/thumb/6/66/Edward-vanderghote-houseofhope-01.webp/400px-Edward-vanderghote-houseofhope-01.webp.png",
    act: "Act Three",
    area: "Other planes",
    wikiLink: "https://bg3.wiki/wiki/House_of_Hope",
  },
]
