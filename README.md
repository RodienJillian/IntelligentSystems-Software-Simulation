# Vehicle Braking Simulation

## Overview

This web-based Vehicle Braking Simulation visualizes how a vehicle brakes based on user inputs for speed and distance to an obstacle. The simulation includes animation to demonstrate the braking process in real-time, using fuzzy logic to determine the appropriate braking intensity.

You can visit this site in the following link: [Vehicle Breaking Simulation](https://rodienjillian.github.io/IntelligentSystems-Software-Simulation/)

## Features

- **User Input**: Enter the vehicle speed and distance to an obstacle.
- **Simulation**: See the vehicle's braking behavior in real-time.
- **Braking Intensity**: The simulation adjusts braking intensity based on the vehicle's speed and distance to the obstacle.

## Files
- index.html: The HTML file containing the structure of the web application.
- styles.css: The CSS file for styling the application.
- script.js: The JavaScript file implementing the simulation logic and animation.

### Usage
1. Enter Speed: Input the vehicle speed (in km/h) in the provided text box.
2. Enter Distance: Input the distance to the obstacle (in meters) in the provided text box.
3. Start Simulation: Click the "Start Simulation" button to begin the animation.
The simulation will display the braking intensity and animate the vehicle's movement towards the obstacle based on the user inputs. The car will brake smoothly and stop before reaching the obstacle, reflecting the braking intensity determined by the fuzzy logic.

### Braking Intensity Logic
The braking intensity is determined based on the following criteria:

⦿ Low Speed (0-30 km/h):
  - Long Distance: Minimal Braking
  - Short Distance: Moderate Braking

⦿ Medium Speed (25-60 km/h):
  - Long Distance: Moderate Braking
  - Short Distance: Strong Braking
    
⦿ High Speed (55 km/h and above):
  - Long Distance: Strong Braking
  - Short Distance: Very Strong Braking or Emergency Braking

![Alt text](https://res.cloudinary.com/dakq2u8n0/image/upload/v1726505523/Membership_Functions_mnl2mh.png)

### Fuzzy Logic and Animation
The simulation uses fuzzy logic to determine the braking intensity based on the vehicle's speed and the distance to the obstacle. The animation reflects these decisions by adjusting the car's speed and braking smoothly as it approaches the obstacle.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

