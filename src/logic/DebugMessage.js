export default class DebugMessage {
  constructor(message) {
    let port = message.currentTarget;
    let data = message.data;

    this.id = port.id;
    this.manufacturer = port.manufacturer;
    this.deviceName = port.name;

    this.command = data[0];
    this.noteValue = data[1];
    this.velocity = data[2];
  }

  formattedString() {
    return `name: ${this.deviceName}, 
    manufacturer: ${this.manufacturer},
    command: ${this.command},
    note value: ${this.noteValue},
    velocity: ${this.velocity} 
    `;
  }
}
