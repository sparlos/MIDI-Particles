# MIDI Particles

MIDI Particles is a web app that takes MIDI input to create particle visualizations. It uses the [Web MIDI API](https://www.w3.org/TR/webmidi/), which at is experimental at the moment and only supported in [these browsers](https://developer.mozilla.org/en-US/docs/Web/API/MIDIAccess#Browser_compatibility) (at time of writing, only Chrome and Opera). For this reason, I am considering adapting this into an electron app at some point in the future.

## Customizable

This app has a ton of customizability, with more and more customization options being released as often as I can. All of these options can be accessed at any point by hitting the Escape key. These options include:

- Background color
- Custom video background (YouTube URLs only supported currently)
- Play video on MIDI input
- Keyboard range, starting octave, keyboard color, keyboard width & height, keyboard opacity
- Particle color type (solid or gradient across the keyboard), particle min & max size (more options for particles coming eventually)
- Customizable keyboard shortcuts for toggling the background video, as well as entering "transform" mode (allows you to edit keyboard size while in perform mode)
- Enabling/disabling of MIDI devices

And many more on the way! All are saved locally to your browser using the fantastic [Lowdb](https://github.com/typicode/lowdb).

## Troubleshooting

It's just me making this app, so you could run into some issues! Try out the following things to see if they resolve your issue.

- If certain settings aren't loading properly or being weird, try resetting the misbehaving settings using the refresh icon next to the setting name, or reset all settings under the Advanced settings.
- If your MIDI device isn't triggering the particles properly, I'm working on a debug log in Advanced settings in order to track MIDI input. MIDI is sort of weird and some devices send different values for different things, and as of right now I've only been able to test my devices.
