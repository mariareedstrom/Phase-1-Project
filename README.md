# KITTY-CAT GENERATOR

Interactive application that allows the user to generate new and unique kittens.

## Overview

The Kitty-Cat Generator allows users to create new and unique kittens by choosing two existing cats. The cats all have unique “DNA”-strings and combining any two cats generates a new kitty whose “DNA”-string is a result of interlacing the strings of the parent cats (much like human DNA sequencing).

New kittens are added to the page gallery, and are available to combine with others to make even more new kitties. The user can “like” their favorites or “set them free” to remove. Endless entertainment ahead!

### API Usage

On page load, a GET request will gets four cats from the API. The cats all have unique “DNA”-strings and combining any two cats generates a new kitty whose “DNA”-string is a result of interlacing the strings of the parent cats. This sends a new request to the API and the new kitty is loaded on to the page gallery.

## Features

Users can create new cats by combining two existing cats.

Cat lineage feature allows user to see parents of created kittens.

User can like and store their favorites, or remove those they do not want.

## How to use

Select any cat by clicking its card. Once any two are selected, a new kitten is generated and rendered to the New Cat Gallery.

Save favorites by cliking the empty heart. Favorites are saved and persist upon page refresh. Undo favorites by cliking a full heart.

Set cats free by cliking the Set Free! button to remove them from the Gallery.

## Attribution

**RobotHash API**, https://robohash.org/

RobotHash generates unique images/characters from any text input using a unique hash.
