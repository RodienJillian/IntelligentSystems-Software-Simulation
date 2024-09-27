document.getElementById('start').addEventListener('click', function () {
    const speed = parseFloat(document.getElementById('speed').value);
    const distance = parseFloat(document.getElementById('distance').value);


  
    if (isNaN(speed) || isNaN(distance) || speed < 0 || distance < 0 || distance > 100) {
        alert('Please enter valid numbers for speed and a distance between 0 and 100.');
        return;
    }
  
    const brakingIntensity = getBrakeIntensity(speed, distance);
    const brakingColor = getBrakingColor(brakingIntensity);
  
    document.getElementById(
        'braking-intensity'
    ).innerHTML = `Brake Intensity: <span style="color: ${brakingColor};">${brakingIntensity}</span>`;


    startSimulation(speed, distance, brakingIntensity);

  });

  
  function getBrakeIntensity(speed, distance) {
    let brakeIntensity;
    if (speed >= 55) {
        brakeIntensity = distance < 30 ? 'Very Strong Braking or Emergency Braking' : 'Strong Braking';
    } else if (speed >= 25) {
        brakeIntensity = distance < 30 ? 'Strong Braking' : 'Moderate Braking';
    } else {
        brakeIntensity = distance < 30 ? 'Moderate Braking' : 'Minimal Braking';
    }
    return brakeIntensity;
  }
  
  function getBrakingColor(intensity) {
    switch (intensity) {
        case 'Very Strong Braking or Emergency Braking':
            return '#FF0000'; // Red
        case 'Strong Braking':
            return '#FF0000'; // Red
        case 'Moderate Braking':
            return '#FFA500'; // Orange
        case 'Minimal Braking':
            return '#FFFF00'; // Yellow
        default:
            return '#000000'; // Default color (black)
    }
  }
  
  function startSimulation(speed, distance, brakingIntensity) {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const carImage = new Image();
    carImage.src = 'https://res.cloudinary.com/dvr0evn7t/image/upload/v1726574550/green_car-removebg-preview__1_-removebg-preview_yyesto.png';
    const barrierImage = new Image();
    barrierImage.src = 'https://res.cloudinary.com/dvr0evn7t/image/upload/v1726489053/barriers-removebg-preview_hszgzm.png';
  
    // Preload cloud images
    const cloudImages = [
        new Image(),
        new Image(),
        new Image(),
        new Image()
    ];
    cloudImages[0].src = 'https://res.cloudinary.com/dvr0evn7t/image/upload/v1727369337/clouds-removebg-preview_ig2z25.png';
    cloudImages[1].src = 'https://res.cloudinary.com/dvr0evn7t/image/upload/v1727369337/cloud3_yuwnel.png';
    cloudImages[2].src = 'https://res.cloudinary.com/dvr0evn7t/image/upload/v1727369337/cloud2_v7rwt4.png';
    cloudImages[3].src = 'https://res.cloudinary.com/dvr0evn7t/image/upload/v1727369337/cloud1_wvt1du.png';

  
    const cloudPositions = [
        { x: 30, y: 10, baseY: 10, width: 120, height: 60, speed: 0.0, oscillationSpeed: 0.01 },
        { x: 200, y: 30, baseY: 5, width: 120, height: 70, speed: 0.0, oscillationSpeed: 0.02 },
        { x: 400, y: 10, baseY: 10, width: 140, height: 80, speed: 0.0, oscillationSpeed: 0.01 },
        { x: 600, y: 30, baseY: 15, width: 140, height: 80, speed: 0.0, oscillationSpeed: 0.02 }
    ];
  
    const carWidth = 200;
    const carHeight = 150;
    const barrierWidth = 70;
    const barrierHeight = 100;
  
    const canvasMeters = 100; // Canvas represents 100 meters
    const metersToPixels = canvas.width / canvasMeters; // Conversion factor from meters to pixels
  
    const barrierPosition = canvas.width - barrierWidth - 10; // Barrier is fixed on the right side
    const stopPosition = canvas.width - (distance * metersToPixels) - carWidth; // Calculate stop position
  
    let carPosition = 0; // Start position for the car
    let carSpeed = speed / 10; // Adjust speed for simulation
    let brakingFactor = getBrakingFactor(brakingIntensity);
  
    function getBrakingFactor(intensity) {
        switch (intensity) {
            case 'Very Strong Braking or Emergency Braking':
                return 3;
            case 'Strong Braking':
                return 2;
            case 'Moderate Braking':
                return 1.5;
            case 'Minimal Braking':
                return 1;
            default:
                return 1;
        }
    }
  
    function drawRoadlines(ctx, canvas) {
        const roadHeight = 100; // Height of the road
        const roadLineWidth = 30;
        const roadLineHeight = 10;
        const gap = 30;
  
        ctx.fillStyle = '#A9A9A9';
        ctx.fillRect(0, canvas.height - roadHeight, canvas.width, roadHeight);
  
        ctx.fillStyle = 'white';
        for (let i = 0; i < canvas.width; i += roadLineWidth + gap) {
            ctx.fillRect(i, canvas.height - (roadHeight / 2) - (roadLineHeight / 2), roadLineWidth, roadLineHeight);
        }
        //background
        changeCanvasBackgroundColor('#D1E9F6');
        
        function changeCanvasBackgroundColor(color) {
           const canvas = document.getElementById('simulationCanvas');
           canvas.style.backgroundColor = color;
    }
    }
  
    function drawClouds(ctx, cloudImages, cloudPositions) {
        cloudImages.forEach((cloudImage, index) => {
            const position = cloudPositions[index];
            ctx.drawImage(cloudImage, position.x, position.y, position.width, position.height);
        });
    }
    
  // Function to draw moving clouds
  let time = 0;
  function drawClouds(ctx, cloudImages, cloudPositions) {
      cloudImages.forEach((cloudImage, index) => {
          const cloud = cloudPositions[index];

          //cloud to the right
          cloud.x += cloud.speed;

          
          cloud.y = cloud.baseY + Math.sin(time * cloud.oscillationSpeed) * 10;

          if (cloud.x > canvas.width) {
              cloud.x = -cloud.width;
          }

          ctx.drawImage(cloudImage, cloud.x, cloud.y, cloud.width, cloud.height);
      });

      time += 1; // Increment time for the oscillation effect
  }

    carImage.onload = function () {
        barrierImage.onload = function () {
            
            let cloudsLoaded = 0;
  
            cloudImages.forEach(cloud => {
                cloud.onload = () => {
                    cloudsLoaded++;
                    if (cloudsLoaded === cloudImages.length) {
                        animate();
                    }
                };
            });
  
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
  
                drawRoadlines(ctx, canvas);
                drawClouds(ctx, cloudImages, cloudPositions);
  
                // Draw the barrier at the right side
                ctx.drawImage(
                    barrierImage,
                    barrierPosition,
                    canvas.height - barrierHeight - 30,
                    barrierWidth,
                    barrierHeight
                );
  
                // Shadow
                ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
                ctx.shadowBlur = 5;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 6;
  
                // Draw the car
                ctx.drawImage(
                    carImage,
                    carPosition,
                    canvas.height - carHeight - 10,
                    carWidth,
                    carHeight
                );
  
                // Reset shadow
                ctx.shadowColor = 'transparent';
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
  
                // Update car position
                carPosition += carSpeed;
  
                // Stop the car when it reaches the calculated stop position
                if (carPosition >= stopPosition) {
                    carSpeed -= brakingFactor;
                    if (carSpeed < 0) carSpeed = 0;
                }
  
                // Continue animation while car is moving
                if (carPosition < barrierPosition && carSpeed > 0) {
                    requestAnimationFrame(animate);
                }

            }
        };
    };
  }
  
  
