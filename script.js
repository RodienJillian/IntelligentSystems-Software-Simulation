document.getElementById('start').addEventListener('click', function() {
    // Get input values
    const speed = parseFloat(document.getElementById('speed').value);
    const distance = parseFloat(document.getElementById('distance').value);
    
    // Validate inputs
    if (isNaN(speed) || isNaN(distance) || speed < 0 || distance < 0) {
        alert('Please enter valid numbers for speed and distance.');
        return;
    }

    // Determine brake intensity
    const brakingIntensity = getBrakeIntensity(speed, distance);
    document.getElementById('braking-intensity').textContent = `Brake Intensity: ${brakingIntensity}`;
    
    // Start the simulation
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

function startSimulation(speed, distance, brakingIntensity) {
    // Clear previous animation
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const carWidth = 50;
    const carHeight = 30;
    const obstacleWidth = 60;
    const obstacleHeight = 40;

    // Calculate obstacle position based on distance input
    const obstaclePosition = canvas.width - obstacleWidth - 20; // 20px gap from the edge
    const stopPosition = obstaclePosition - (distance / 100) * canvas.width; // Scale distance to canvas width
    
    let carPosition = 0;
    let carSpeed = speed / 10; // Adjust speed to control animation smoothness
    let brakingFactor = getBrakingFactor(brakingIntensity);

    function getBrakingFactor(intensity) {
        switch(intensity) {
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

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the obstacle
        ctx.fillStyle = 'red';
        ctx.fillRect(obstaclePosition, canvas.height - obstacleHeight - 10, obstacleWidth, obstacleHeight);

        // Draw the car
        ctx.fillStyle = 'blue';
        ctx.fillRect(carPosition, canvas.height - carHeight - 10, carWidth, carHeight);

        carPosition += carSpeed;

        // Apply braking if close to the stopping position
        if (carPosition >= stopPosition) {
            carSpeed -= brakingFactor;
            if (carSpeed < 0) carSpeed = 0;
        }

        // Stop animation when car has stopped
        if (carPosition < canvas.width && carSpeed > 0) {
            requestAnimationFrame(animate);
        }
    }

    animate();
}
