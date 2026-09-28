export default function Widget({
  title,
  icon,
  action,
  children,
  className = "",
}) {
  return (
    <section className={`widget ${className}`}>
      {(title || action) && (
        <header className="widget__header">
          <div className="widget__title">
            {icon && <span className="widget__icon">{icon}</span>}
            {title && <h2>{title}</h2>}
          </div>

          {action && (
            <button className="widget__action" type="button">
              {action}
            </button>
          )}
        </header>
      )}

      <div className="widget__content">{children}</div>
    </section>
  );
}