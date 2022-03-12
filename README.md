# Tuxedo

Turn your screen to black and white on selected websites.

<img width="1325" alt="Screen Shot 2022-03-12 at 11 39 35 AM" src="https://user-images.githubusercontent.com/8205461/158032512-e29f9124-51f9-4b73-9a63-3cdde8681696.png">

## Current support

Supports chrome versions ≥ 76

I built this for myself to add minor annoyance to sites I deem distracting.

The intention of this application to provide (1) minor annoyance/friction and (2) constant reminding that you are using up precious time by being annoyingly bland. If you're actually trying to fully block websites, try editing your `/etc/hosts` (if on mac) or try something that can't be as easily removed as a chrome extension.

Yes, Tuxedo makes it easy to remove sites after they are added.

## Installation

You can install via downloading this repository, heading to Chrome > Manage Extensions, and clicking "Load unpacked", and selecting the `build` folder in this repository.

Eventually I'll launch this on the Chrome web store...someday

## Development

I run `npm run watch:dev`, to work on the extension, but it doesn't pick up changes in `public` for now.

## Product roadmap

* Splash page
* Artdeco font
* Make sites unblockable for a certain period of "focus" time
