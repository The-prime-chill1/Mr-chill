import './GlassIcons.css';

const gradientMapping = {
  blue: 'linear-gradient(hsl(203, 90%, 50%), hsl(196, 90%, 45%))',
  purple: 'linear-gradient(hsl(263, 90%, 55%), hsl(268, 90%, 50%))',
  red: 'linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))',
  indigo: 'linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))',
  orange: 'linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))',
  green: 'linear-gradient(hsl(160, 80%, 40%), hsl(178, 80%, 38%))',
};

const GlassIcons = ({ items, className }) => {
  const getBackgroundStyle = (color) => {
    if (gradientMapping[color]) return { background: gradientMapping[color] };
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ''}`}>
      {items.map((item, index) => (
        <div key={index} className={`icon-btn ${item.customClass || ''}`} aria-label={item.label}>
          <span className="icon-btn__back" style={getBackgroundStyle(item.color)}></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default GlassIcons;
