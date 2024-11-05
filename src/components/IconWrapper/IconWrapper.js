const IconWrapper = ({ IconComponent, className = "" }) => {
  return (
    <div className={`icon-wrapper ${className}`}>
      <img src={IconComponent} alt="" className="w-4 h-4 inline-block" />
    </div>
  );
};

export default IconWrapper;
