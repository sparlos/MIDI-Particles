
#  [MIDI Particles](https://midiparticles.netlify.com/)

![demo of app in action](https://media.giphy.com/media/VgwOYIAm7xXZeatxXc/giphy.gif)

  

*disclaimer: gif framerate does not accurately represent app framerate (unless run on a potato)*



Table of contents:
- [Demos](#demos)
- [Introduction](#introduction)
- [How to use](#how-to-use)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)
# Demos
[![Song of Healing Demo](https://img.youtube.com/vi/tWWzV2m2OYA/maxresdefault.jpg)](https://www.youtube.com/watch?v=tWWzV2m2OYA)
[*Song of Healing - Live Demo*](https://www.youtube.com/watch?v=tWWzV2m2OYA)

[![Song of Healing Demo](https://img.youtube.com/vi/XLlwbdB_DEw/maxresdefault.jpg)](https://www.youtube.com/watch?v=XLlwbdB_DEw)
[*Par for the Course - Sequenced Demo*](https://www.youtube.com/watch?v=XLlwbdB_DEw)

# Introduction
[MIDI Particles](https://midiparticles.netlify.com/) is a web app built on [Vue JS](https://vuejs.org/) that takes MIDI input to create particle visualizations. It uses the [Web MIDI API](https://www.w3.org/TR/webmidi/), which is experimental at the moment and only supported in [these browsers](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess#Browser_compatibility) (at time of writing, only Chrome and Opera). For this reason, I am considering adapting this into an electron app at some point in the future.

  

**PLEASE NOTE:** This app does *not* create any sort of sound. Boot up a Digital Audio Workstation or other means of creating sound via MIDI input alongside the app.

##  How to Use

*[if video is more your thing, I do a walkthrough of the app in this video!](https://www.youtube.com/watch?v=ePkDcQCXh74)*

  

[Open up the app](https://midiparticles.netlify.com/) and start inputting MIDI! If you don't see anything immediately, you might have to adjust some settings so the app works properly with your device. You can press Escape at any time to open the settings view. This will allow you to change all sorts of things, detailed in the [customization](#customization) section below.

  

The first thing to do in settings would be to adjust the "base octave" and "octave range" settings in the "Keyboard" submenu and make sure they correspond to your MIDI input device (base octave should match the octave the lowest key on your device has, for example if it starts at C1, set bae octave to "1". Just mess around with it and it should eventually line up!). Then, customize to your heart's content!

##  Customization

This app has a ton of customizability, with more and more customization options being released as often as I can. All of these options can be accessed at any point by hitting the Escape key. These options include:

  

-  Background color

-  Custom video background (YouTube URLs only supported currently)

-  Play video on MIDI input

-  Keyboard range, starting octave, keyboard color, keyboard width & height, keyboard opacity

-  Particle color type (solid or gradient across the keyboard), particle min & max size (more options for particles coming eventually)

-  Customizable keyboard shortcuts for toggling the background video, moving backwards and forwards in the video, and entering "transform" mode (allows you to edit keyboard size while in perform mode)

-  Enabling/disabling of MIDI devices

And many more on the way! All are saved locally to your browser using the fantastic [Lowdb](https://github.com/typicode/lowdb).

##  Troubleshooting

It's just me making this app, so you could run into some issues! Try out the following things to see if they resolve your issue.

-  Make sure the "base octave" and "octave range" settings in the "Keyboard" submenu on the settings page are correct for your keyboard. For example, if you've got a 49-key input device that starts at C1, change the base octave to "1" and then the range to "4". Check what octave transposition your MIDI device is at as well.

-  Check to see if your device is listed in the "MIDI" submenu of the settings page. If it's not there, [open an issue](https://github.com/sparlos/MIDI-Particles/issues) and let me know. Please include any relevant info, including the device you're using, if it shows up in the settings menu, the browser you're using, the OS you're using, etc. You can also [hit me up on Twitter](https://twitter.com/sparloscode). I'll attempt to support it as best I can!

-  If certain settings aren't loading properly or being weird, try resetting the misbehaving settings using the refresh icon next to the setting name, or reset all settings under the Advanced settings. You can also try this if particles aren't emitting.

-  If your MIDI device *still* isn't triggering the particles properly, head to advanced settings and open up the MIDI Troubleshooter and hit the same key on your MIDI device a couple of times. Some text should show up in the log; please copy that text and send it to me via either [an issue](https://github.com/sparlos/MIDI-Particles/issues) or email it to me at [sparlingcreations@gmail.com](mailto:sparlingcreations@gmail.com).