/*
    One thing a user could do is click play on the random created melody and
    record at the same time. This would forever work allowing the user to game the 
    system. In the MVP stage it is irrelevant but when I introduce PvP and ranking 
    this will be an issue so I might as well solve it now.



        <!-- P5 library for connecting microphone -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
    <!-- HTML MIDI PLAYER SCRIPT -->
    <script
        src="https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.22.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.4.0"></script>
    <!-- ML5 for pitch detection -->
    <script src="https://unpkg.com/ml5@latest/dist/ml5.min.js" type="text/javascript"></script>
*/

const htmlMidiPlayerCDN = "https://cdn.jsdelivr.net/combine/npm/tone@14.7.58,npm/@magenta/music@1.22.1/es6/core.js,npm/focus-visible@5,npm/html-midi-player@1.4.0"
const p5CDN = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.3/p5.js"
const p5DomCDN = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"
const p5SoundCDN = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"
const ml5CDN = "https://unpkg.com/ml5@latest/dist/ml5.min.js"

const head = document.querySelector('head').addEventListener('onload')
// when to show the p5 libraries (true) or the HTML Midi player
const toggle = false

function toggleCDNs(){
    let recordingScripts;
    let playingScripts;
    if(toggle){
        scripts = [
            createScriptTag(p5CDN),
            createScriptTag(p5DomCDN),
            createScriptTag(p5SoundCDN),
            createScriptTag(ml5CDN)
        ]
    }
    else {
        scirpts = [
            createScriptTag(htmlMidiPlayerCDN)
        ]
    }
    
    return scripts.forEach(script => {
            head.appendChild(script)
    })
}



/*
PURPOSE: 
  This function creates an HTML script tag with the source passed

INPUT: 
    source - <String> The CDN Source to the script lib being linked


Output:
    <Obj> - The newly created HTML script tag
*/
function createScriptTag(source){
    let script = document.createElement('script')
    script.src = source

    return script
}