# Musical_Showdown

Musical Showdown is a current work in progres (going very slow because I do not have a lot of spare time). 

## What The App Does:
Musical Showdown is being created to help musicians practice their ear training. The app creates a random melody "n" notes (user chooses note number) based on a wide variety of scales and returns a playable midi file. Then the users goal is to listen to the melody created and play it back on their own instrument which is all picked up from the computer microphone. Once the user plays their melody, the app processes the notes it played versus the notes created in the random melody file and tells them if they were correct. 

You do not need to have pitch perfect ears to use this!!! The app does its mesurements based on the tonal difference between the notes played. Meaning for example if the random melody midi file is in the key of G, you can play your version of the melody in the key of A no problem!



To run changes in the Sass use this command from directly inside the app directory:
```
sass --watch ./sass/index.scss public/styles/main.css
```



TODOS:

1. Fix error message that happens when you make a request for a melody that is one note long
2. I currently have tonaldifferences function set up to throw an error if the note lengths do not match
   this is creating an error in the post request causing the catch block to catch it. Refactor this to no longer throw an
   error like this OR handle the error differently