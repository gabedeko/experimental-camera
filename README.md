[Link to Project](https://cclab-portfolio-gabe.glitch.me/p6.html)

## Design Process

 There are a lot of psychology studies that have shown the clothes we wear have an impact on our emtions and mood. If you wear bright colors there may be a good chance that reflects your emotional baseline. Not only do the colors say something about you but the shapes of the clothing also has some signifigance. Some specialists think how colors effect us correlates to the color's behavior in nature. Apparently colors create the same impressions for different people.

 ![Sketch 1](https://cdn.glitch.com/5b668b88-be22-4de6-a547-a470cf9a8615%2Fexp_cam_sketch_0.jpg?v=1603149701243)

![Sketch 2](https://cdn.glitch.com/5b668b88-be22-4de6-a547-a470cf9a8615%2Fexp_cam_sketch_1.jpg?v=1603149704772)

I wanted to try to see if I could use all of the colors that were captured by the camera to create an aura around the body which is the focus of the picture. To do this I adopted the method used in one of the examples shared in week 6 (Load Pixel shape random by Jiwon) and cobine that we the third party library from ml5 called poseNet(). PoseNet is a machine learning model which allowed me to estimate the position of body parts in the frame and use them to create a visual experience. This was exactly what I needed to show the body emitting energy. With a bunch of arbitrary math and if statements I was also able to create energy fields around the hand which increae in size as the arm goes higher on the canvas. In addition, I added an effect when the arms go to the highest point of the canvas. Finally, for some reason, I added a effect that gives the user a hat when their head is to the far left or right side of the canvas and then their hand shows an object that's related to the hat. I think I did this just to see what kind of gesture responses I could come up with using the head. 


![ML Skeleton](https://cdn.glitch.com/5b668b88-be22-4de6-a547-a470cf9a8615%2Fexp_cam_sketch_1.jpg?v=1603149704772)

![ML Mario Hat](https://cdn.glitch.com/5b668b88-be22-4de6-a547-a470cf9a8615%2Fexp_cam_sketch_1.jpg?v=1603149704772)


## Reflection

This was the first time I was able to play around with a machine learning library. It was a lot more approachable than I initially thought. Now I think I would perhaps like to delve more into the world of visual machine learning tools just to see if the experience is similar to that of poseNet(). I wonder if my approach is anything close to that of teams which build VR experiences or motion sensing software. It would be cool to see how experts utilize these types of tools. 