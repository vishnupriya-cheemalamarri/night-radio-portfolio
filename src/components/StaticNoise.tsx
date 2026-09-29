import { useEffect, useRef } from "react";

type StaticNoiseProps = {
  strength: number; // 0 (full static) to 1 (clear)
};

export default function StaticNoise({ strength }: StaticNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 160; // small internal resolution, upscaled by CSS — keeps it fast
    const height = 90;
    canvas.width = width;
    canvas.height = height;

    let rafId: number;

    const draw = () => {
      const imageData = ctx.createImageData(width, height);
      const buffer = imageData.data;

      for (let i = 0; i < buffer.length; i += 4) {
        const gray = Math.random() * 180;
        buffer[i] = gray; // R
        buffer[i + 1] = gray; // G
        buffer[i + 2] = gray; // B
        buffer[i + 3] = 255; // A
      }

      ctx.putImageData(imageData, 0, 0);
      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 - strength, imageRendering: "pixelated" }}
    />
  );
}