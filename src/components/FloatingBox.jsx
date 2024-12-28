// src/components/FloatingBox.jsx
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { motion, useInView } from 'framer-motion';
import { fillLogic } from '../utils/fillLogic';

const handleScroll = (canvas) => {
  let scrollTimeout;
  return () => {
    if (canvas) {
      canvas.style.pointerEvents = 'none';
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (canvas) {
          canvas.style.pointerEvents = 'auto';
        }
      }, 200);
    }
  };
};

const FloatingBox = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const mouseConstraintRef = useRef(null);
  const [rectangles, setRectangles] = useState([]);
  const isInView = useInView(sceneRef, { once: false, amount: 0.5 });

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;
    const runner = Runner.create();
    runnerRef.current = runner;

    const canvasHeight = Math.min(700, window.innerHeight * 0.8);
    const canvasWidth = Math.min(1500, window.innerWidth);

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: canvasWidth,
        height: canvasHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    const canvas = render.canvas;
    if (canvas) {
      canvas.style.pointerEvents = 'auto';

      // Create boundaries
      const ground = Bodies.rectangle(canvasWidth / 2, canvasHeight, canvasWidth, 50, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      });

      const leftWall = Bodies.rectangle(0, canvasHeight / 2, 50, canvasHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      });

      const rightWall = Bodies.rectangle(canvasWidth, canvasHeight / 2, 50, canvasHeight, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      });

      const topWall = Bodies.rectangle(0, 0, canvasWidth, 0, {
        isStatic: true,
        render: { fillStyle: 'transparent' },
      });

      World.add(engine.world, [ground, leftWall, rightWall, topWall]);

      // Setup mouse interaction
      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.5,
          render: { visible: false },
        },
      });

      mouseConstraintRef.current = mouseConstraint;
      World.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      Runner.run(runner, engine);
      Render.run(render);

      const texts = {
        desktop: [
          'Omega 3',
          'Zinc',
          'Iodine',
          'Iron',
          'Rhodiola',
          'Ashwangadha',
          'Chasteberry',
          'Magnesium',
          'Hyaluronic Acid',
          'Omega 3',
          'Zinc',
          'Iodine',
          'Iron',
          'Rhodiola',
          'Ashwangadha',
          'Rhodiola',
          'Ashwangadha',
          'Chasteberry',
          'Magnesium',
          'Hyaluronic Acid',
        ],
        mobile: [
         'Omega 3',
          'Zinc',
          'Iodine',
          'Iron',
          'Rhodiola',
          'Ashwangadha',
          'Chasteberry',
          'Magnesium',
          'Hyaluronic Acid',
          'Omega 3',
          'Zinc',
          'Iodine',
          'Rhodiola',
          'Ashwangadha',
          'Iron',
          'Rhodiola',
          'Ashwangadha',
          'Chasteberry',
          'Magnesium',
          'Hyaluronic Acid',
        ],
      };

      if (isInView) {
        const isMobile = window.innerWidth <= 768;
        const rectangleCount = isMobile ? 16 : 20;
        const width = isMobile ? 120 : 150;
        const height = isMobile ? 54 : 60;
        const newRectangles = [];

        // Create floating boxes
        for (let i = 0; i < rectangleCount; i++) {
          const fillColor = fillLogic(i);
          const rectangle = Matter.Bodies.rectangle(
            Math.random() * (canvasWidth - width),
            -100 - i * 50,
            width,
            height,
            {
              render: { fillStyle: fillColor },
              chamfer: { radius: 30 },
              restitution: 0.3,
              friction: 0.1,
            }
          );
          newRectangles.push(rectangle);
        }

        World.add(engine.world, newRectangles);
        setRectangles(newRectangles);

        // Render text on boxes
        Matter.Events.on(render, 'afterRender', () => {
          const ctx = render.context;
          ctx.font = '16px Inter';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const currentTexts = isMobile ? texts.mobile : texts.desktop;

          // Render text on boxes
          newRectangles.forEach((rectangle, index) => {
            if (index < currentTexts.length) {
              const { x, y } = rectangle.position;
              const angle = rectangle.angle;

              ctx.save();
              ctx.translate(x, y);
              ctx.rotate(angle);
              ctx.fillStyle = rectangle.render.fillStyle === '#8330C2' ? 'white' : 'black';
              ctx.fillText(currentTexts[index], 0, 0);
              ctx.restore();
            }
          });

          // Render heading text
          const textY = isMobile ? 40 : 50;
          const lineHeight = 70;
          ctx.font = `${isMobile ? '3rem' : '4rem'} Inter`;
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';

          const textX = canvasWidth / 2;
          
          ctx.fillText('Premium', textX, textY);
          ctx.fillText('Ingridients', textX, textY + lineHeight);
        });
      }

      // Handle scroll events
      const scrollHandler = handleScroll(canvas);
      canvas.addEventListener('wheel', scrollHandler);
      canvas.addEventListener('touchstart', scrollHandler, { passive: true });
      canvas.addEventListener('touchmove', scrollHandler, { passive: true });

      // Cleanup
      return () => {
        Render.stop(render);
        World.clear(engine.world);
        Engine.clear(engine);
        canvas.remove();
        
        if (mouseConstraintRef.current) {
          World.remove(engine.world, mouseConstraintRef.current);
        }
        
        canvas.removeEventListener('wheel', scrollHandler);
        canvas.removeEventListener('touchstart', scrollHandler);
        canvas.removeEventListener('touchmove', scrollHandler);
      };
    }
  }, [isInView]);

  return (
    <motion.div
      ref={sceneRef}
      className="w-full h-full cursor-grab relative z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default FloatingBox;