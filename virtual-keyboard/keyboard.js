const Keyboard = {
      elements: {
          main: null,
          keysContainer: null,
          keys: []
      },

      eventHandlers: {
          oninput: null,
          onclose: null
      },

      properties: {
          value: "",
          capsLock: false
      },

      init() {
        //   creating main element
            this.elements.main = document.createElement("div")
            this.elements.keysContainer = document.createElement("div")

            // setup main element
            this.elements.main.classList.add("keyboard", "keyboard--hidden")
            this.elements.keysContainer.classList.add("keyboard__keys")
            this.elements.keysContainer.appendChild(this._createKeys())

            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key")

            // add to DOM
            this.elements.main.appendChild(this.elements.keysContainer)
            document.body.appendChild(this.elements.main)

            // textarea
            document.querySelectorAll(".use-keyboard-input").forEach(element => {
                element.addEventListener("focus", () => {
                    this.open(element.value, currentValue => {
                        element.value = currentValue;
                    })
                })
            })

      },

    //   creating a keys
      _createKeys() {
           const fragment = document.createDocumentFragment()
           const keyLayout = [
               "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
               "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
               "caps", "a", "s", "d", "f", "g" , "h", "j", "k", "l", "enter",
               "done", "z", "x", "c", "v", "b", "n","m", ",", ".", "?", "space"
           ]


        //    creata an html for an icon
        const createIconHtml = (icon_name) => {
            return ` <i > ${icon_name} </i> `
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button")
            const insertLineBreak = [ "backspace", "p", "enter", "?" ].indexOf(key) !== -1;

            // add attr/classes
            keyElement.setAttribute("type", "button")
            keyElement.classList.add("keyboard__key")

            switch(key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide")
                    keyElement.innerHTML = createIconHtml("Back");

                    keyElement.addEventListener("click", () => {
                        // remove the last character from the current value
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1)
                        this._triggerEvent("oninput")
                    })

                    break;
                
                case "caps":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable")
                        keyElement.innerHTML = createIconHtml("Caps") ;
    
                        keyElement.addEventListener("click", () => {
                            // remove the last character from the current value
                            this._toggleCapsLock()
                            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock)
                        })
    
                        break;

                case "enter":
                        keyElement.classList.add("keyboard__key--wide")
                        keyElement.innerHTML = createIconHtml("Enter") ;
    
                        keyElement.addEventListener("click", () => {
                            // adding an escape character
                            this.properties.value += "\n"
                           this._triggerEvent("oninput")
                        })
    
                        break;

                   case "space":
                        keyElement.classList.add("keyboard__key--extra--wide")
                        keyElement.innerHTML = createIconHtml("Space") ;
    
                        keyElement.addEventListener("click", () => {
                            // adding an escape character
                            this.properties.value += ' '
                           this._triggerEvent("oninput")
                        })
    
                        break;

                   case "done":
                        keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark")
                        keyElement.innerHTML = createIconHtml("Done") ;
    
                        keyElement.addEventListener("click", () => {
                            // adding an escape character
                            this.close();
                           this._triggerEvent("onclose")
                        })
    
                        break;

                  default :
                        keyElement.textContent = key.toLowerCase();
    
                        keyElement.addEventListener("click", () => {
                            // adding an escape character
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase()
                           this._triggerEvent("oninput")
                        })
    
                        break;
            }

            // append a keyboard to document
            fragment.appendChild(keyElement)

            if(insertLineBreak) {
                fragment.appendChild(document.createElement("br"))
            }
        })

        return fragment;

      },

    //   triggering an event
      _triggerEvent(handlerName) {
          if( typeof this.eventHandlers[handlerName] == "function" ) {
              this.eventHandlers[handlerName](this.properties.value)
          }
      },

      _toggleCapsLock() {
          this.properties.capsLock = !this.properties.capsLock;

          for(const key of this.elements.keys ) {
              key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
          }

      },

      open(initialValue, oninput, onclose) {
        //   initialValue or empty string
            this.properties.value = initialValue || ""
            this.eventHandlers.oninput = oninput
            this.eventHandlers.onclose = onclose
            this.elements.main.classList.remove("keyboard--hidden")
        },
        
        close() {
            this.properties.value = "";
            // this.eventHandlers.oninput = oninput
            // this.eventHandlers.onclose = onclose
            this.elements.main.classList.add("keyboard--hidden")

      }
}


window.addEventListener("DOMContentLoaded", () => {
    Keyboard.init();
})


