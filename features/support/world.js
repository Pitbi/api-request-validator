const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')

class CustomWorld {
    constructor() {
        this.payload = {}
        this.options = {}
    }
}
  
setWorldConstructor(CustomWorld)