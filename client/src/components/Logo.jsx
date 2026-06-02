export default function Logo({ size = 'md', white = false }) {
  const heights = { sm: 36, md: 48, lg: 70 };

  return (
    <img
      src="/logo.png"
      alt="ShopHub"
      style={{
        height: heights[size],
        width: 'auto',
        mixBlendMode: white ? 'normal' : 'multiply',
        borderRadius: 8,
      }}
    />
  );
}
