(() => {
  // Set up the SVG canvas dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;

  const svg = d3
    .select("#particle-bg")
    .attr("width", width)
    .attr("height", height);

  // Generate particles data
  const numParticles = 100;
  const particles = d3.range(numParticles).map(() => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1, // Initial opacity between 0.1 and 0.6
    };
  });

  // Create particle elements
  const particleElements = svg
    .selectAll("circle")
    .data(particles)
    .enter()
    .append("circle")
    .attr("r", (d) => d.radius)
    .attr("fill", "#888");

  // Animation function
  function animate() {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Update opacity
      p.opacity += (Math.random() - 0.6) * 0.01; // Change opacity slightly
      if (p.opacity > 0.6) p.opacity = 0.6;
      if (p.opacity < 0.1) p.opacity = 0.1;

      // Wrap around edges
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;
      if (p.y > height) p.y = 0;
      if (p.y < 0) p.y = height;
    });

    particleElements
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("opacity", (d) => d.opacity);

    requestAnimationFrame(animate);
  }

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    svg.attr("width", newWidth).attr("height", newHeight);
  });
})();
