export default function Statistics({ emoji, children }) {
  return (
    <p>
      <span>{emoji}</span>
      <span>{children}</span>
    </p>
  );
}
