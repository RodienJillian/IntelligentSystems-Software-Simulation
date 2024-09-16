document.getElementById('start').addEventListener('click', function() {
    const speed = parseFloat(document.getElementById('speed').value);
    const distance = parseFloat(document.getElementById('distance').value);
    
    if (isNaN(speed) || isNaN(distance) || speed < 0 || distance < 0) {
        alert('Please enter valid numbers for speed and distance.');
        return;
    }

    const brakingIntensity = getBrakeIntensity(speed, distance);
    const brakingColor = getBrakingColor(brakingIntensity);
    
    document.getElementById('braking-intensity').innerHTML = `Brake Intensity: <span style="color: ${brakingColor};">${brakingIntensity}</span>`;
    
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
    carImage.src = 'https://res.cloudinary.com/dakq2u8n0/image/upload/v1726449557/car_icugew.webp'; 
    const barrierImage = new Image();
    barrierImage.src = 'https://res.cloudinary.com/dakq2u8n0/image/upload/v1726449557/barrier_uiyqzr.png'; 
    const carWidth = 50; 
    const carHeight = 30; 
    const barrierWidth = 60;
    const barrierHeight = 40;

    const barrierPosition = canvas.width - barrierWidth - 20;
    const stopPosition = barrierPosition - (distance / 100) * canvas.width; 

    let carPosition = 0;
    let carSpeed = speed / 10; 
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

    carImage.onload = function() {
        barrierImage.onload = function() {
            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(barrierImage, barrierPosition, canvas.height - barrierHeight - 10, barrierWidth, barrierHeight);

                ctx.drawImage(carImage, carPosition, canvas.height - carHeight - 10, carWidth, carHeight);

                carPosition += carSpeed;

                if (carPosition >= stopPosition) {
                    carSpeed -= brakingFactor;
                    if (carSpeed < 0) carSpeed = 0;
                }

                if (carPosition < canvas.width && carSpeed > 0) {
                    requestAnimationFrame(animate);
                }
            }

            animate();
        };
    };
}
